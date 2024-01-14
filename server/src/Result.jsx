
import {ethers} from "ethers";
import { useState, useEffect } from "react";
import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import { Link } from "react-router-dom";
import axios from "axios";

import abi from './abi.json';
async function getBlockchainData() {
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const provider = new ethers.providers.Web3Provider(window.ethereum);
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

export default function Result() {
  const [showModal, setShowModal] = useState(false);
  const [nextId, setNextId] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [description, setDescription] = useState("");
  const [cgpa, setCGPA] = useState("");
  const [branch, setBranch] = useState("");
  const [eligibleBranches, setEligibleBranches] = useState([]);
 const [registeredCompanies, setRegisteredCompanies] = useState([]);
  const [showShortlistModal, setShowShortlistModal] = useState(false);
  const [shortlistedStudents, setShortlistedStudents] = useState([]);
  const [companies, setCompanies] = useState([]);
  async function addCompany() {
    try {
      await axios.post('http://localhost:5000/saveJobDetails', {
        cName: companyName,
        cg: cgpa,
        branchAllowed: branch,
        description:description,
      });

      // Update the state with the new company
      setCompanies(prevCompany => [
        ...prevCompany,
        {
          id: nextId,
          name: companyName,
        },
      ]);
      
      setShowModal(false)
      // Reset input values
      setCompanyName("");
      setCGPA("");
      setBranch("");
      setDescription("");
      const contract = await getContract();
      await contract.shortlistCandidates(companyName, cgpa, eligibleBranches);
      setCompanies([...companies, { id: nextId, name: companyName }]);
      setNextId(nextId + 1);
      setShowModal(false);
    } catch (error) {
      console.error('Error adding company:', error);
    }
  }



  // async function addCompany() {
  //   setShowModal(() => false);
  //   setNextId(nextId => nextId + 1);

  //   // Send POST request to save job details
  //   try {
  //     await axios.post('http://localhost:5000/saveJobDetails', {
  //       cName: companyName,
  //       cg: cgpa,
  //       branchAllowed: branch,
  //       description:description,
  //     });

  //     // Update the state with the new company
  //     setCompanies(prevCompany => [
  //       ...prevCompany,
  //       {
  //         id: nextId,
  //         name: companyName,
  //       },
  //     ]);

  //     // Reset input values
  //     setCompanyName("");
  //     setCGPA("");
  //     setBranch("");
  //     setDescription("");
  //   } catch (error) {
  //     console.error('Error saving job details:', error);
  //   }
  // }


  // async function addCompany() {
  //   if (companyName.trim() === "") {
  //     alert("Company Name is required!");
  //     return;
  //   }
  //   setShowModal(() => false);
  //   setNextId((prevId) => prevId + 1);
  //   setCompanies((prevCompany) => [
  //     ...prevCompany,
  //     {
  //       id: nextId,
  //       name: companyName,
  //       description: companyDescription,
  //       cgpa: companyCgpa,
  //       branch: companyBranch,
  //     },
  //   ]);
  //   setCompanyName("");
  //   setCompanyDescription("");
  //   setCompanyCgpa("");
  //   setCompanyBranch("");
  // }



  return (
    <>
      <div className="add__jobs">
        <Button
          type="button"
          color="secondary"
          className="add__button"
          onClick={() => setShowModal(true)}
        >
          +New
        </Button>
        {companies.map((company) => (
          <div key={company.id} className="company__description">
            <p>{company.name}</p>
            <Link to="shortlist">
              <Button color="secondary">View Shortlist</Button>
            </Link>
          </div>
        ))}
      </div>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t addjobs__modal ">
                  <h3 className="text-3xl font-semibold">Add a New Job</h3>
                </div>
                <div className="relative p-6 flex-auto modal__form ">
                  <Input
                    type="text"
                    label="Company Name"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    isRequired
                  />
                  <Textarea
                    label="Description"
                    placeholder="Enter your description"
                    className="max-w-xs"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Input
                    type="number"
                    label="CGPA"
                    value={cgpa}
                    onChange={(e) => setCGPA(e.target.value)}
                  />
                  <Input
                    type="text"
                    label="Branch"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                  />
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b gap-4">
                  <Button
                    type="Button"
                    variant="flat"
                    color="secondary"
                    onClick={addCompany}
                    className="mb-2"
                  >
                    Add
                  </Button>
                  <Button
                    type="Button"
                    variant="flat"
                    color="danger"
                    onClick={() => setShowModal(false)}
                    className="mb-2 mr-2"
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
    </>
  );
}

















