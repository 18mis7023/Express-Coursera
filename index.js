const express=require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');


const hostname='localhost';
const port=3000;

const app=express();
app.use(morgan('dev'));
app.use(bodyParser.json());

app.all('/dishes',(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    next(); // here by keeping next() from any where in this page dihers is used thed then 1st this will be run and then those will run
});

app.get('/dishes',(req,res,next)=>{
    res.end("will send all the dishes to you!");
});

app.post('/dishes',(req,res,next)=>{
   res.end("will add the dish: "+req.body.name+" with details: "+req.body.description); 
});


app.put('/dishes',(req,res,next)=>{
    res.statusCode=403;
    res.end('Put Operation not supported on /dishes'); 
 });

 //dangerous operation is delete 
app.delete('/dishes',(req,res,next)=>{
    res.end('Deleting all the dishes!');
});


app.get('/dishes/:dishId',(req,res,next)=>{
    res.end("will send all the dish: "+req.params.dishId+" to you!");
});

app.post('/dishes/:dishId',(req,res,next)=>{
    res.statusCode=403;
   res.end("Post operation is not supported on this operation /dishes/"+req.params.dishId); 
});


app.put('/dishes/:dishId',(req,res,next)=>{
    res.write('Updating the dish: '+req.params.dishId);
    res.end('will update the dish: '+req.body.name+
    "with details: "+req.body.description);  
 });

 //dangerous operation is delete 
app.delete('/dishes/:dishId',(req,res,next)=>{
    res.end('Deleting dish: '+req.params.dishId);
});



app.use(express.static(__dirname+'/public'))

app.use((req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>This is an Express server</h1></body></html>');
});

const server=http.createServer(app);
server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}`);
})