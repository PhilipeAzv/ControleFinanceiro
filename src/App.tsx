import React from 'react';
import styled from "styled-components"
import "./App.css"
import {Balanco} from "./Modules/balanco/Balanco"
import { Transacoes } from './Modules/transacoes/Transacoes';
import { getUserData } from "../src/Modules/balanco/getUser";
import { useState, useEffect } from 'react';

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
  const {entradas, saidas, total,transactions} = getUserData()
  const [datas, setData] = useState(Array)
  
  useEffect(()=>{
    setData(transactions)
    console.log(datas)
  },[])

  return (
    <>
    <Header>
    <Titulo>Sistema Financeiro $</Titulo>
    </Header>
    <Balanco/>
    <Transacoes data={datas}/>
    </>
  );
}

export default App;
