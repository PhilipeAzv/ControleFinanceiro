export const transactions:{description:string, amount: number, date: string}[] = [
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

export const getUserData = ()=>{ 
    const transacoes = transactions.map(({amount})=>amount)
    const entradas = transacoes.filter(x=>x>0).reduce((a,b)=>a+b)
    const saidas = Math.abs(transacoes.filter(x=>x<0).reduce((a,b)=>a+b))
    const total = transacoes.reduce((a,b)=>a+b)
    return {entradas,saidas,total,transactions}
}

