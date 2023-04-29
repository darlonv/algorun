import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';

export default function Counter(props) {
  const [contador, setContador] = useState(0);
  const [mostrar, setMostrar] = useState(false);
  const [resultado, setResultado] = useState('')
  const [status, setStatus] = useState('x');

    
  useEffect(() => {
    async function fetchData() {
      const sleep = s => new Promise(
        resolve => setTimeout(resolve, s*1000)
      );

      let i=0;
      let continuar = true;
      while(continuar){
        //obtém os dados
        fetch('http://10.112.35.67:2358/submissions/'+props.token)
        //processa resposta
        .then( async response => {
          const data = await response.json();
          setStatus(data['status']['description']);
          console.log(data);
          switch(data['status']['id']){
            case 1: //In Queue
              break;
            case 2: //Processing
              break;
            case 3: //Accepted
              setResultado(data['stdout'])
              setMostrar(true);
              continuar = false;
              break;
            default:
              setMostrar(true);
              continuar = false;
          }
          
          
          })
        //processa erros
        .catch( error => {
          setMostrar(true);
          setStatus("Erro");
          setResultado("error");
          console.error("Erro no request");
          continuar = false;
        });
        

        if(i==5){
          setMostrar(true);
          // setResultado('ok');
          continuar=false;
        }else
          await sleep(1);
          i++;
      }

      console.log('end');
    }
  
    fetchData();
  }, []);

  return (
    <>
    Hello from Counter.<br/>
    {!mostrar && <ClipLoader/>}
    {!mostrar && status}
    {mostrar && <Show resultado={resultado}/>}
    <br/>
    

    </>
  );
}

function Show(props){
  return(
    <>
    Resultado aqui: {props.resultado}
    </>
  )
}