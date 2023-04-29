import React from 'react';
import { useEffect } from 'react';

export default function Submit(props) {

  const submit = async () => {

    try {

      const body = {
        'source_code': props.codigo, 
        'language':props.language,
        'testes': props.testes,
      }

      const head = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      const response = await fetch(props.url+'/submissions', {
        method: 'POST',
        headers: head,
        body: JSON.stringify(body)
      });

      const result = await response.json()
      .then( (x) => {
        props.retornoRef(x);
      });



    } catch (err){
      console.log(err)
    }
   
    props.submetidoRef(true);
    props.submissaoRef(props.submissao +1);
  }

  return (
    <>
    <button onClick={submit}>Submit</button>
    </>
  );
}

