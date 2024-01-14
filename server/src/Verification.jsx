
import {ethers} from "ethers"
import { useState,useEffect } from "react"
import abi from "./abi.json"
import axios from "axios"
import { Input , Textarea , Button} from "@nextui-org/react"






async function getBlockchainData() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner();
    return { provider, signer, accounts };
  } catch (error) {
    // Handle error (user rejected request or no wallet is connected)
    console.error(error);

    return { provider: null, signer: null, accounts: [] };
  }
}

const contractAddress = "0x72196E6274b6e2a7Fa3eeFE06A6261B78e90814D";

async function getContract() {
    console.log("e");
  const { signer } = await getBlockchainData();
  const studentResumeContract = new ethers.Contract(contractAddress, abi, signer);
  return studentResumeContract;
}

async function addOrUpdateResumeOnChain(data) {
  console.log(data)
  const studentResumeContract = await getContract();
  const tx = await studentResumeContract.addOrUpdateResume(
    data.enrol,
    data.name,
    data.branch,
    Number(data.cgpa),
    [""],  // Assuming this is an array, make sure to handle it properly
    [""]  // Assuming POR is a comma-separated string
  );
  await tx.wait();
}

async function getResumesFromChain() {
    console.log("e");
 try {
    console.log("e");
   const studentResumeContract = await getContract();
   const enrollments = await studentResumeContract.getEnrollmentList();
console.log("e");
console.log("Enrollments:", enrollments);
   const resumes = await Promise.all(enrollments.map(async (enrollment) => {
     return studentResumeContract.getResume(enrollment);
   }));

   return resumes;
 } catch (error) {
   console.error("Error fetching resumes from chain:", error);
   return [];
 }
}




function Verification() {
  let name = "Naman"
  let enrollment = "21232122"
  let branch= "Electrical"

  const [students,setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentRow, setCurrentRow] = useState({})
  const [formData, setFormData] = useState({
    name: students.name,
    enrollment: students.enrol,
    branch: students.branch,
    cgpa: "",  // Add other form fields as needed
    // por: "",
  });

  const [show , setShow] = useState(true)

  const handleVerification = () => {
    setShowModal(true);
  };

  const handleOnChain = () => {
    addOrUpdateResumeOnChain(currentRow);
    setShowModal(false);
  };
 const [resumes, setResumes] = useState([]);

// Corrected line
const setResumesHandler = (newResumes) => setResumes(newResumes);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  function showVerification() {
    setShow(() => false)
  }


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/students');
            setStudents(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchData();
}, []);

    return (
      <>
      <div className="full__page">      
      <div>
         {/* <div> */}
         <p className="verification__status">Pending</p>
         { show ?  <div className="verification__info">
          {students.map(student =>(
            <div key={student._id} className="student__details">
              <p>{student.name}</p>
              <p>{student.enrol}</p>
              <p>{student.branch}</p>
              <p>{student.cgpa}</p>
              <Button onClick={() => {setShowModal(true); setCurrentRow(student)} } className="verify">Verify</Button>
            </div>
          ))}
              {/* <p>{name}</p>
              <p>{enrol}</p>
              <p>{branch}</p> */}
        </div>
 : null }
         {/* </div> */}
         <p className="verification__status">Verified</p>
        <div className="verification__info">
              <p>Name</p>
              <p>Enrollment</p>
              <p>Branch</p>
              <p><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
               </svg>
              </p>
        </div>
      {!show ? 
        <div className="verification__info">
          {students.map(student =>(
            <div key={student._id} className="student__details">
              <p>{student.name}</p>
              <p>{student.enrol}</p>
              <p>{student.branch}</p>
              <p>{student.cgpa}</p>
              <Button onClick={() => {setShowModal(true); setCurrentRow(student)} } disabled>Verified</Button>
            </div>
          ))}
              {/* <p>{name}</p>
              <p>{enrol}</p>
              <p>{branch}</p> */}
        </div> : null}

          {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="relative p-6 flex-auto verification__modal">
                  <div className="verification__resume">
                     
                  </div>
                  <div className="verification__form">
                    <Input type="text" label="Name" value={currentRow.name || ""}></Input>
                    <Input type = "number" label="Enrollment no" value={currentRow.enrol || ""}></Input>
                    <Input type = "text" label = "Branch" value={currentRow.branch || ""}></Input>
                    <Input type = "number" label = "CGPA" value={currentRow.cgpa || ""}></Input>
                    {/* <Textarea label = "Description"></Textarea> */}
                  </div>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
                  <Button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="Button"
                    variant = "flat"
                    color = "secondary"
                    onClick={() => {
                      handleOnChain();
                      setShowModal(false);
                     setShow(false)
                    }}
                  >
                    On Chain
                  </Button>
                  <Button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="Button"
                    variant = "flat"
                    color = "danger"
                    onClick={() => setShowModal(false)}
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
  
  export default Verification

