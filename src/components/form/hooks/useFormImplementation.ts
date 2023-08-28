import { ChangeHandler, FieldValues, FormState, Path, PathValue, useForm, UseFormRegisterReturn } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from "react";

export type FormObj = { [key: string]: string | boolean | undefined }

export interface IFormImplementation<T extends FormObj> {
    fieldProps: { [key in keyof T]: IFieldProps },
    errors: FormState<FormObj>['errors'],
    reset: any,
    handleSubmit: (
        submit: (values: T, e: any, reset: () => void) => void
    ) => ReturnType<any>,
}

interface IFieldProps extends UseFormRegisterReturn {
    error: boolean,
    helperText?: string,
    onChange: ChangeHandler,
    setValue: (val: string | boolean) => void,
    value: any,
}

export function useFormImplementation<T extends FormObj>(
    schema: ObjectSchema<T>,
    // fieldNames: (string)[],
    initialValues?: T
): IFormImplementation<T> {
    const fieldNames = Object.keys({ ...schema.fields });
    const { register, handleSubmit, formState: { errors }, setValue, reset, getValues, watch } = useForm({
        mode: "onBlur",
        resolver: yupResolver(schema),
    });

    (fieldNames as (keyof T)[]).forEach(fieldName => watch(fieldName as Path<T>));
    const allValues = getValues();

    const getDefaultValue = useCallback((fieldName: string) => {
        if (schema.fields[fieldName]?.toString() === "boolean") {
            return false
        }
        return ""
    }, [schema])

    const fieldProps: { [key in keyof T]: IFieldProps } = fieldNames.reduce((acc, name) => {
        return {
            ...acc,
            [name]: {
                ...register(name as Path<T>),
                error: !!errors[name],
                helperText: errors[name]?.message || " ",
                onChange: (e: any) => {
                    setValue(name as Path<T>, e.target.value)
                },
                setValue: (val: string | boolean) => setValue(name as Path<T>, val as PathValue<T, Path<T>>),
                value: allValues[name] || getDefaultValue(name),
            }
        }
    }, {}) as { [key in keyof T]: IFieldProps };

    useEffect(() => {
        if (initialValues) {
            for (const key in initialValues) {
                fieldProps[key]?.setValue(initialValues[key] as string)
            }
        } else {
            fieldNames.forEach(key => fieldProps[key]?.setValue(getDefaultValue(key)))
        }
    }, [initialValues])

    return {
        fieldProps,
        errors,
        reset,
        handleSubmit: (
            submit: (values: T, e: any, reset: () => void) => void
        ) => handleSubmit(
            ((values: FieldValues, e: any) =>
                submit(values as T, e, reset)
            ) as (values: FieldValues) => void),
    }
}
