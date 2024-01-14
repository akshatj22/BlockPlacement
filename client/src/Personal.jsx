function Personal({setFirstName , setEnrollment}) {

    const handleFirstNameChange = (e) => {
      setFirstName(e.target.value)
    }
  
    const enrollmentNumberChange = (e) => {
      setEnrollment(e.target.value)
    }
    

    
  
      return (
        <>
        <section>
          <div className="personal__data">
          <div className="titles">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clipRule="evenodd" />
          </svg>
            <p className="individual__title">Personal Data</p >
          </div>
            <div className="individual__data">
             <div className="fullname">
              <input type="text" placeholder="Name" onChange={handleFirstNameChange}/>
              <input type="number" placeholder="Enrollment No" onChange={enrollmentNumberChange}/>
              </div>
            </div>
          </div>
       </section>
        </>
      )
    }
    
    export default Personal
    