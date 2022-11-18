import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    inputValue: string;
    changeTaskInputValue: (inputValue: string) => void;
}

const EditableSpan = (props: EditableSpanPropsType) => {
    const [editView, setEditView] = useState(false);
    const [inputValue, setInputValue] = useState(props.inputValue)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.currentTarget.value)
    }

    const toggleMode = () => {
        setEditView(!editView);
        if (editView && inputValue !== props.inputValue && inputValue.length) {
            props.changeTaskInputValue(inputValue);
        } else setInputValue(props.inputValue);
    }

    return (
        editView ? <TextField variant={'standard'} onChange={onChangeHandler} onBlur={toggleMode} value={inputValue}
                              autoFocus/> :
            <span onDoubleClick={toggleMode}>{props.inputValue}</span>
    );
};

export default EditableSpan;