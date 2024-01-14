import { useState } from 'react'
import PropTypes from 'prop-types'

function Education({setSchoolInput}) {

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
    setSchoolInput(prevInput => prevInput.filter(item => item.id !== itemId))

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

      setSchoolInput(prevInput=> [
        ...prevInput,
        {
          id:nextId,
          school:'',
        }
      ])
      
    }

    function handleChange(e , ItemId){
       setSchoolInput(schoolInput => schoolInput.map((item) => {
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

    
  Education.propTypes = {
    deleteItem:PropTypes.func.isRequired,
    setSchoolInput:PropTypes.func.isRequired

  }
  return (
     <>
      <div className="personal__data">
      <div className="titles">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
  <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
  <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
</svg>

            <p className="individual__title">Education</p >
          </div>
      {items.map(item =>{
        return(

      item.cardVisible ? <div className="individual__data" key={item.id}>
        <div className="info__title">
        <h3>School/College</h3>
          { item.visible ? <button onClick={() => deleteItem(item.id)}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</button> : null}
        </div>
            <input name = 'degree' type="text" placeholder="Branch" onChange={(e) => handleChange(e, item.id)}/>
            <input name = 'startYear' type="number" placeholder="Start Year" onChange={(e) => handleChange(e, item.id)}/>
            <input name = 'endYear' type="number" placeholder="End Year" onChange={(e) => handleChange(e, item.id)}/>
        </div>
      : null
      
        )
      })}     

      <button onClick={addItem}>+ New</button>
      </div>
     </>
    )
  }

  
  export default Education