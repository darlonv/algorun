import React from 'react';
import GetCodeOutput from './GetCodeOutput';

export default function Output(props) {
  return (
    <>
    <TableOutput rows={props.rows} url={props.url} submissao={props.submissao}/>
    </>
  );
}

function TableOutput(props){
  
    return(
    <>
    <p>{props.title}</p>
    <table>
      <thead>
      <tr>
        <td>Entrada</td>
        <td>Saída esperada</td>
        <td>Saída</td>
        <td>Status</td>
      </tr>
      </thead>
      <tbody>
        {props.rows.map( row => (
          <tr key={row.key}>
            <td>{row.input}</td>
            <td>{row.expected_output}</td>
            {<GetCodeOutput token={row.token} url={props.url} submissao={props.submissao}/>}
            {/* <td>{row.token}</td> */}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}