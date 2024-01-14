import { useState } from 'react'
import PropTypes from 'prop-types'

function Work({setExpInput}) {

  const initialItems = [{
    id:0,
    visible:true,
    cardVisible:true,

  }]
  let [items , setItems] = useState(initialItems)
  let [nextId , setNextId] = useState(1)
  function deleteItem(itemId){
    setItems(
      items.filter(item => item.id !== itemId)
    )
    setExpInput(prevInput => prevInput.filter(item => item.id !== itemId))

    }
    function addItem(){
      setNextId(nextId => nextId + 1)
      setItems([
        ...items,
        {
          id:nextId,
          visible:true,
          cardVisible:true,
        }
      ])

      setExpInput(prevInput=> [
        ...prevInput,
        {
          id:nextId,
          school:'',
        }
      ])
      
    }

    function handleChange(e , ItemId){
       setExpInput(schoolInput => schoolInput.map((item) => {
        if(item.id === ItemId){
          return{
            ...item,
            [e.target.name]:e.target.value,
          }
        }else{
          return item
        }
       }))
    }

    
  Work.propTypes = {
    deleteItem:PropTypes.func.isRequired,
    setExpInput:PropTypes.func.isRequired

  }
  return (
     <>
      <div className="personal__data">
      <div className="titles">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M7.5 5.25a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0 1 12 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 0 1 7.5 5.455V5.25Zm7.5 0v.09a49.488 49.488 0 0 0-6 0v-.09a1.5 1.5 0 0 1 1.5-1.5h3a1.5 1.5 0 0 1 1.5 1.5Zm-3 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
  <path d="M3 18.4v-2.796a4.3 4.3 0 0 0 .713.31A26.226 26.226 0 0 0 12 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 0 1-6.477-.427C4.047 21.128 3 19.852 3 18.4Z" />
</svg>
            <p className="individual__title">Work Experience</p >
          </div>
                {items.map(item =>{
        return(

      item.cardVisible ? <div className="individual__data" key={item.id}>
        <div className="info__title">
        <h3>Experience</h3>
          { item.visible ? <button onClick={() => deleteItem(item.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button> : null}
        </div>
            <input name = 'position' type="text" placeholder="Position" onChange={(e) => handleChange(e, item.id)}/>
            <input name = 'company' type="text" placeholder="Company" onChange={(e) => handleChange(e, item.id)}/>
            <input name = 'startDate' type="number" placeholder="Start Date" onChange={(e) => handleChange(e, item.id)}/>
            <input name = 'endDate' type="number" placeholder="End Date" onChange={(e) => handleChange(e, item.id)}/>
        </div>
      : null
      
        )
      })}     

      <button onClick={addItem}>+ New</button>
      </div>
     </>
    )
  }

  
  export default Work