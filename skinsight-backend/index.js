const path=require("path")
require('dotenv').config({path:path.resolve(__dirname,".env")});
const scriptPath=path.join(__dirname,"predict.py");
console.log("loaded api key")
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log("Using credentials from:", process.env.GOOGLE_APPLICATION_CREDENTIALS);


const express=require('express');
const cors=require('cors')
const multer=require('multer')
const{exec}=require('child_process');
const app=express();

app.use(cors());
app.use(express.json());
const upload=multer({dest:'uploads/'});

app.post('/predict',upload.single('image'),(req,res)=>{

    const imagePath=req.file.path;
    exec(`python "${scriptPath}" "${imagePath}"`,(error,stdout,stderr) => {
        if (error){
            console.error("prediction error",error.message);
            return res.status(500).json({error:"execution failed"});
        }
        if(stderr){
            console.warn("stderr",stderr);
        }
        if (!stdout || stdout.trim() === "") {
      return res.status(500).json({ error: "No prediction returned" });
    }
     console.log("Prediction result:", stdout.trim());
        res.json({prediction:stdout.trim()});

    });

});

const { VertexAI } = require('@google-cloud/vertexai');

const vertexAI = new VertexAI({
  project: 'skinsight-465715',     
  location: 'us-central1',
  credentials: require('./keys/service-account.json')
});

const model = vertexAI.preview.getGenerativeModel({
  model: 'gemini-2.5-pro',     
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 4096,
    topP:0.9
  }
});

app.post('/ask', async (req, res) => {
  const { question } = req.body;

 try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: question }] }]
    });

    console.log("Gemini raw result:", JSON.stringify(result, null, 2));

    const candidate = result?.response?.candidates?.[0];
    const parts = candidate?.content?.parts;

    
    if (
      result?.response?.candidates?.[0]?.finishReason === "MAX_TOKENS" ||
      !parts ||
      parts.length === 0 ||
      !parts[0]?.text
    ) {
      console.warn("Gemini response was incomplete or empty.");
      return res.status(500).json({
        error: "Gemini failed to generate a full response. Try again with a shorter prompt or retry later."
      });
    }

    const replyText = parts[0].text;
    res.json({ reply: replyText });

  } catch (err) {
    console.error("Gemini via Vertex AI Error:", err);
    res.status(500).json({ error: "Vertex AI failed" });
  }
});
    app.listen(5000,'0.0.0.0',()=>{
        console.log('http://10.0.2.2:5000/predict');
    });




