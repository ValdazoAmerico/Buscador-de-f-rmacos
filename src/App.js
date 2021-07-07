import logo from './pharma.gif';
import './App.css'; 
import React, { useState, useEffect } from 'react';
import axios from 'axios'
function App() {
  const [currentMed, setCurrentMed] = useState([])
  const [display, setDisplay] = useState(false)
  const [options, setOptions] = useState([])
  const [search, setSearch] = useState("")

  const searchFunction = (e) => {
    axios.post('/sub', {"user1":e.target.value}, { 'Content-type': 'application/json' }).then(res => setCurrentMed(res.data))
    .catch(error => console.log(error))
    setSearch(e.target.value)
  }

  const setPokeDex = poke => {
    setSearch(poke);
    setDisplay(false);

  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} style={{width:"50%", margin:"10px", borderRadius:"50%"}}  alt="logo" />
        <h1>Vademecum</h1>
        <p>
          Buscador de fármacos
        </p>
        <input style={{width:"85%"}} id="auto" onClick={() => setDisplay(!display)} placeholder="Escriba el nombre de un fármaco" type="text" onChange={searchFunction} value={search} />
        {display && (
          <div style={{backgroundColor:"white", width:"70%"}} className="autoContainer">
             {currentMed.filter((name) => name.indexOf(search.toLowerCase())).map((v,i) => {
              return <div onClick={() => setPokeDex(v)} className="option" key={i}>
                <span style={{fontSize:'14px', color:"black"}}>{v}</span>
              </div>
            })}
          </div>
        )}
       
       
        {/* {currentMed.map(c => {
          return <p style={{fontSize:'12px', margin:'2px'}}>{c}</p>
        })} */}
      </header>
    </div>
  );
}

export default App;
