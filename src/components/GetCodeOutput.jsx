import React from 'react';
import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

export default function GetCodeOutput(props){

  function parar(saida, mensagem){
    setResultado(saida)
    setDescricao(mensagem);
    setMostrar(true);
    return false
  }

  // console.log(props);

  const [init, setInit] = useState(false)
  const [resultado,   setResultado   ] = useState('___'); //Retorno da execução
  const [descricao,   setDescricao   ] = useState(''); //Retorno da execução
  const [mostrar, setMostrar] = useState(false);
  const [showSpinner, setShowSpinner] = useState(true);



  const head = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  useEffect (()=>{
    const fetchData = async () => {
      setShowSpinner(true);
      setResultado('');

      const sleep = s => new Promise(
        resolve => setTimeout(resolve, s*1000)
      );

      let continuar = true;
      let i=0;
      let max_i = 100;
      
      while(continuar){
        //obtém os dados
        const fetchUrl = props.url+'/submissions/'+props.token;
        // console.log(fetchUrl)
        fetch(fetchUrl)
        //processa resposta
        .then( async response => {
          const data = await response.json();

          let data_json = JSON.parse(data)

          let status_code = data_json['status']['id']
          let saida = data_json['stdout']
          let mensagem = data_json['status']['description']

          switch(status_code){
            case 1: //In Queue
              setDescricao(mensagem);
              break;
            case 2: //Processing
              setDescricao(mensagem);
              break;
            case 3: //Accepted
              continuar = parar(saida,mensagem);
              break;
            case 4: //wrong answer
            continuar = parar(saida,mensagem);
              break;
            case 5: //Time Limit Exceeded
            continuar = parar(saida,mensagem);
              break;
            case 6: //Compilation error
              continuar = parar(saida,mensagem);
              break;
            case 7: //Runtime Error (SIGSEGV)
              continuar = parar(saida,mensagem);
              break;
              case 8: //Runtime Error (SIGXFSZ)
              continuar = parar(saida,mensagem);
              break;
            case 9: //Runtime Error (SIGFPE)
              continuar = parar(saida,mensagem);
              break;
            case 10: //Runtime Error (SIGABRT)
              continuar = parar(saida,mensagem);
              break;
            case 11: //Runtime Error (NZEC)
              continuar = parar(saida,mensagem);
              break;
            case 12: //Runtime Error (Other)
              continuar = parar(saida,mensagem);
              break;
            case 13: //Internal Error
              continuar = parar(saida,mensagem);
              break;
            case 14: //Exec Format Error
              continuar = parar(saida,mensagem);
              break;
            default:
              setDescricao("Código de retorno inválido");
              setMostrar(true);
              continuar = false;
          }
          
          
          })
        //processa erros
        .catch( error => {
          // setMostrar(true);
          // setResultado("error");
          console.error("Request error");
          // continuar = false;
        });
        

        if(i==max_i){
          setMostrar(true);
          setResultado('Espera maxima atingida');
          continuar=false;
          setShowSpinner(false);
        }

        await sleep(1);
        i++;
      }
      setShowSpinner(false);

    // console.log('useEffect on GetCode 2');  

  }
  fetchData();
  // console.log('useEffect on GetCode 3');
  },[props.submissao]);

 
  return(
    <>
    <td>
    {/* {props.token} */}
    {showSpinner && <ClipLoader/>}
    {!showSpinner && resultado}
    </td>
    <td>
    {descricao}
    </td>
    </>
  )
}
