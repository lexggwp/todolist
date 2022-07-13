import React from 'react';

type ButtonPropsType = {
    name: string,
    callback: () => void;
    style?: string;

}



const Button = (props: ButtonPropsType) => {

    const OnAllClickHandler = () => {
        props.callback()
    }
    return (
           <button className={props.style} onClick={OnAllClickHandler}>{props.name}</button>
    );
};

export default Button;