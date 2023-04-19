import React, {useState, useRef, useEffect} from 'react';
import Codigo from './Codigo';
import Submit from './Submit';
import Language from './Language';
import GetCodeOutput, {GetCodeStatus} from './GetCode'

// https://www.npmjs.com/package/@ramonak/react-progress-bar
import ProgressBar from '@ramonak/react-progress-bar';
import AceEditor from "react-ace"

import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-python";

export default function Problema(props){

  let defaultLanguage = 'python'

  //Resultado default
  let retornoDefault = {
    testes: props.testes,
    porcentCorretos: 0
  }

  //Codigos default
  let codigosDefault = {
    'python': `def main():
    #código aqui
    print('Hello world')

if __name__ == '__main__':
    main()
`,
    'java'  : `import java.util.scanner;

class Main{
  public static void main(String[] args){
    System.out.println("Hello World");
  }
}
`
  }

  const [linguagem, setLinguagem ] = useState(defaultLanguage); //Linguagem escolhida
  const [retorno,   setRetorno   ] = useState(retornoDefault); //Retorno da execução
  const [porcentCorretos,   setPorcentCorretos   ] = useState(0); //Porcentagem de valores corretos

  const [codigoPython, setCodigoPython] = useState(codigosDefault['python']);
  const [codigoJava,   setCodigoJava]   = useState(codigosDefault['java']);

  let __codigoLinguagem = codigosDefault[defaultLanguage];
  let __setCodigoLinguagem = null

  //Seta as funções para update dos codigos de cada linguagem
  function codeLanguage(_language){
    if(_language == 'python'){
      __codigoLinguagem = codigoPython
      __setCodigoLinguagem = setCodigoPython
      console.log('python selected')
    }else{
      __codigoLinguagem = codigoJava
      __setCodigoLinguagem = setCodigoJava
      console.log('java selected')
    }
  }

  return(
    <>
    {/* <p>Problema aqui. id: {props.id}</p> */}
    <Language default={linguagem} linguagemRef={setLinguagem}/>
    <p></p>
    {codeLanguage(linguagem)}
    <Codigo linguagem={linguagem} codigo={__codigoLinguagem} setCodigo={__setCodigoLinguagem} />
    <Submit codigo={__codigoLinguagem} testes={props.testes} retornoRef={setRetorno} linguagem={linguagem}/>
    <Table title="Resultados" rows={retorno.testes}/> 
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
        <td>Input</td>
        <td>Expected Output</td>
        <td>Code output</td>
        <td>Status</td>
      </tr>
      </thead>
      <tbody>
      {props.rows.map( row => (
        <tr key={row.key}>
          <td>{row.input}</td>
          <td>{row.expected_output}</td>
          {/* <td>{row.codeOutput}</td> */}
          <td><GetCodeOutput token={row.token}/></td>
          {/* <td>{row.status}</td> */}
          <td><GetCodeStatus token={row.token}/></td>
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

