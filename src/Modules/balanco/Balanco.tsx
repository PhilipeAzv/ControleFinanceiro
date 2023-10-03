import styled from "styled-components";
import {ReactComponent as Plus} from "../../Icons/plus.svg"
import {ReactComponent as IconMinus} from "../../Icons/minus.svg"
import {ReactComponent as IconTotal} from "../../Icons/total.svg"
import { useData} from "./getUser";

const Balance = styled.section `
    margin-top: -6rem;
    display: flex;
    gap: 30px;
    justify-content: center;
    h1{
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border-width: 0;
    }
    @media (max-width: 500px){
        flex-direction: column;
        align-items: center;
    }
`

const Card = styled.div<{isTotal?:boolean}>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 250px;
    height: 140px;
    padding: 2rem 2rem;
    border-radius: 0.25rem;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, .7);
    margin-bottom: 2rem;
    
    ${({isTotal})=>{
    const corTotal = isTotal ? "linear-gradient(0deg, rgba(255,255,225,255) 0%, rgba(255,255,250,1) 1%, rgba(0,212,255,1) 100%)" : "linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(150,150,250,1) 1%, rgba(0,212,255,1) 100%)";
        return`
            background: ${corTotal};
        `
        }
    }


    h3{
        font-size: 21px;
        font-weight: 400;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    p{
        font-size: 25px;
    }

`
export const Balanco = ({data}:any)=>{
    const {entradas, saidas, total} = useData(data)
    
    return(
        <Balance>
            <h1>Transações</h1>
            <Card>
            <h3>
                <span>
                    Entradas
                </span>
                <Plus/>
            </h3>
            <p>{entradas}</p>
            </Card>
            <Card>
            <h3>
                <span>
                    Saidas
                </span>
                <IconMinus/>
            </h3>
            <p>{saidas}</p>
            </Card>
            <Card isTotal>
            <h3>
                <span>
                    Total
                </span>
                <IconTotal/>
            </h3>
            <p>{total}</p>
            </Card>
        </Balance>
    )
}