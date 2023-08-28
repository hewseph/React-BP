import { createContext } from 'react';
import { FormObj, IFormImplementation } from './hooks/useFormImplementation';

export interface IFormContext<T extends FormObj> {
    submit?: (...vals: any[]) => void;
    form: IFormImplementation<T> | null
}

export const FormContext = createContext<IFormContext<any>>({
    submit: () => { },
    form: null,
});
