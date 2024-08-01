import { useState, useCallback,useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numbers, setNumbers] = useState(false)
  const [character, setCharacter]  = useState(false)
  const [password, setPassword] = useState("")
  const [isClicked, setIsClicked] = useState(false);

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numbers) str += "0123456789"
    if (character) str += "!@#$%^&*(){}<>/|_+-;:'"

    for (let i = 1; i <= length; i++){
      let chr = Math.floor(Math.random() * str.length+1)

      pass += str.charAt(chr)
    }



    setPassword(pass)

  }, [length, numbers, character, setPassword ])

  useEffect(() => {
    passwordGenerator()
  },[length,numbers,character,passwordGenerator])
  
  const copytoclip = useCallback(() => {
    window.navigator.clipboard.writeText(password)
    setIsClicked(true);

    // Optionally, reset the button color after a timeout
    setTimeout(() => setIsClicked(false), 200);
  },[password])

  return (
    <>
    
    <div className='w-full max-w-md mx-auto shadow-md
    rounded-xl px-6 py-8 my-10 text-orange-600 bg-gray-800'>
      <h1 className='text-2xl font-bold mb-4'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        
        <input type="text" value={password}
        className='outline-none w-full py-2 px-5'
        placeholder='Your Password'
        readOnly
        ref={passwordRef}
        />

        <button className={`outline-none px-5 py-.5 shrink-0 text-white ${
        isClicked ? 'bg-green-700' : 'bg-blue-700'
      }`}
        onClick={copytoclip}>copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex item-center gap-x-1'>
          <input type="range"
          min={6}
          max={100}
          value={length}
          className="cursor-pointer"
          onChange={() => {setLength(event.target.value)}}
          />
          <label className='text-yellow-400 gap-x-1'> Length: {length} </label>

          <input type='checkbox'
          defaultChecked={numbers}
          id='num'
          onChange={() => setNumbers((prev) => !prev)}/>
          <label className='text-yellow-400 gap-x-1'>Numbers</label>

          <input type='checkbox'
          defaultChecked={character}
          id='char'
          onChange={() => setCharacter((prev) => !prev)}/>
          <label className='text-yellow-400 gap-x-1'>Characters</label>


        </div>
      </div>
    </div>

    </>
  )
}

export default App
