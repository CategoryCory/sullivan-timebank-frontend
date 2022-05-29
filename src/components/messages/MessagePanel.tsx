import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { format } from "date-fns";
// import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import SendIcon from '@mui/icons-material/Send';
import { IMessage, IMessageThread, IMessageThreadCheck } from '../../models/userMessage';
import { useStore } from "../../stores/store";

interface Props {
    messageThreadDetails?: IMessageThreadCheck
}

export default function MessagePanel({ messageThreadDetails: msgDetails }: Props) {
    const [messageThread, setMessageThread] = useState<IMessageThread | undefined>(undefined);
    const [messages, setMessages] = useState<IMessage[]>([]);
    // const [connection, setConnection] = useState<HubConnection | undefined>(undefined);
    const [newMessageBody, setNewMessageBody] = useState<string>("");

    const { userStore } = useStore();

    // useEffect(() => {
    //     const setUpConnection = async () => {
    //         const newConnection = new HubConnectionBuilder()
    //             .withUrl("https://localhost:5001/hubs/messagesHub")
    //             .withAutomaticReconnect()
    //             .build();
    
    //         newConnection?.on("ReceiveMessage", (msg: IMessage) => {
    //             console.log(msg);
    //         })
            
    //         try {
    //             await newConnection.start();
    
    //             return newConnection;
    //         } catch (error) {
    //             console.error(error);
    //         }
    //     }

    //     setUpConnection()
    //         .then(conn => {
    //             if (conn!.state === HubConnectionState.Connected) {
    //                 console.log("Connected to hub");
    //                 setConnection(conn!);
    //             }
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });
    // }, []);

    useEffect(() => {
        if (msgDetails != null) {
            const queryString = `?jobId=${msgDetails.jobId}&jobApplicantId=${msgDetails.jobApplicantId}`
            axios.get<IMessageThread>(`/messagethreads/${queryString}`)
                .then(res => {
                    setMessageThread(res.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                });
        }
    }, [msgDetails]);

    useEffect(() => {
        if (messageThread != null) {
            axios.get<IMessage[]>(`/messages/?threadId=${messageThread.messageThreadId}`)
                .then(res => {
                    setMessages(res.data);
                })
                .catch((error: AxiosError) => {
                    console.error(error.message);
                });
        }
    }, [messageThread]);

    useEffect(() => {
        const messageInterval = setInterval(async () => {
            try {
                const response = await axios.get<IMessage[]>(`/messages/?threadId=${messageThread?.messageThreadId}`);
                setMessages(response.data);
            } catch (error) {
                console.error(error);
            }
        }, 20000);

        return () => clearInterval(messageInterval);
    }, [messageThread?.messageThreadId]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (newMessageBody === "" || messageThread == null) return;
        
        const messageToSend: IMessage = {
            isFromSender: userStore.user?.userId === messageThread?.fromUserId,
            body: newMessageBody,
            authorId: userStore.user!.userId,
            messageThreadId: messageThread!.messageThreadId!
        };

        // const msgRecipient = messageThread.toUserId;

        // console.log(messageToSend);

        // if (connection != null && connection.state === HubConnectionState.Connected) {
        //     try {
        //         await connection.send("SendMessage", msgRecipient, messageToSend);
        //     } catch (error) {
        //         console.error(error);
        //     };
        // } else {
        //     console.error("No connection to server.");
        // }

        try {
            setMessages([...messages, messageToSend]);
            await axios.post<IMessage>("/messages", messageToSend);
            setNewMessageBody("");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='relative h-full'>
            {(messageThread == null || messages.length === 0) && (
                <div>
                    <h3 className='font-sans font-bold text-lg text-gray-700'>No messages found</h3>
                    <p className='text-sm text-gray-500'>
                        It looks like you haven't started a conversation yet. Type a message in the box below to get started.
                    </p>
                </div>
            )}
            {messages.length > 0 && (
                messages.map(message => (
                    <div 
                        key={message.messageId}
                        className="w-full my-3"
                    >
                        <div 
                            className={`flex flex-col ${message.authorId === userStore.user!.userId ? 'ml-auto items-end' : 'mr-auto'}`}
                        >
                            <p 
                                className={`w-fit mb-1 px-3 py-2 rounded ${message.authorId === userStore.user!.userId ? 'bg-indigo-700 text-white' : 'bg-gray-100'}`}
                            >
                                {message.body}
                            </p>
                            <p className='text-sm text-gray-500'>
                                {message.createdOn == null 
                                    ? "Just a moment ago" 
                                    : format(new Date(message.createdOn!.toString()), "MMMM d, yyyy h:mm:ss bbb")
                                }
                            </p>
                        </div>
                    </div>
                ))
            )}
            <form 
                className='absolute w-full left-0 bottom-0 my-6 p-2 border border-gray-300 rounded'
                onSubmit={(e) => handleSendMessage(e)}
            >
                <textarea 
                    rows={3}
                    name="messageToAdd"
                    id="messageToAdd"
                    className='block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm'
                    placeholder="Type a new message..."
                    value={newMessageBody}
                    onChange={e => setNewMessageBody(e.target.value)}
                />
                <div className='flex justify-end'>
                    <button
                        type='submit'
                        className='px-4 py-2 flex items-center gap-1 bg-indigo-600 text-white text-sm rounded
                            hover:bg-indigo-700 transition duration-150'
                    >
                        <SendIcon fontSize="small" />Send message
                    </button>
                </div>
            </form>
        </div>
    )
}
