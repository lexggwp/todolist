import React from 'react';

type ButtonPropsType = {
    name: string,
    callback: () => void;
    style?: string;

}



const Button = (props: ButtonPropsType) => {

    const onClickHandler = () => {
        props.callback()
    }
    return (
           <button className={props.style} onClick={onClickHandler}>{props.name}</button>
    );
};

export default Button;