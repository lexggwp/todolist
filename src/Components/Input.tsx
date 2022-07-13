import React from 'react';
import style from './Input.module.css'

type InputPropsType = {
    setNewTitle: (title: string) => void,
    title: string;
    callBack: () => void
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
            props.callBack();
        }
    }
    return (
        <>
        <input className={props.error ?style.error: ''} onKeyDown={onKeyPressHandler}
               value={props.title}
               onChange={onChangeHandler}/>


        </>
    );
};

export default Input;