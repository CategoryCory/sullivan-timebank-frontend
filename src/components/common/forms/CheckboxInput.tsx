import React, { ReactNode } from 'react';
import { useField } from "formik";

interface Props {
    name: string;
    children: ReactNode;
}

export default function CheckboxInput({children, ...props}: Props) {
    const [field, meta] = useField({ ...props, type: "checkbox" });

    return (
        <div>
            <label className="flex items-center gap-2">
                <input 
                    type="checkbox"
                    className="w-5 h-5 rounded-sm text-indigo-600 border-slate-400 border-2
                                focus:ring-indigo-600"
                    {...field}
                    {...props}
                />
                {children}
            </label>
            {meta.touched && meta.error ? (
                <p className="mt-1 text-red-600">{meta.error}</p>
            ) : null}
        </div>
    );
}
