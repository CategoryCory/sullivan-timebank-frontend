import React, { useEffect, useState } from 'react';
import { ErrorMessage, Field, useField } from 'formik';

interface Props {
    label: string;
    name: string;
    maxLength: number;
    rows: number;
}

export default function TextareaInput(props: Props) {
    const [field] = useField(props.name);
    const [letterCount, setLetterCount] = useState(0);

    useEffect(() => {
        if (field.value) {
            setLetterCount((field.value as string).length);
        }
    }, [field.value]);

    return (
        <div>
            <label htmlFor={props.name} className="block mb-2">{props.label}</label>
            <Field
                {...field}
                {...props}
                as='textarea'
                rows={props.rows}
                className="w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                    focus:border-indigo-600 transition duration-150"
            />
            <p className={`text-slate-400 text-right ${letterCount > props.maxLength ? 'text-red-500' : ''}`}>
                Characters used: {letterCount} / {props.maxLength}
            </p>
            <ErrorMessage
                name={props.name}
                component='p'
                className='mt-1 text-red-600'
            />
        </div>
    );
}
