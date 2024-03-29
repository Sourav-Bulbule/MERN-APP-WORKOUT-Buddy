import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"

const WorkoutForm = ()=>{

  const {dispatch} = useWorkoutsContext()
  
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyField, setEmptyField] = useState([])

  const handelSubmit = async (e)=>{
    e.preventDefault()

    const workout = {title,load,reps}

    const response = await fetch('/api/workouts',{
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok){
       setError(json.error)
       setEmptyField(json.emptyField)
    }else{
      setTitle('')
      setLoad('')
      setReps('')
      setError(null)
      setEmptyField([])
      console.log('new workout added', json)
      dispatch({type:'CREATE_WORKOUT', payload:json})
    }

  }

  return(
      <form className="create" onSubmit={handelSubmit}>
        <h3>Add a New Workout</h3>
        <label >Excersise Title:</label>
        <input 
        type="text"
        onChange={(e)=>setTitle(e.target.value)}
        value={title}
        className={emptyField.includes('title') ? 'error' : ''}
        />
        <label >Load in Kg:</label>
        <input 
        type="number"
        onChange={(e)=>setLoad(e.target.value)}
        value={load}
        className={emptyField.includes('load') ? 'error' : ''}
        />
        <label >Reps:</label>
        <input 
        type="number"
        onChange={(e)=>setReps(e.target.value)}
        value={reps}
        className={emptyField.includes('reps') ? 'error' : ''}
        />
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
      </form>
  )
}

export default WorkoutForm