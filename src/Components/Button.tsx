import React from 'react';

type ButtonPropsType = {
    name: string,
    callback: () => void;

}



const Button = (props: ButtonPropsType) => {

    const OnAllClickHandler = () => {
        props.callback()
    }
    return (
           <button onClick={OnAllClickHandler}>{props.name}</button>
    );
};

export default Button;