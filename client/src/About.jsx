
function About({downloadPDF}) {
  
    return(
        <>
         <div className="personal__data" style={{display:"flex", justifyContent:"center" , alignItems:"center"}} onClick={downloadPDF}>
              <button style = {{fontSize:"32px"}}>Download</button>
         </div>
        </>
    )
}


export default About