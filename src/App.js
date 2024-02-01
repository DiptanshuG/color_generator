import React, { useState } from 'react'
import SingleColor from './SingleColor'
import Connect from './Connect'

import Values from 'values.js'

function App() {
  const [color, setColor] = useState('')
  const [error, setError] = useState(false)
  const [list, setList] = useState(new Values('#f15025').all(10))
  const [login, setLogin] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      let colors = new Values(color).all(10)
      setList(colors)
    } catch (error) {
      setError(true)
      console.log(error)
    }
  }

  return (
    <>
      {!login ? (
        <Connect login={login} setLogin={setLogin} />
      ) : (
        <div>
          <section className='container'>
            <h3>color generator</h3>
            <form onSubmit={handleSubmit}>
              <input
                type='text'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder='#f15025'
                className={`${error ? 'error' : null}`}
              />
              <button className='btn' type='submit'>
                submit
              </button>
            </form>
          </section>
          <section className='colors'>
            {list.map((color, index) => (
              <SingleColor
                key={index}
                {...color}
                index={index}
                hexColor={color.hex}
              />
            ))}


          </section>
          <button className='btn' type='submit'
          onClick={()=>{
            setLogin(false);
          }}
          >
            LogOut
          </button>
        </div>
      )}
    </>
  )
}

export default App

