import { Modal } from "./Modules/Modal/Modal";
import styled from "styled-components"
import "./App.css"
import {Balanco} from "./Modules/balanco/Balanco"
import { Transacoes } from './Modules/transacoes/Transacoes';
import { transactions, transacao } from "./Modules/balanco/getUser";
import { useState, useEffect } from 'react';
import { Toasty } from "./Modules/Toasty/Toasty";

const Header = styled.header`
  width: 100%;
  height: 200px;
  background: linear-gradient(to top,rgb(91, 158, 91),rgb(9, 70, 9));
`

const Titulo = styled.h1`
  padding-top: 30px;
  color: black;
  font-size: 30px;
  text-align: center;
`

function App() {
  const [datas, setData] = useState(Array)
  const [modalOpen, setModalOpen] = useState(false)
  const [openToasty, setOpenToasty] = useState(false)

 

  useEffect(()=>{
    const transactionData = localStorage.getItem('transactionsData')
    transactionData && setData(JSON.parse(transactionData))
  },[])

  useEffect(()=>{
    datas.length > 0 && localStorage.setItem('transactionsData', JSON.stringify(datas))
  }, [datas])
  
  function deleteItem(index:number, newData:[]){
    newData.splice(index,1)
    setData(newData)
  }

  function addTransaction(x:string,y:number,z:string){
    const addedData = [...datas]
    const splitData = z.split("-")
    const newDate = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
    addedData.push(new transacao(x,Number(y),newDate))
    setData(addedData)
    localStorage.setItem('transactionsData', JSON.stringify(addedData) )
    if(!openToasty){
      setOpenToasty(!openToasty)
    }
  }

  return (
    <>
    {openToasty &&
    <Toasty isOpened={openToasty} closeToasty={()=>setOpenToasty(!openToasty)}/>
    }
    <Header>
    <Titulo>Sistema Financeiro $</Titulo>
    </Header>
    <Balanco data={datas}/>
    <Transacoes openModal={()=>setModalOpen(!modalOpen)} data={datas} deleteItem={deleteItem}/>
    <Modal pushTransaction={addTransaction} isOpened={modalOpen} closeModal={()=>setModalOpen(false)}/>
    </>
  );
}

export default App;
