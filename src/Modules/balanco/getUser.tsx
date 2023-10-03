import { useEffect, useState, useCallback } from "react"

export class transacao{
    description: string
    amount: number
    date: string
    constructor(des:string,amount:number,date:string){
        this.description = des
        this.amount = amount
        this.date = date
    }
}

export const functions = {
    selectItem(transaction:any, callback:(param:any)=>void){
        callback(transaction)
      },
      editTransaction(data:any, selectedTransaction:any, callback:(param:any)=>void){
        const des = (document.getElementById("description") as HTMLInputElement)?.value
        const amount = Number((document.getElementById("amount") as HTMLInputElement)?.value)
        const date = (document.getElementById("date") as HTMLInputElement)?.value.split('-').reverse().map((x, index)=>{if(index < 2){return x+'/'}else{return x}}).join('')
        const editedData = [...data]
        callback(()=>editedData.map((x:any, index)=> index === selectedTransaction?.index ? {description: des, amount: amount, date: date} : x ))
    },
    deleteTransaction(index:number, data:any, callback:(param:any)=>void){
        const filteredData = (data.filter((item:any,itemIndex:any)=>itemIndex !== index ))
       callback(filteredData)
      },
      addTransaction(transaction:{des:string, amount: number, date:string}, data:any, callback:(param:any)=>void){
        const addedData = [...data]
        const splitData = transaction.date.split("-")
        const newDate = `${splitData[2]}/${splitData[1]}/${splitData[0]}`
        addedData.push(new transacao(transaction.des,Number(transaction.amount),newDate))
        callback(addedData)
        localStorage.setItem('transactionsData', JSON.stringify(addedData))
      }
}

export function useData(data:{description:String, amount:number, date: String}[]){
    const [entradas, setEntradas] = useState(0)
    const [saidas, setSaidas] = useState(0)
    const [total, setTotal] = useState(0)
    const [dados, setDados] = useState(Array)

    useEffect(()=>{
        const getTransacoes = data?.map(({amount})=>amount)
        const getEntradas = getTransacoes?.filter(x=>x>0).reduce((a,b)=>a+b,0)
        const getSaidas = Math.abs(getTransacoes?.filter(x=>x<0).reduce((a,b)=>a+b,0))
        const getTotal = getTransacoes?.reduce((a,b)=>a+b,0)
        
        setDados(data)
        setEntradas(getEntradas)
        setSaidas(getSaidas)
        setTotal(getTotal)
    },[data])

    return {entradas, saidas, total,dados}
}
