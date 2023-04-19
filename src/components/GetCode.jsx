import React from 'react';
import { useState, useEffect } from 'react';

export default function GetCodeOutput(props){
  const URL = 'http://127.0.0.1:8000'

  const [resposta,   setResposta   ] = useState('___'); //Retorno da execução
  const [status, setStatus] = useState('0');

  const head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  useEffect (()=>{
    setStatus('Loading');
    fetch(URL+'/submissions/'+props.token, {headers: head})
    .then(response => response.json())
    .then((x) => setResposta(x.codeOutput))
    .then(() => setStatus('Complete'))
    .catch(setStatus('Error'));

    console.log(resposta)
    
  },[]);

 
  return(
    <>
    {status === '0' && <p>ne</p>}
    {status === 'Loading' && <p>loading</p>}
    {status === 'Complete' && <p>{resposta}</p>}
    </>
  )
}

export function GetCodeStatus(props){
  return(
    <>
    <p>{props.token}</p>
    </>
  )
}