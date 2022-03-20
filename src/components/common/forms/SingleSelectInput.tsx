import React from 'react';
import { ErrorMessage, Field, FieldProps, useFormikContext } from 'formik';
import { NumberOptionType } from '../../../models/options';

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    options: NumberOptionType[];
    currentSelection?: number;
    onSelectionChange?: (selection: NumberOptionType) => void;
}

export default function SingleSelectInput(props: Props) {
    const formikProps = useFormikContext();

    return (
        <div>
            {props.label && <label htmlFor={props.name} className="block mb-2">{props.label}</label>}
            <Field
                name={props.name}
            >   
                {({ field /*, form, meta */ }: FieldProps) => (
                    <select
                        value={field.value}
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                            formikProps.setFieldValue(props.name, e.target.value);
                        }}
                        className="w-full border-2 border-slate-400 rounded focus:ring-0 focus:border-indigo-600
                                    transition duration-150"
                    >
                        <option value="0"></option>
                        {props.options.map(option => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                )}
            </Field>
            <ErrorMessage
                name={props.name}
                component='p'
                className='mt-1 text-red-600'
            />
        </div>
    )
}
