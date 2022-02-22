import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { ErrorMessage, useField, useFormikContext } from 'formik';

interface Props {
    label: string;
    name: string;
}

export default function TextInput(props: Props) {
    const [field] = useField(props.name);
    const { setFieldValue } = useFormikContext();

    return (
        <div>
            <label htmlFor={props.name} className="block mb-2">{props.label}</label>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    {...props}
                    {...field}
                    value={field.value === "0001-01-01T00:00:00" ? null : field.value}
                    onChange={(val) => setFieldValue(props.name, val)}
                    renderInput={({ inputRef, inputProps, InputProps }) => (
                        <div className='relative'>
                            <input 
                                ref={inputRef}
                                {...inputProps}
                                className="w-full px-4 py-2 rounded border-2 border-slate-400 focus:ring-0 
                                    focus:border-indigo-600 transition duration-150"
                            />
                            <div className='absolute bottom-2/4 right-4'>
                                {InputProps?.endAdornment}
                            </div>
                        </div>
                    )}
                />
                <ErrorMessage
                    name={props.name}
                    component='p'
                    className='mt-2 text-red-600'
                />
            </LocalizationProvider>   
        </div>
    )
}
