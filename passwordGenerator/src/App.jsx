import { useState, useCallback, useEffect, useRef} from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numAllow, setnumAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false);
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numAllow) str += "0123456789"

    if(charAllow) str += "!@#$%^&*{}[]~`+=-"

    for(let i=1; i<=length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [length, numAllow, charAllow])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,101);
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllow, charAllow, passwordGenerator])

  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 py-3 text-orange-500 bg-gray-600'>
        <h1 className='text-white text-center my-3'>Password Generator</h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3' 
              placeholder='password'
              readOnly
              ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          >Copy</button>

        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={100} value={length} className='cursor-pointer' 
            onChange={(e) => {setlength(e.target.value)}}
            ></input>
            <label>Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-1'>
            <input
            type="checkbox"
            defaultChecked={numAllow}
            id="numInput"
            onChange={() => {
              setnumAllow((prev) => !prev);  //changes value of numAllow 
            }}
            />
            <label>Numbers</label>
            </div>

            <div className='flex items-center gap-x-1'>
              <input
              type="checkbox"
              defaultChecked={charAllow}
              id="charInput"
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
              />
              <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
