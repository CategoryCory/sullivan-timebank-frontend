import React from 'react';
import { useFormikContext } from 'formik';
import { NumberOptionType } from '../../../models/options';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface Props {
    name: string;
    label: string;
    initialValue: string | undefined;
    options: NumberOptionType[];
    onSelectionChange?: (selection: NumberOptionType) => void;
}

export default function MaterialSelectInput(props: Props) {
    const formikProps = useFormikContext();

    const handleChange = (event: SelectChangeEvent<string>) => {
        formikProps.setFieldValue(props.name, event.target.value);
    }

    return (
        <div>
            <FormControl variant="standard" fullWidth>
                <InputLabel id={`id-label-${props.name}`}>{props.label}</InputLabel>
                <Select
                    id={`id-select-${props.name}`}
                    labelId={`id-label-${props.name}`}
                    name={props.name}
                    label={props.label}
                    value={props.initialValue}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 250 } } }}
                    // sx={{ maxHeight: 2 }}
                    // placeholder={props.placeholder}
                    onChange={handleChange}
                >
                    {props.options.map(option => (
                        <MenuItem value={option.value} key={option.value}>{option.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
