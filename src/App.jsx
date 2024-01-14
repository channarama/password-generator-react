import './App.css';
import { useState, useCallback, useEffect } from 'react';

function App() {
  const [number, setnumber] = useState(false);
  const [char, setchar] = useState(false);
  const [length, setlength] = useState(8);
  const [pass, setpassword] = useState("");
  const [copy, setcopy] = useState("copy");

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (char) str += "!@#$^&*";
    for (let i = 0; i < length; i++) {
      pass += str[Math.floor(Math.random() * str.length)];
    }
    setpassword(pass);
  }, [number, char, length]);

  useEffect(() => {
    passwordgenerator();
  }, [length, char, number]);

  function clicked() {
    window.navigator.clipboard.writeText(pass);
    setcopy("copied!");
    setTimeout(() => {
      setcopy("copy");
    }, 5000);
  }

  return (
    <div className="container">
    
      <div className="contents">
        <div className='inp'>
          <input type="text" placeholder="Generated Password" value={pass} readOnly />
          <button className="bt" onClick={clicked}>
            {copy}
          </button>
        </div>
        <div>
          <label htmlFor="length">Password Length: {length}</label>
          <input
            type="range"
            min="8"
            max="20"
            value={length}
            className="slider"
            onChange={(e) => setlength(e.target.value)}
            id="length"
          />

          <div className="checkbox-container">
            <label htmlFor="c1">Include Numbers:</label>
            <input
              type="checkbox"
              name="c1"
              checked={number}
              onChange={() => setnumber((prev) => !prev)}
            />

            <label htmlFor="c2">Include Characters:</label>
            <input
              type="checkbox"
              name="c2"
              checked={char}
              onChange={() => setchar((prev) => !prev)}
            />
          </div>
          <button onClick={passwordgenerator}>Generate Password</button>
        </div>
      </div>
    </div>
  );
}

export default App;
