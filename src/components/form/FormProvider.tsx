import { FormContext } from './FormContext';
import { IFormContext } from './FormContext';
import { FormObj } from './hooks/useFormImplementation';

interface FormProviderProps<T extends FormObj> extends IFormContext<T> {
    children: any,
}

export function FormProvider<T extends FormObj>({
    children, submit, form
}: FormProviderProps<T>) {
    return (
        <FormContext.Provider
            value={{
                submit,
                form,
            }}
        >
            <form onSubmit={submit}>
                {children}
            </form>
        </FormContext.Provider>
    );
};
