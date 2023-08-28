import { useContext, useMemo } from 'react';
import { FormContext } from '../FormContext';
import { FormObj, IFormImplementation } from './useFormImplementation';
import FormTextField from '../FormTextField';

export const useFormContext = () => useContext(FormContext).form as IFormImplementation<any>;

export const useSubmitContext = () => useContext(FormContext).submit;

export const useTextFieldContext = (name: string) => useFormContext().fieldProps[name];

export const useFormKeys = <T extends FormObj>(): { [K in keyof Required<T>]: keyof T } => {
    const fieldPropsKeys = Object.keys(useFormContext().fieldProps) as (keyof T)[];

    return useMemo(() => fieldPropsKeys.reduce((acc, cv) => {
        acc[cv] = cv;
        return acc;
    }, {} as { [K in keyof Required<T>]: keyof T }), []);
};

export const useFields = <T extends FormObj>() => {
    const keys = useFormKeys<T>()

    return useMemo(() => ({
        FormTextField: FormTextField<T>,
        // add other Input fields here (e.g. Autocomplete, Switch, select, etc...)
        keys
    }), [])
}
