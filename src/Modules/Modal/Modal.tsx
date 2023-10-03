
import styled from "styled-components";
import { useEffect, useState } from 'react'

interface IData{
    description: string
    amount: number
    date: string
}

interface IModal{
    isOpened: boolean
    closeModal: ()=>void
    pushTransaction: any 
    selectedItem?: IData
    editItem?: any
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

export const Modal = ({isOpened, closeModal, pushTransaction, selectedItem, editItem}:IModal)=>{
    const [dateForm, setDateForm] = useState<string>()

    useEffect(()=>{
        selectedItem ? setFormValue() : setDateForm("")
     },[isOpened])
    
    const setFormValue = () => {
        const dateValue = selectedItem?.date.split('/').reverse().map((x, index)=>{if(index < 2){return x+'-'}else{return x}}).join('')
        setDateForm(dateValue)
    }

    if (!isOpened) return null

    function handleSubmit(e:any){
        e.preventDefault()
        console.log(e.target[0].value)
        const des = (document.getElementById("description") as HTMLInputElement)?.value
        const amount = (document.getElementById("amount") as HTMLInputElement)?.value
        const date = (document.getElementById("date") as HTMLInputElement)?.value
        selectedItem ? 
            editItem && editItem()
        :
            pushTransaction({des, amount,date})
                closeModal && closeModal()
    }

    return(
        <ModalContainer>
            <Modall>
                <ModalForm onSubmit={(e)=>handleSubmit(e)}>
                    <h2>{selectedItem ? selectedItem.description : 'Nova transação'}</h2>
                    <InputGroup>
                        <Inputs type="text" name="description" id="description" placeholder="Descrição" defaultValue={selectedItem ? selectedItem.description : ''} required/>
                    </InputGroup>
                    <InputGroup>
                        <Inputs type="number" step="0.01" name="amount" id="amount" placeholder="0,00" defaultValue={selectedItem ? selectedItem.amount : ''} required/>
                        <small>Use o sinal - (negativo) para despesas e , (virgula) para casas decimais</small>
                    </InputGroup>
                    <InputGroup>
                        <Inputs type="date" name="date" id="date" required onChange={(e)=>{if(e.target.value.length > 10){ setDateForm(e.target.value.slice(0,10))}else{setDateForm(e.target.value)}}} value={dateForm} />
                    </InputGroup>
                    <FormActions>
                        <FormButton type='button' onClick={closeModal} style={{color:"red", border:"solid 1px red"}}>Cancelar</FormButton>
                        <FormButton type='submit' style={{backgroundColor: "green", border:"none", color:"white"}}>Salvar</FormButton>
                    </FormActions>
                </ModalForm>
            </Modall>
        </ModalContainer>
    )
}