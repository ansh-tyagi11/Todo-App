import { useRef, useState, useEffect } from 'react'
import Navbar from './components/Navbar'

function App() {

  const [todo, setTodo] = useState('')
  const [second, setSecond] = useState([])
  const [third, setThird] = useState(false)
  const focus = useRef(null)

  useEffect(() => {
    focus.current.focus()
  }, [todo])


  const saveToLS = (params) => {
    localStorage.setItem("second", JSON.stringify(second))
  }

  useEffect(() => {
    let getItem = localStorage.setItem("setSecond", second)
    if (getItem) {
      let second = Json.parse(localStorage.getItem("second"))
      setSecond(second)
    }
  }, [])

  const handelClick2 = () => {
    setSecond([...second, todo])
    setTodo("")
    saveToLS()
  }

  const deleteEvent = (e, index) => {
    let t = second.filter(i => i.index === index)
    setTodo(t[0].todo)
    let newSecond = second.filter(item => {
      return item.index !== index
    });
    setSecond(newSecond)
    saveToLS()
  }

  const editEvent = (e, index) => {
    let edit = second.filter(item => {
      deleteEvent()
      return item.index === index
    })
    setTodo(edit)
  }

  return (
    <>
      <Navbar />
      <div className='bg-gray-100 flex justify-center min-h-[75vh] mx-auto pb-3'>
        <div className="container bg-white w-[600px] rounded-3xl h-auto shadow py-3.5 px-3.5">

          <div className='button flex justify-between items-center'>
            <input onChange={(e) => setTodo(e.target.value)} value={todo} ref={focus} className='border border-gray-300 rounded-[8px] w-[460px] h-[40px] text-[16px] px-1' type="text" name='text' placeholder='Add a new task...' />
            <button onClick={handelClick2} className='w-[80px] h-[40px] bg-blue-500 rounded-xl text-white text-bold'>Add</button>
          </div>
          <h2 className='font-bold mt-[25px]'>My Todo's</h2>
          <div className='flex items-center'>
            <input type="checkbox" name="show" id="show" />
            <label htmlFor="show" className='ml-1'>Finshed Todos</label>
          </div>

          <div>
            <input type="checkbox" name="show" id="shownot" />
            <label htmlFor="show"></label>
          </div>

          {
            second.map((item, index) => {
              return (
                <div key={index}>
                  <div className='flex gap-2 items-center'>
                    <label htmlFor="show"></label>
                    <input type="checkbox" name="show" id="shownot" />
                    <div>{item}</div>
                    <button className='border button bg-gray-200 font-bold p-2 rounded-[10px]' onClick={(e) => editEvent(e, item.index)}>Edit</button>
                    <button className='border button bg-gray-200 font-bold p-2 rounded-[10px]' onClick={(e) => deleteEvent(e, item.index)}>deleteEvent</button>
                  </div>
                </div>
              )
            })
          }

        </div >
      </div>
    </>
  )
}

export default App
