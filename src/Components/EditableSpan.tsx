import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    inputValue: string;
    changeTaskInputValue: (inputValue: string) => void;
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editView, setEditView] = useState(false);
    const [inputValue, setInputValue] = useState(props.inputValue)
    const onClickEditViewHandler = () => {
        setEditView(!editView)
    }
    const onBlurEditHandler = () => {
        setEditView(!editView)
        props.changeTaskInputValue(inputValue);
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    return (
        editView ?  <TextField variant={'standard'} onChange={onChangeHandler} onBlur={onBlurEditHandler} value={inputValue} autoFocus/> :
            <span onDoubleClick={onClickEditViewHandler} >{props.inputValue}</span>
    );
};

export default EditableSpan;