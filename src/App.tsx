import { Modal } from "./Modules/Modal/Modal";
import styled from "styled-components"
import "./App.css"
import {Balanco} from "./Modules/balanco/Balanco"
import { Transacoes } from './Modules/transacoes/Transacoes';
import { functions, transacao } from "./Modules/balanco/getUser";
import { useState, useEffect } from 'react';
import { Toasty } from "./Modules/Toasty/Toasty";
interface IData{
  description: string
  amount: number
  date: string
  index?: number
}
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
  const [datas, setData] = useState(Array<IData>)
  const [modalOpen, setModalOpen] = useState(false)
  const [openToasty, setOpenToasty] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState<IData>()

  useEffect(()=>{
    const transactionData = localStorage.getItem('transactionsData')
    transactionData && setData(JSON.parse(transactionData))
  },[])

  useEffect(()=>{
    datas.length > 0 ? 
      localStorage.setItem('transactionsData', JSON.stringify(datas)) 
    :
      localStorage.removeItem('transactionsData')
  }, [datas])
  
  function addTransaction(transaction:any){
    functions.addTransaction(transaction, datas, setData)
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
    <Transacoes openModal={()=>setModalOpen(!modalOpen)} data={datas} deleteItem={(p1:any, p2:any)=>functions.deleteTransaction(p1,p2, setData)} selectItem={(item:any)=>functions.selectItem(item,setSelectedTransaction)}/>
    <Modal pushTransaction={(transaction:any)=>addTransaction(transaction)} isOpened={modalOpen} closeModal={()=>{setModalOpen(false); setSelectedTransaction(undefined)}} selectedItem={selectedTransaction} editItem={()=>functions.editTransaction(datas,selectedTransaction,setData)}/>
    </>
  );
}

export default App;
