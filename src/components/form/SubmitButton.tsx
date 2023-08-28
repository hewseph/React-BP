import 'react'
import { useSubmitContext } from './hooks/useFormContextHooks';
import { Button } from '@mui/material';

const SubmitButton = ({ text }: { text: string }) => {
    const submit = useSubmitContext()

    return (
        <Button type="submit" variant='contained' onClick={submit}>
            {text}
        </Button>
    )
}

export default SubmitButton
