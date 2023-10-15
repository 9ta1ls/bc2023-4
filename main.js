const express = require("express");
const PORT = 3000;
const app = express();
const fs = require("fs");
const xml = require("fast-xml-parser")

const parser = new xml.XMLParser();
const builder = new xml.XMLBuilder();

function minFunc(arr){
    let minVal = arr.res[0].value;
    for(let i = 1; i< arr.res.length; i++)
    {
        if(arr.res[i].value < minVal)
            minVal = arr.res[i].value;
    }
    return minVal;
}

app.get("/", (req,res) =>{
    fs.readFile("data.xml",(err, data)=>{
       if(err != null)
            res.status(400).send('Invalid XML format');
        const obj = parser.parse(data);
        let minVal =  minFunc(obj.indicators);
        const xmlData = {"data":{"min_value":minVal}};
        const finaleXml = builder.build(xmlData);
        res.send(finaleXml);
    }); 
})

app.listen(PORT, ()=>{
    console.log(`Сервер запущено на порті ${PORT}`);
});