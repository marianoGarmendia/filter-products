import Board from './components/Board'

import {  useState } from 'react'

import './App.css'
import { FormEvent } from 'react'



function App() {
  const [headers , setHeaders] = useState<string[]>([])
  const [ mostrar , setMostrar] = useState(false)
  
  const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
       setMostrar(true)
  }

  // console.log(iron);
  // const ironArray = iron as ArrayInterno
  
  

  return (
    <div className='flex flex-col  items-center h-screen w-fit mx-auto'>
      <h1 className='text-6xl my-4 text-slate-950 text-center'>Filter Products</h1>
    <div className='p-4 flex flex-col  justify-center items-center  gap-4 shadow-lg rounded-md w-full :w-2/3 mx-auto  bg-slate-400'>
      <form  
      className="my-4  p-4 w-2/5 flex flex-col justify-center items-center gap-4 "
      onSubmit={handleSubmit}
      >
      
      <Board  setHeaders={setHeaders} headers={headers} mostrar={mostrar} setMostrar={setMostrar}></Board>
        
      </form>
      
    </div>
    </div>
  )
}

export default App
