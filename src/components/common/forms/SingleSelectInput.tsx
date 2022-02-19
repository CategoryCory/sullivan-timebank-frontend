import React from 'react';
import Select, { StylesConfig } from "react-select";
import { OptionType } from '../../../models/options';

interface Props {
    label: string;
    name: string;
    options: OptionType[];
    onSelectionChange: (selection: OptionType) => void;
}

export default function SingleSelectInput(props: Props) {
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
            padding: "0.2rem 0.4rem",
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
            <label htmlFor={props.name} className="block mb-2">{props.label}</label>
            <Select
                name={props.name}
                styles={customStyles}
                options={props.options}
                onChange={(opt, meta) => {
                    const option = {
                        value: opt!.value,
                        label: opt!.label
                    }
                    props.onSelectionChange(option)
                }}
            />
        </div>
    )
}
