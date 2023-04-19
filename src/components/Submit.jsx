import React from 'react';
import { useEffect } from 'react';

export default function Submit(props) {
  const URL = 'http://127.0.0.1:8000'

  const submit = async () => {
    console.log("submit init");

    try {

      const body = {
        'source_code': props.codigo, 
        'language':'python',
        'testes': props.testes,
      }

      const head = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }

      // console.log(body)

      const response = await fetch(URL+'/submissions', {
        method: 'POST',
        headers: head,
        body: JSON.stringify(body)
        // body: body
      });

      console.log(body);
      console.log("submit waiting");

      const result = await response.json()
      .then( (x) => {
        props.retornoRef(x);
        console.log(x)
      });



    } catch (err){
      console.log(err)
    }

    console.log("submit end");
    
  }

  return (
    <>
    <button onClick={submit}>Submit</button>
    </>
  );
}

