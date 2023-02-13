import styled, { keyframes } from "styled-components";
import {ReactComponent as IconConfirm} from "../../Icons/IconConfirm.svg"
import { useEffect } from "react";

const Animation = keyframes`
    0%{top: -10px; opacity: 1}
    100%{top:50px; opacity: .8; transition: 1s}
`
export const DivTeste = styled.div`
    width: 300px;
    height: 40px;
    position: fixed;
    left: 50%;
    animation-name: ${Animation};
    animation-duration: 2s;
    transform: translate(-50%,-50%);
    z-index: 100000;
    border-radius: 3px;
    background-color: orange;
    margin: auto;
    display:flex;
    gap: 50px;
    align-items: center;

    p, svg{
        margin-left: 5px;
        color: white;
    }
`

interface Itoasty{
    isOpened: boolean
    closeToasty: () => void
}

export const Toasty = ({isOpened, closeToasty}:Itoasty)=>{

    useEffect(()=>{
        if(isOpened){
        setTimeout(closeToasty,1800)
        }
    },[])

    if(!isOpened) return null 
    return(
        <DivTeste>
            <IconConfirm/>
            <p>Transação Adicionada!</p>
        </DivTeste>
    )
}