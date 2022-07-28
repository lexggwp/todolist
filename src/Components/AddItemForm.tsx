import React, {useState} from 'react';
import Input from "./Input";
import Button from "./Button";
import style from "./Todolist.module.css";

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
            <Button name={'+'} callback={AddItem}/>
            {error && <div className={style.errorMessage}>{error}</div>}
        </div>
    );
};

export default AddItemForm;