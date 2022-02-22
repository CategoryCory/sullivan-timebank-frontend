import React from 'react';
import Select, { StylesConfig } from "react-select";
import { ErrorMessage, useFormikContext } from 'formik';
import { OptionType } from '../../../models/options';

interface Props {
    name: string;
    label?: string;
    placeholder?: string;
    options: OptionType[];
    onSelectionChange?: (selection: OptionType) => void;
}

export default function SingleSelectInput(props: Props) {
    const formikProps = useFormikContext();

    const customStyles: StylesConfig<OptionType, false> = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isDisabled
                ? undefined
                : state.isSelected
                ? "rgb(79 70 229)"
                : state.isFocused
                ? "#c7d2fe"
                : undefined,
        }),
        control: (provided, state) => ({
            ...provided,
            padding: "0.15rem 0.4rem",
            border: state.isFocused ? "2px solid rgb(79 70 229)" : "2px solid rgb(148 163 184)",
            borderRadius: "0.25rem",
            boxShadow: state.isFocused ? "none" : "none",
        }),
        singleValue: (provided, state) => ({
            ...provided,
        })
    };

    return (
        <div>
            {props.label && <label htmlFor={props.name} className="block mb-2">{props.label}</label>}
            <Select
                name={props.name}
                placeholder={props.placeholder}
                styles={customStyles}
                options={props.options}
                onChange={option => formikProps.setFieldValue(props.name, option?.value)}
            />
            <ErrorMessage
                name={props.name}
                component='p'
                className='mt-1 text-red-600'
            />
        </div>
    )
}
