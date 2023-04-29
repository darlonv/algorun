import React, {useState, useRef, useEffect} from 'react';
import Codigo from './Codigo';
import Submit from './Submit';
import Language from './Language';
import Output from './Output'

// https://www.npmjs.com/package/@ramonak/react-progress-bar
import ProgressBar from '@ramonak/react-progress-bar';
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";

export default function Problema(props){

  let defaultLanguage = 'python'
  const URL = 'http://127.0.0.1:8000';

  //Resultado default
  let retornoDefault = {
    testes: props.testes,
    porcentCorretos: 0
  }

  //Codigos default
  let codigosDefault = {
    'python': `def main():
    #código aqui
    print('Hello World!')

if __name__ == '__main__':
    main()
`,
    'java'  : `import java.util.Scanner;

public class Main{
  public static void main(String[] args){
    Scanner input = new Scanner(System.in);
    System.out.println("Hello World!");

    input.close();
  }
}
`
  }

  const [linguagem, setLinguagem ] = useState(defaultLanguage); //Linguagem escolhida
  const [retorno,   setRetorno   ] = useState(retornoDefault); //Retorno da execução
  const [porcentCorretos,   setPorcentCorretos   ] = useState(0); //Porcentagem de valores corretos
  const [submetido,   setSubmetido   ] = useState(false); //Código submetido para execução
  const [submissao,   setSubmissao   ] = useState(0); //Contagem de submissoes


  const [codigoPython, setCodigoPython] = useState(codigosDefault['python']);
  const [codigoJava,   setCodigoJava]   = useState(codigosDefault['java']);

  let __codigoLinguagem = codigosDefault[defaultLanguage];
  let __setCodigoLinguagem = null

  //Seta as funções para update dos codigos de cada linguagem
  function codeLanguage(_language){
    if(_language == 'python'){
      __codigoLinguagem = codigoPython
      __setCodigoLinguagem = setCodigoPython
    }else{
      __codigoLinguagem = codigoJava
      __setCodigoLinguagem = setCodigoJava
    }
  }

  return(
    <>
    {/* <p>Problema aqui. id: {props.id}</p> */}
    <p></p>
    <Table title="Exemplos" rows={props.testes} url={URL} showOutputs={props.showOutputs}/>
    <Language default={linguagem} linguagemRef={setLinguagem}/>
    {codeLanguage(linguagem)}
    <br/>
    <Codigo linguagem={linguagem} codigo={__codigoLinguagem} setCodigo={__setCodigoLinguagem} />
    <Submit codigo={__codigoLinguagem} testes={props.testes} retornoRef={setRetorno} submetidoRef={setSubmetido} submissao={submissao} submissaoRef={setSubmissao} language={linguagem} url={URL}/>
    {submetido && <Output rows={retorno.testes} url={URL} submissao={submissao}/> }
    {/* <ProgressBar completed={retorno.porcentCorretos}/> */}
    
    
    {/* <p>codigo: {codigo[linguagem]}</p>
    
    <Codigo id={props.id} linguagem={linguagem} codigosRef={setCodigos} codigos={codigos}/>
    
    
    
    <p>Linguagem: {linguagem}</p>
     */}
    </>
  )
}

function Table(props){
  return(
    <>
    <p>{props.title}</p>
    <table>
      <thead>
      <tr>
        <td>Entrada</td>
        <td>Saída esperada</td>
        {/* <td>Code output</td> */}
      </tr>
      </thead>
      <tbody>
      {props.rows.slice(0,props.showOutputs).map( row => (
        <tr key={row.key}>
          <td>{row.input}</td>
          <td>{row.expected_output}</td>
          {/* <td>{row.codeOutput}</td> */}
          {/* <td>{<GetCodeOutput token={row.token} url={props.url}/>}</td> */}
        </tr>
      ))}
      </tbody>
    </table>
    </>
  )
}

function useContent(value){
  const contentRef = useRef();
  useEffect(() => {
    contentRef.current = value;
  }, [value]);

  return contentRef.current;
}

