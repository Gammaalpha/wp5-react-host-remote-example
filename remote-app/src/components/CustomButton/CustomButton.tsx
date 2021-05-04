import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
    border-radius:16px;
    font-size:16px;
    background-color: #303f9f;
    color:white;
    min-width:66px;
    min-height:30px;

    &:active{
        background-color:#3b4a9d
    }
`;

export interface CustomButtonProps {
    text?: string
    onClick?: any
}

const CustomButton = (props: CustomButtonProps) => {

    return <StyledButton
        onClick={() => Boolean(props.onClick) ? props.onClick() : null}
    >{props.text}</StyledButton>
}

export default CustomButton;

