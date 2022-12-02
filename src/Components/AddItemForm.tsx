import React, {useState} from 'react';
import {Button, TextField} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void;
}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [error, setError] = useState(false)
    const [inputValue, setInputValue] = useState('');

    const setInputValueHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setInputValue(event.currentTarget.value)
    }
    const onEnterAddItemHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addItem(inputValue);
        }
    }
    const AddItemHandler = () => {
        if (inputValue.trim().length) {
            props.addItem(inputValue.trim())
            setInputValue('');
        } else {
            setError(true)
        }
    }
    return (
        <div>
            <TextField style={ {marginRight: '5px'}}
                       error={error}
                       size="small"
                       onKeyDown={onEnterAddItemHandler}
                       value={inputValue}
                       onChange={setInputValueHandler}
                       label={error ? 'Invalid text!': 'Put a text'}
                       variant="outlined" />
            <Button size="large" variant="contained" onClick={AddItemHandler}>+</Button>
        </div>
    );
};

export default AddItemForm;