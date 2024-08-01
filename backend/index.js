const express = require('express');
const cors = require('cors')
const app = express();
const {generateFile} = require('./generateFiles');
const {executeCpp} = require('./executeCpp');
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json("hello world");
})

app.post('/run',async (req,res)=>{
    const {language,code} = req.body;

    if(code===undefined){
        return res.status(400).json({success:false,error:"Empty code found"})
    }
    try{
    const filepath =await generateFile({language,code});
    const output = await executeCpp(filepath)

    return res.json({filepath,output});
    }
    catch(err){
        res.status(500).json({err});
    }
})

app.listen(5000,()=>{
    console.log("listening on port 5000");
})