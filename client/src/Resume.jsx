import { useState , useRef} from "react"
import Personal  from "./Personal.jsx"
import Education from "./Education.jsx"
import Work from './Work.jsx'
import Contact from './Contact.jsx'
import About from './About.jsx'
import html2canvas from "html2canvas"
import jsPDF from "jspdf"

function Resume() {
  const [firstName , setFirstName] = useState('Rickie')
  const [enrollment, setEnrollment]  = useState('22321016')
  const [schoolInput , setSchoolInput] = useState([
    {
    id:0,
    school:'Princeton University',
    degree:'Computer Science and Engineering',
    startYear:'2015',
    endYear:'2019'
    }
  ])

  const [expInput , setExpInput] = useState([
    {
      id:0,
      position:'Intern',
      company:'Wisoky - Stokes',
      startDate:'02/04/2018',
      endDate:'04/07/2018',
      role:" Collaborated with the design team to translate UI/UX designs into responsive web pages using HTML, CSS, and JavaScript. Assisted in optimizing website speed and performance through techniques such as lazy loading, minification, and image optimization. Implemented frontend frameworks like ReactJS for dynamic and interactive user experiences.",
    }
  ])
  const [email , setEmail] = useState('Rashawn27@gmail.com')
  const [phone , setPhone] = useState('7560030517')
  const [address , setAddress] = useState('West New Beverly, Chris Gardens, 38806')


  const pdfRef = useRef()

  const downloadPDF = async () => {
    const input = pdfRef.current;
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
  
    // Only send data to the backend when the download button is clicked
    if (window.confirm('Do you want to save the student details to the database?')) {
      const dataToSend = {
        firstName,
        enrollment,
        educationDegree: schoolInput.map(item => item.degree),
        cgpa: schoolInput.map(item=>item.startYear),
        // Add other fields as needed
      };
  
      // Make an HTTP POST request to your backend API
      fetch('http://localhost:5001/saveStudentDetails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Make sure the response is valid JSON
      })
      .then(data => {
        console.log('Data sent to the backend:', data);
      })
      .catch(error => {
        console.error('Error sending data to the backend:', error);
      });
      
    }
  
    // Generate PDF and save it
    const pdf = new jsPDF('p', 'mm', 'a4', true);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('resume.pdf');
  };

    return (
      <>
      <div className="resume__structure">
      <div className="resume__components">
      <Personal setFirstName={setFirstName} setEnrollment={setEnrollment} />
      <Education setSchoolInput={setSchoolInput}/>
      <Work setExpInput={setExpInput}/>
      <Contact setEmail={setEmail} setPhone={setPhone} setAddress = {setAddress}/>
      </div>
      <div className="resume__page" id="resumePage" ref={pdfRef}>
      <About downloadPDF={downloadPDF}/>
        <div className="resume__personal">
         <div className="person__name">
         <h1>{firstName}</h1>
         &nbsp;&nbsp;&nbsp;
        </div>
         <h2>{enrollment}</h2>
        </div>
<div>
  <div className="resume__education">
      <h2>Education</h2>
  </div>
  <div className="education__items">
 {schoolInput.map(item => <div key={item.id} className="individual__education">
  <h4>{item.school}</h4>
  <h4>{item.degree}</h4>
  <h4>{item.startYear}</h4>
 </div>  )}
  </div>

  <div className="resume__education">
      <h2>Work Experience</h2>
  </div>
  <div className="education__items">
 {expInput.map(item => <div key={item.id} className="individual__education">
  <h4>{item.position}</h4>
  <h4>{item.company}</h4>
  <h4>{item.startDate} - {item.endDate}</h4>
  <h4>{item.role}</h4>
 </div>  )}
  </div>

  <div className="resume__education">
      <h2>Contact</h2>
  </div>
  <div className="contact__section">
   <div className="contact__item">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
   </svg>
    <p style={{color:"black"}}>{email}</p>
   </div>
   <div className="contact__item">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
  </svg>
   <p style={{color:"black"}}>{phone}</p>
   </div>
   <div className="contact__item">
   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
   </svg>
   <p style={{color:"black"}}>{address}</p>
   </div>
  </div>

</div>
      </div>
      </div>
      </>
    )
  }
  
  export default Resume

// import { useState, useRef, useEffect } from "react";
// import Personal from "./Personal.jsx";
// import Education from "./Education.jsx";
// import Work from "./Work.jsx";
// import Contact from "./Contact.jsx";
// import About from "./About.jsx";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// function Resume() {
//   const getLocalStorageData = (key, defaultValue) => {
//     const storedValue = localStorage.getItem(key);
//     return storedValue ? JSON.parse(storedValue) : defaultValue;
//   };

//   const [firstName, setFirstName] = useState(getLocalStorageData("firstName", "Rickie"));
//   const [enrollment, setEnrollment] = useState(getLocalStorageData("enrollment", "22321016"));
//   const [schoolInput, setSchoolInput] = useState(getLocalStorageData("schoolInput", [
//     {
//       id: 0,
//       school: 'Princeton University',
//       degree: 'Computer Science and Engineering',
//       startYear: '2015',
//       endYear: '2019'
//     }
//   ]));

//   const [expInput, setExpInput] = useState(getLocalStorageData("expInput", [
//     {
//       id: 0,
//       position: 'Intern',
//       company: 'Wisoky - Stokes',
//       startDate: '02/04/2018',
//       endDate: '04/07/2018',
//       role: " Collaborated with the design team to translate UI/UX designs into responsive web pages using HTML, CSS, and JavaScript. Assisted in optimizing website speed and performance through techniques such as lazy loading, minification, and image optimization. Implemented frontend frameworks like ReactJS for dynamic and interactive user experiences.",
//     }
//   ]));

//   const [email, setEmail] = useState(getLocalStorageData("email", "Rashawn27@gmail.com"));
//   const [phone, setPhone] = useState(getLocalStorageData("phone", "7560030517"));
//   const [address, setAddress] = useState(getLocalStorageData("address", "West New Beverly, Chris Gardens, 38806"));

//   useEffect(() => {
//     localStorage.setItem("firstName", JSON.stringify(firstName));
//     localStorage.setItem("enrollment", JSON.stringify(enrollment));
//     localStorage.setItem("schoolInput", JSON.stringify(schoolInput));
//     localStorage.setItem("expInput", JSON.stringify(expInput));
//     localStorage.setItem("email", JSON.stringify(email));
//     localStorage.setItem("phone", JSON.stringify(phone));
//     localStorage.setItem("address", JSON.stringify(address));
//   }, [firstName, enrollment, schoolInput, expInput, email, phone, address]);

//   const pdfRef = useRef();

//   const downloadPDF = () => {
//     const input = pdfRef.current;
//     html2canvas(input).then((canvas) => {
//       const imgData = canvas.toDataURL('image/png');
//       const pdf = new jsPDF('p', 'mm', 'a4', true);
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = pdf.internal.pageSize.getHeight();
//       pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
//       pdf.save('resume.pdf');

//     });
//   };

//   return (
//     <>
//       <div className="resume__structure">
//         <div className="resume__components">
//           <Personal setFirstName={setFirstName} setEnrollment={setEnrollment} />
//           <Education setSchoolInput={setSchoolInput} />
//           <Work setExpInput={setExpInput} />
//           <Contact setEmail={setEmail} setPhone={setPhone} setAddress={setAddress} />
//         </div>
//         <div className="resume__page" id="resumePage" ref={pdfRef}>
//           <About downloadPDF={downloadPDF} />
//           <div className="resume__personal">
//             <div className="person__name">
//               <h1>{firstName}</h1>
//               &nbsp;&nbsp;&nbsp;
//             </div>
//             <h2>{enrollment}</h2>
//           </div>
//           <div>
//             <div className="resume__education">
//               <h2>Education</h2>
//             </div>
//             <div className="education__items">
//               {schoolInput.map(item => (
//                 <div key={item.id} className="individual__education">
//                   <h4>{item.school}</h4>
//                   <h4>{item.degree}</h4>
//                   <h4>{item.startYear} - {item.endYear}</h4>
//                 </div>
//               ))}
//             </div>

//             <div className="resume__education">
//               <h2>Work Experience</h2>
//             </div>
//             <div className="education__items">
//               {expInput.map(item => (
//                 <div key={item.id} className="individual__education">
//                   <h4>{item.position}</h4>
//                   <h4>{item.company}</h4>
//                   <h4>{item.startDate} - {item.endDate}</h4>
//                   <h4>{item.role}</h4>
//                 </div>
//               ))}
//             </div>

//             <div className="resume__education">
//               <h2>Contact</h2>
//             </div>
//             <div className="contact__section">
//             <div className="contact__item">
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
//  <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
//  <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
//   </svg>
//    <p style={{color:"black"}}>{email}</p>
//   </div>
//   <div className="contact__item">
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
//  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
//  </svg>
//   <p style={{color:"black"}}>{phone}</p>
//   </div>
//   <div className="contact__item">
//   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"  width={25} height={25}>
//  <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
//  <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
//   </svg>
//   <p style={{color:"black"}}>{address}</p>
//  </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Resume;






