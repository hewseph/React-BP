import { TextField } from '@mui/material'
import { useContext } from 'react'
import { FormContext } from './FormContext';
import { IFormImplementation } from './hooks/useFormImplementation';

export const useFormContext = () => useContext(FormContext).form as IFormImplementation<any>;

export const useTextFieldContext = (name: string) => useFormContext().fieldProps[name];

interface FormTextFieldProps<T> {
    name: keyof T;
    label: string;
}

export default function FormTextField<T>({ name, label }: FormTextFieldProps<T>) {
    const props = useTextFieldContext(name as string)

    return <TextField {...props} label={label} />
}
