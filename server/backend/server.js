const express = require("express")
const app = express()
const port = 5000
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Student = require('./Model/studentDetails')
const Job = require('./Model/jobDetails')
dotenv.config();

const DB = process.env.DATABASE?.replace('<password>', process.env.DATABASE_PWD)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'blockPlacement',
})

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:5174');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.get('/api/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

app.post('/saveJobDetails' , async(req,res)=>{
    try{
        const{cName, cg, branchAllowed,description} = req.body;
        const newJob = new Job({
            cName,
            cg,
            branchAllowed,
            description,
        })

        await newJob.save();
        res.status(200).json({message: 'Job detail saved successfully'});
    }catch(error){
        console.log('Error saving job details',error);
        res.status(500).json({error:'Internal Server Error'});
    }
})




app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app is listening on ${port}`)
})