import * as yup from "yup";
import { FormObj, useFormImplementation } from "./components/form/hooks/useFormImplementation";
import { FormProvider } from "./components/form/FormProvider";
import { Box } from "@mui/material";
import FormTextField from "./components/form/FormTextField";
import SubmitButton from "./components/form/SubmitButton";
import { useFields } from "./components/form/hooks/useFormContextHooks";

type IAddBucketForm = {
    name?: string;
    email: string;
}

const schema: yup.ObjectSchema<IAddBucketForm> = yup.object().shape({
    name: yup.string(),
    email: yup.string().required("Email is required."),
}).required();

export const MyLogicLayer = () => {
    const form = useFormImplementation(schema)
    const handleSubmit = (formValues: IAddBucketForm) => {
        console.log({ formValues })
    }
    // do all business logic here. If additional context needs to be created in FormProvider, then do so.

    return <FormProvider form={form} submit={form.handleSubmit(handleSubmit)}>
        <MyPresentationLayer />
    </FormProvider>
}

const MyPresentationLayer = () => {
    const { FormTextField, keys } = useFields<IAddBucketForm>()

    return <Box width="45%" bgcolor={"lightgray"} flexDirection={"column"} display={"flex"} margin="auto" padding={2}>
        <FormTextField name={keys.name} label="Name" />
        <FormTextField name={keys.email} label="Email" />
        <SubmitButton text="Submit" />
    </Box>
}

/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////

interface IFavoritesForm extends FormObj {
    favoriteDish?: string;
    favoriteColor?: string;
}

const schema2: yup.ObjectSchema<IFavoritesForm> = yup.object().shape({
    favoriteDish: yup.string(),
    favoriteColor: yup.string(),
}).required();

export const MyLogicLayer2 = () => {
    const form = useFormImplementation(schema2)
    const handleSubmit = (formValues: IFavoritesForm) => {
        console.log({ formValues })
    }
    // do all business logic here. If additional context needs to be created in FormProvider, then do so.

    return <FormProvider form={form} submit={form.handleSubmit(handleSubmit)}>
        <MyPresentationLayer2 />
    </FormProvider>
}

const MyPresentationLayer2 = () => {
    return <Box width="45%" bgcolor={"lightgray"} flexDirection={"column"} display={"flex"} margin="16px auto" padding={2}>
        <FormTextField name="favoriteDish" label="Favorite Dish" />
        <FormTextField name="favoriteColor" label="Favorite Color" />
        <SubmitButton text="Submit" />
    </Box>

}
