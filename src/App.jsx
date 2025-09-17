import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [third, setThird] = useState(false)
  const focus = useRef(null)

  useEffect(() => {
    focus.current.focus()
  }, [todo])


  const saveToLS = () => {
    localStorage.setItem("setTodos", JSON.stringify(todos))
  }

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }, [])

  const add = () => {
    setTodos([...todos, { id: uuidv4(), todo }])
    setTodo("")
    saveToLS()
  }

  const deleteEvent = (_, id) => {
    let newtodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newtodos)
  }

  const editEvent = (_, id) => {
    let edit = todos.filter(item => {
      return item.id === id
    })
    deleteEvent(edit, id)
    setTodo(edit[0].todo)
    saveToLS()
  }

  return (
    <>
      <Navbar />
      <div className='bg-gray-100 flex justify-center min-h-[75vh] mx-auto pb-3'>
        <div className="container bg-white w-[600px] rounded-3xl h-auto shadow py-3.5 px-3.5">

          <div className='button flex justify-between items-center'>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} ref={focus} className='border border-gray-300 rounded-[8px] w-[460px] h-[40px] text-[16px] px-1' type="text" name='text' placeholder='Add a new task...' />
            <button onClick={add} className='w-[80px] h-[40px] bg-blue-500 rounded-xl text-white text-bold'>Add</button>
          </div>
          <h2 className='font-bold mt-[25px]'>My Todo's</h2>

          {
            todos.length === 0 ? (<div className='text-center text-gray-400 mt-5'>No Tasks</div>) :
              todos.map((item, id) => {
                return (
                  <div key={id}>
                    <div className='flex items-center'>
                      <input type="checkbox" name="show" id="show" />
                      <label htmlFor="show" className='ml-1'>Finshed Todos</label>
                    </div>

                    <div>
                      <input type="checkbox" name="show" id="shownot" />
                      <label htmlFor="show"></label>
                    </div>

                    <div className='flex items-center'>
                      <div>
                        <label htmlFor="show"></label>
                        <input type="checkbox" name="show" id="shownot" />
                      </div>

                      <div className='flex justify-between items-center w-full'>

                        <div>{item.todo}</div>

                        <div className='flex gap-2 mt-2'>
                          <button className='border button bg-gray-200 font-bold p-2 rounded-[10px]' onClick={(e) => editEvent(e, item.id)}><FaEdit /></button>
                          <button className='border button bg-gray-200 font-bold p-2 rounded-[10px]' onClick={(e) => deleteEvent(e, item.id)}><AiFillDelete /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
          }
        </div >
      </div>
      <Footer />
    </>
  )
}

export default App
