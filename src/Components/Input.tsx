import React from 'react';

type InputPropsType = {
    setNewTitle: (title: string) => void,
    title: string;
    callBack: () => void
}

const Input = (props: InputPropsType) => {

    const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setNewTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.callBack();
        }
    }
    return (
        <input onKeyDown={onKeyPressHandler}
               value={props.title}
               onChange={onChangeHandler}/>

    );
};

export default Input;