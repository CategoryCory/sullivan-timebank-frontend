import React, { useEffect, useRef, useState } from 'react';
import { ErrorMessage, useFormikContext } from "formik";
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
    name: string;
    label?: string;
}

export default function FileInput(props: Props) {
    const [labelText, setLabelText] = useState<string>("Click here to upload a file");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const imageThumbnailRef = useRef<HTMLImageElement>(null);
    const formikProps = useFormikContext();

    useEffect(() => {

    }, [uploadedFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        formikProps.setFieldValue(props.name, e.target.files[0]);

        if (imageThumbnailRef.current != null) {
            // const fileReader = new FileReader();

            // fileReader.addEventListener("load", e => {
            //     imageThumbnailRef.current.src = e.target.result;
            // });
        }

        setUploadedFile(e.target.files[0]);
        setLabelText("Change current file");
    }

    return (
        <div>
            <div className='flex items-center gap-6'>
                <label
                    htmlFor={`file-input-${props.name}`}
                    className="px-4 py-2 flex items-center gap-2 text-gray-400 border-2 border-gray-400 border-dashed 
                        rounded-md cursor-pointer hover:text-indigo-600 hover:border-indigo-400 transition duration-150"
                >
                    <UploadFileIcon fontSize="small" sx={{ color: "inherit" }} />
                    {props.label ?? labelText}
                    <input
                        id={`file-input-${props.name}`}
                        className="hidden"
                        name={props.name}
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleChange}
                    />
                </label>
                <p className="text-sm text-gray-500">
                    {uploadedFile != null ? `Current image: ${uploadedFile.name}` : "No image currently selected."}
                </p>
            </div>
            {uploadedFile && (
                <img
                    src={URL.createObjectURL(uploadedFile)}
                    alt=""
                    ref={imageThumbnailRef}
                    className="mt-6 max-w-[200px] max-h-[200px]"
                />
            )}
        </div>
    )
}
