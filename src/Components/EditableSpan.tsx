import React, {ChangeEvent, useState} from 'react';

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
        editView ?  <input onChange={onChangeHandler} onBlur={onBlurEditHandler} value={inputValue} autoFocus/> :
            <span onDoubleClick={onClickEditViewHandler} >{props.inputValue}</span>
    );
};

export default EditableSpan;