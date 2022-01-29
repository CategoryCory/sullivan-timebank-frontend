import React from 'react';
import { useField } from "formik";

interface Props {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
}

export default function TextInput(props: Props) {
    const [field, meta] = useField(props.name);

    return (
        <div>
            <label htmlFor={props.name} className="block mb-2">{props.label}</label>
            <input
                {...field}
                {...props}
                className="w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                    focus:border-indigo-600 transition duration-150"
            />
            {meta.touched && meta.error ? (
                <p className="mt-1 text-red-600">{meta.error}</p>
            ) : null}
        </div>
    )
}
