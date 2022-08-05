import React from 'react';
import {TextField} from "@mui/material";

type InputPropsType = {
    setNewTitle: (title: string) => void,
    title: string;
    onEnter: () => void
    error: string;
    setError: (error: string) => void;
}

const Input = (props: InputPropsType) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setError('')
        props.setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.onEnter();
        }
    }
    return (
        <>
            <TextField style={ {marginRight: '5px'}} error={!!props.error}
                       size="small"
                       onKeyDown={onKeyPressHandler}
                       value={props.title}
                       onChange={onChangeHandler}
                       id="outlined-basic"
                       label={props.error ? 'Invalid text!': 'Put a text'}
                       variant="outlined" />
        </>

    );
};

export default Input;