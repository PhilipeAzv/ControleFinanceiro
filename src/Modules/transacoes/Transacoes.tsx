import { useEffect, useState } from "react";
import { useData } from "../balanco/getUser";
import styled from "styled-components";
import {ReactComponent as IconMinus} from "../../Icons/minus.svg"

const Transactions = styled.div`
    width: calc(70%);
    overflow-x: auto;
    margin: auto;
    margin-top: 50px;
    position: relative;
    height: auto;

    a{
        color: green;
        cursor: pointer;
        font-size: 18px;    
    }
`

const Tabela = styled.table`
    width: 100%;
    border-spacing: 0 0.5rem;
    color: #969cb3;
    border-radius: 0.25rem 0 0 0.25rem;
    height: 300px;
    font-size: 18px;
    text-align: left;
    height: 50px;
    
    tr:not(:first-child){
        &:hover{
            opacity: 0.7;
        }
    }

    tr{
        height: 50px;
        background-color: white;
        border-radius: 0.25rem 0 0 0.25rem;
    }
    
   th{
    padding-left: 10px;
   }
   
    td{
        padding-left: 10px;
        border-radius: 0.25rem 0 0 0.25rem;
    }

    svg{
        cursor: pointer;
    }

`



export const Transacoes = ({data, deleteItem, openModal}:any) => {
   const {dados} = useData(data)
   const newData = [...data]
    return (
        <Transactions>
            <a href="#" onClick={openModal}>+ Adicionar Transação</a>
            <Tabela>
                <tr>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Data</th>
                    <th></th>
                </tr>
                {dados?.map(({description, amount, date}:any, index:number)=>[
                    <tr key={index}>
                        <td>{description}</td>
                        <td>{amount}</td>
                        <td>{date}</td>
                        <td><IconMinus onClick={()=>deleteItem(index,newData)} title="Deletar transação"/></td>
                    </tr>
                ]) 
                }
            </Tabela>
        </Transactions>
    )
}