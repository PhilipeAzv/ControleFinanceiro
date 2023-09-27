import { useEffect, useState } from "react"

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

export const transactions = [
    {
        description: 'Luz',
        amount: -50000,
        date: '23/01/2021'
    },
    {
        description: 'Website',
        amount: 500000,
        date: '23/01/2021'
    },
    {
        description: 'Internet',
        amount: -20000,
        date: '23/01/2021'
    },
    {
        description: 'App',
        amount: 200000,
        date: '23/01/2021'
    }
]

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
