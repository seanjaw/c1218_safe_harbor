const path = require('path');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const fs = require('fs');
const stream = require ('stream')
//parser for csv file
const parse= require('csv-parse');

const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors());
app.use(express.json());

const parser = parse({
    delimiter:','
})

parser.on('readable', function(){
    let record;
    while (record = parser.read()) {
        try{
            var sql = 'INSERT INTO `allcrimes` (`DR Number`, `Date Occurred`, `Time Occurred`, `Area ID`,\
            `Crime Code`, `Latitude`, `Longitude`) \
            VALUES (?,?,?,?,?,?,?)';
            const query = mysql.format(sql, record);

            db.query(query);
        }catch(error){
            console.log(error)
        }

    }
})

//used the site below to grab the directory where the data was held,
//https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options
//then used pipe, which is inherent to node, imported from stream to connect it to parser
//npm installed csv-parse, which is an object that holds methods
//delimiter grabs the comma, which is separating all the values
//parser.on is an event listener that says once you have readable data, do this function
//the while loop sets var record to a function read, which will read the data that comes in
//parser.read will store the record as an array
//due to this we to make a prepared statment and ensure the proper order is made
//then we do the query to insert all the data.

//node --max_old_space_size=4096 index.js
//since javascript server did not have enough memory it was crashing before it could complete all the tasks
//the node line above made the allocated resource handle 1 gb in the main index server file.

// const readData = fs.createReadStream('./crimedata2.csv').pipe(parser);



app.get('/api/total', async(req,res)=>{
    const sql = 'SELECT COUNT(`DR Number`) \
    FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code` \
    WHERE `crimecodes`.`typeOfCrime` = \'Violent\'';
  
    res.sendFile(path.join(__dirname,'dummyGetFiles','crimedata.json'))
})

app.get('/api/violent', async(req, res)=>{
    res.sendFile(path.join(__dirname,'dummyGetFiles','violentOrProperty.json'))
})

app.get('/api/property', async(req, res)=>{
    res.sendFile(path.join(__dirname,'dummyGetFiles','violentOrProperty.json'))
})

app.get('/api/crimedata', async(req, res)=>{
    res.sendFile(path.join(__dirname,'dummyGetFiles','crimedata.json'))
})

// app.get('/api/mapdata', async(req,res)=>{
//     res.sendFile('./dummyGetFiles/mapdata.json')
// });

//app.get('./api/crimes/:code?')
app.get('/api/crimes/210', async(req,res)=>{
    res.sendFile(path.join(__dirname,'dummyGetFiles','crime.json'))
})

app.get('/api/',async(req,res)=>{
    res.sendFile(path.join(__dirname,'dummyGetFiles','generalMap.json'))
})

//app.get('./api/mapdata/:areaID')
app.get('/api/area/5', async(req,res)=>{
    res.sendFile(path.join(__dirname, 'dummyGetFiles', 'detailedMap.json'))
});



//this might go under crimes api
app.get('/api/stats', async(req, res) => {
    //
    // const sql = 'SELECT * FROM `test`';
    //
    // const users = await db.query(sql);

    const sql = 'SELECT * FROM `areas`';
    //const users = 'I think itll work just saying text';
    const results =  await db.query(sql);
    
    res.send({
        success: true,
        users: results
    });
});


app.listen(PORT, () => {
    console.log('Server Running at localhost:' + PORT);
}).on('error', (err) => {
    console.log('Server listen error, you probably already have a server on PORT:' + PORT)
});