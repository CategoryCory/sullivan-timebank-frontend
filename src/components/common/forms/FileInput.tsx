import React, { useEffect, useState } from 'react';
import { useFormikContext } from "formik";
import UploadFileIcon from '@mui/icons-material/UploadFile';

interface Props {
    name: string;
    maxSizeInMB?: number;
}

export default function FileInput(props: Props) {
    const [labelText, setLabelText] = useState<string>("Click here to upload a file");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [uploadedFileURL, setUploadedFileURL] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const formikProps = useFormikContext();

    // If max size isn't set in props, set default of 5MB
    const maxFileSize = props.maxSizeInMB ?? 5242880;

    useEffect(() => {
        if (uploadedFile) {
            setUploadedFileURL(URL.createObjectURL(uploadedFile));
        }
    }, [uploadedFile]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const fileSize = e.target.files[0].size;

        if (fileSize > maxFileSize) {
            setErrorMessage("File size must be less than 5 MB.");
            return;
        }

        formikProps.setFieldValue(props.name, e.target.files[0]);
        setUploadedFile(e.target.files[0]);
        setErrorMessage(null);

        setLabelText("Change current file");
    }

    return (
        <>
            <div className="flex flex-col items-start">
                <div className='flex items-center gap-6'>
                    <label
                        htmlFor={`file-input-${props.name}`}
                        className="px-4 py-2 flex items-center gap-2 text-gray-400 border-2 border-gray-400 border-dashed 
                            rounded-md cursor-pointer hover:text-indigo-600 hover:border-indigo-400 transition duration-150"
                    >
                        <UploadFileIcon fontSize="small" sx={{ color: "inherit" }} />
                        {labelText}
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
                <img
                    src={uploadedFileURL ?? ""}
                    alt={uploadedFileURL ?? ""}
                    className="mt-6 max-w-[200px] max-h-[200px]"
                />
                {errorMessage && <p className="mt-1 text-red-600">{errorMessage}</p>}
            </div>
        </>
    )
}
