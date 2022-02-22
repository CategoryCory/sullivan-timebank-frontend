import React from 'react';
import { ErrorMessage, Field, useField } from "formik";

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    type: string;
}

export default function TextInput(props: Props) {
    const [field] = useField(props.name);

    return (
        <div>
            {props.label && <label htmlFor={props.name} className="block mb-2">{props.label}</label>}
            <Field
                {...field}
                {...props}
                className="w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                    focus:border-indigo-600 transition duration-150"
            />
            <ErrorMessage
                name={props.name}
                component='p'
                className='mt-1 text-red-600'
            />
        </div>
    )
}
