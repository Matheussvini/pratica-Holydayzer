import express from 'express'
import cors from 'cors'
import { holidays } from './contants.js';

const app = express();
app.use(cors());

app.get('/holidays', (req, res) => {
    res.send(holidays)
})

let hoje = new Date();
hoje = hoje.toLocaleDateString("en-us"); // 1/1/2022

app.get('/is-today-holiday', (req, res) => {
    const date = holidays.find((e) => e.date === hoje)
    if(date === undefined){
        res.send("Não, hoje não é feriado")
    } else{
        res.send(`Sim, hoje é ${date.name}`)
    }
})

app.get('/holidays/:mes', (req, res) => {
    const mes = req.params.mes;
    if(mes <1 || mes > 12){
        return res.send("Por favor insira um número de 1 a 12 referente ao mês.")
    }
    const feriadosMes = holidays.filter((e) => e.date.split('/')[0] === mes);
    if(feriadosMes.length === 0){
        return res.send("Não há feriados este mês.")
    }
    res.send(feriadosMes)
})

const abc = "12/3/2022"
const numbers = abc.split("/")[0]

const port = 5000;
app.listen(port, ()=> console.log(`Server running in port ${port}`));