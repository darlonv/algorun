import React, {useState, useRef} from 'react';
//npm install @monaco-editor/react
import { Editor } from '@monaco-editor/react';


export default function Codigo(props) {

  return(
  <>
  {/* <Editor height="100vh" language="javascript" value="console.log('hello')"/> */}
  <Editor 
    height="20vh" 
    language={props.linguagem} 
    value={props.codigo}
    onChange={props.setCodigo}
    options={
      {
        minimap: {
            enabled:false
        }
      }
    }
  />
  </>
  );
}

