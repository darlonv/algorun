import React, {useState, useRef} from 'react';
import { useEffect } from 'react';
//npm i --save react-select //https://react-select.com/home
import Select from 'react-select';

export default function Language(props) {

  // const [optionsState, setOptionsState] = useState(0);

  function setLinguagem(linguagem){
    props.linguagemRef(linguagem.value)
  }

  const options = [
    {value: 'python', 'label': 'Python'},
    {value: 'java',   'label': 'Java'}
  ]

  return (
    <>
      <Select options={options} 
        isMulti={false}
        // onSelect={(choice) => setOptionsState(choice)}
        defaultValue={options[0]}
        onChange={setLinguagem}
        />
    </>
  );
}

