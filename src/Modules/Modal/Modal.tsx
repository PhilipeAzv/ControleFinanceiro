import React from "react";
import styled from "styled-components";
import { transacao } from "../balanco/getUser";

interface IModal{
    data: any
    isOpened: boolean
    closeModal: ()=>void
    pushTransaction: any 
}

const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .7);
    position: fixed;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 1;
    visibility: visible;
    z-index: 1000;
`
const Modall = styled.div`
    background: #f0f2f5;
    padding: 2.4rem;
    position: relative;
    z-index: 1;
`

const ModalForm = styled.form`
    max-width: 500px;

    h2{
        margin-top: 0;
    }
`

const InputGroup = styled.div`
    margin-top: .8rem;

    small{
        opacity: .5;
    }
`

const Inputs = styled.input`
    width: 100%;
    border: none;
    border-radius: .2rem;
    padding: .8rem;
`

const FormActions = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
`

const FormButton = styled.button`
    margin-top: 20px;
    width: 50%;
    height: 50px;
    cursor: pointer;
`

export const Modal = ({data, isOpened, closeModal, pushTransaction}:IModal)=>{
    if (!isOpened) return null

    function addTransaction(){
        const des = (document.getElementById("description") as HTMLInputElement)?.value
        const amount = (document.getElementById("amount") as HTMLInputElement)?.value
        const date = (document.getElementById("date") as HTMLInputElement)?.value        
        return {des, amount, date}
    }

    return(
        <ModalContainer>
            <Modall>
                <ModalForm onSubmit={()=>console.log("test")}>
                    <h2>Nova transação</h2>
                    <InputGroup>
                        <Inputs type="text" name="description" id="description" placeholder="Descrição"/>
                    </InputGroup>
                    <InputGroup>
                        <Inputs type="number" step="0.01" name="amount" id="amount" placeholder="0,00"/>
                        <small>Use o sinal - (negativo) para despesas e , (virgula) para casas decimais</small>
                    </InputGroup>
                    <InputGroup>
                        <Inputs type="date" name="date" id="date"/>
                    </InputGroup>
                    <FormActions>
                        <FormButton onClick={(e)=>{e.preventDefault(); closeModal()}} style={{color:"red", border:"solid 1px red"}}>Cancelar</FormButton>
                        <FormButton onClick={(e)=>{e.preventDefault(); pushTransaction(addTransaction().des, addTransaction().amount,addTransaction().date)}} style={{backgroundColor: "green", border:"none", color:"white"}}>Salvar</FormButton>
                    </FormActions>
                </ModalForm>
            </Modall>
        </ModalContainer>
    )
}