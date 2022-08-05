import React, {useState} from 'react';
import Input from "./Input";
import {Button} from "@mui/material";

type AddItemFormPropsType = {
    addItem: (inputValue: string) => void;

}

const AddItemForm = (props: AddItemFormPropsType) => {
    const [error, setError] = useState<string>('')
    const [inputValue, setInputValue] = useState('');
    const AddItem = () => {
        if (inputValue.trim().length) {
            props.addItem(inputValue)
            setInputValue('');
        } else {
            setError('Title is required')
        }
    }
    return (
        <div>
            <Input setError={setError} error={error} onEnter={AddItem} title={inputValue} setNewTitle={setInputValue}/>
            <Button size="large" variant="contained" onClick={AddItem}>+</Button>
        </div>
    );
};

export default AddItemForm;