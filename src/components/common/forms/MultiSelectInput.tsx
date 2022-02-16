import React from 'react';
import { useField } from "formik";
import { StylesConfig } from "react-select";
import CreatableSelect from "react-select/creatable";
import { OptionType } from '../../../models/options';

interface Props {
    label: string;
    name: string;
    options: Array<OptionType>;
    currentSelections: Array<OptionType>;
    onSelectionChange: (selections: OptionType[]) => void;
}

export default function MultiSelectInput(props: Props) {
    const [field, meta] = useField(props.name);

    const customStyles: StylesConfig<OptionType, true> = {
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isDisabled
                ? undefined
                : state.isSelected
                ? "rgb(255,0,0)"
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
            <CreatableSelect
                name={field.name}
                isMulti
                isClearable
                options={props.options}
                defaultValue={props.currentSelections}
                styles={customStyles}
                onChange={(options) => {
                    props.onSelectionChange(options.map(option => (
                        {
                            value: option.value,
                            label: option.label,
                            __isNew__: option.__isNew__ ? true : false,
                        }
                    )));
                }}
            />
            {meta.touched && meta.error ? (
                <p className='mt-1 text-red-600'>{meta.error}</p>
            ) : null}
        </div>
    )
}
