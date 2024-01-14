const express = require('express')
const app = express()
const port = 5001
const cors = require("cors");
const dotenv = require("dotenv")
const mongoose = require("mongoose");
const Student = require('./Model/resumeDetails')
const Jobs = require('./Model/jobDetails')

dotenv.config()

const DB = process.env.DATABASE?.replace('<password>', process.env.DATABASE_PWD)

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'blockPlacement',
});
app.use(express.json());
app.use(cors());

// Allow requests from http://localhost:5173
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Endpoint to save student details
app.post('/saveStudentDetails', async (req, res) => {
  try {
    // console.log('Received POST request');
    const { firstName, enrollment, educationDegree,cgpa } = req.body; // Updated to match your schema
    const normalizedBranch = Array.isArray(educationDegree) ? educationDegree.join(', ') : educationDegree;
    // Create a new student instance
    const normalizedcg = Array.isArray(cgpa) ? cgpa.join(', '): cgpa;
    const newStudent = new Student({
      name: firstName,
      enrol:enrollment,
      branch:normalizedBranch,
      cgpa:normalizedcg,
      // Add other fields as needed
    });

    // Save the student to the database
    await newStudent.save();
    // console.log('Data saved successfully');
    res.status(200).json({ message: 'Student details saved successfully.' });
  } catch (error) {
    console.error('Error saving student details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/jobs',async(req,res)=>{
  try{
    const jobs = await Jobs.find();
    res.json(jobs);
  }catch(error){
    console.log(error);
    res.status(500).json({message:"Internal Server Error"})
  }
})

app.get('/',(req,res)=>{
    res.send('Hello World!')
})

app.listen(port , () =>{
    console.log(`Example app is listening on ${port}`)
})