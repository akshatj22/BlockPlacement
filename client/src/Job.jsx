import { useState,useEffect } from "react";
import axios from "axios"
import { Button } from "@nextui-org/react";
function Job() {
  const [showModal, setShowModal] = useState(false);
  const [applied , setApplied] = useState(false)
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    cgpa: "",
    description: "",
    branch: "",
  });
  useEffect(() => {
    // Fetch job details when component mounts
    const fetchJobDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/jobs');
        if (response.data && response.data.length > 0) {
          const firstJob = response.data[0]; // Assuming you are fetching only one job for simplicity
          setJobDetails({
            companyName: firstJob.cName,
            cgpa: firstJob.cg,
            description: firstJob.description,
            branch: firstJob.branchAllowed,
          });
        }
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, []);


  const handleApply = () => {
    setApplied(true);
  };

    return (
      <>
       <div className ="job__list">
        <div className="job__portal">
          <h1 className="title">Job Portal</h1>
        </div>
          <div className="company__container">
            <div className="company__info">
              <p onClick={() => setShowModal(true)} className="company__name">{jobDetails.companyName}</p>
              <button onClick={handleApply} className="company__button">{applied ? "Applied!" : "Apply"}</button>
            </div>
            <div className="company__info">
              <p  className="company__name">Microsoft</p>
              <button onClick={handleApply} className="company__button">{applied ? "Applied!" : "Apply"}</button>
            </div>

            {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none modal__box"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
               
                {/*body*/}
                <div className="relative p-6 flex-auto job__modal">
                <p className="text-black text-xl">Company Name: {jobDetails.companyName}</p>
                <p className="text-black text-xl">Company Description:{jobDetails.description}</p>
                <p className="text-black text-xl">CGPA:{ jobDetails.cgpa}</p>
                <p className="text-black text-xl">Branch Eligible: {jobDetails.branch}</p>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <Button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    onClick={() => setShowModal(false)}
                    color="secondary"
                    variant="flat"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
          </div>
       </div>
      </>
    )
  }
  
  export default Job