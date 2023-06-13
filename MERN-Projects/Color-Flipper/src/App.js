import React, { useState } from 'react'
import './App.css'
function App() {
  const [color, setColor] = useState("red")
  const [inputValue, setInputValue] = useState("Type a status...")

  // const [style,setStyle]
  const colorArray = ['#e5e5e5', '#a2d2ff', "#bde0fe", "#ffafcc", '#ffc8dd', '#cdb4db', '#d4a373', "#faedcd", "#fefae0", '#e9edc9', '#ccd5ae', '#2a9d8f', "#2a9d8f", "#e9c46a", '#f4a261', '#e76f51']
  const handleClick = () => {
    let seq = Math.trunc(Math.random() * 16)
    setColor(colorArray[seq])
  }
  let style = {
    height: '100%',
    width:"100%",
    backgroundColor:color,
  }
  let button = {
    position:"absolute",
    right:"50px",
    bottom:"50px",
    color:"white",
    fontSize:"30px",
    cursor:"pointer"
  }
  const handleFocus = (e) =>{
    setInputValue("")
  }
  const handleBlur = (e) => {
    if(e.target.value === ""){
      console.log()
      setInputValue("Type a status...")
    }
  }
  const handleChange = (e) => {
    setInputValue(e.target.value)
  }
  return (
    <div style={style}>
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center min-vh-100 ">
          <input type="text"  className='status w-100' style={{backgroundColor:color}} value={inputValue} onFocus={(e)=>{handleFocus(e)}} onBlur={(e)=>{handleBlur(e)}} onChange={(e)=>{handleChange(e)}} autofocus/>
          </div>
        </div>
      </div>
            
      <div onClick={handleClick} style={button}><i class="fa-solid fa-palette"></i></div>
    </div>
  );
}

export default App;
