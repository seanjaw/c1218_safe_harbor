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
    const sql = 'SELECT SUM(CASE WHEN `crimecodes`.`typeOfCrime` = "Violent" THEN 1 ELSE 0 END) AS `ViolentCrimes`,\
    SUM(CASE WHEN `crimecodes`.`typeOfCrime` = "Property" THEN 1 ELSE 0 END) AS `PropertyCrimes`\
    FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code`';
    let data = await db.query(sql);
  
    res.send({
        success:true,
        data:data
    })
})

app.get('/api/crimetype/:violentOrProperty?', async(req, res)=>{
    try{
        const query = "SELECT `DR Number`, `Date Occurred`,`Time Occurred`,`Area ID`,\
        `area`.`name` AS `Area`,`crimecodes`.`description` AS `description`, `crimecodes`.`code` AS `code`\
        FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code`\
        JOIN `area` ON `allcrimes`.`Area ID`= `area`.`id`\
        WHERE `Date Occurred` > DATE_SUB('2019-02-02', INTERVAL 1 YEAR)\
        AND `crimecodes`.`typeOfCrime` = ?\
        ORDER BY `Date Occurred` DESC LIMIT 100";
        const inserts = req.params.violentOrProperty;
        let data = await db.query(query, inserts);
        res.send({
            success:true,
            data:data
        })

    }catch(error){
        console.log(error)
    }

})

// app.get('/api/mapdata', async(req,res)=>{
//     res.sendFile('./dummyGetFiles/mapdata.json')
// });

//app.get('./api/crimes/:code?')

app.get('/api/dr/:drNumber?', async(req,res)=>{
    try{
        if(req.params.drNumber === undefined){
            throw new Error('must provide areaID in the form: /api/reviews/<crimeCode>')
        }else if(isNaN(req.params.drNumber)){
            throw new Error(`product id of ${req.params.drNumber} is not a number`)
        }
        const query = "SELECT `DR Number`, `Date Occurred`,`Time Occurred`,`Area ID`,`area`.`name` AS `Area`,`crimecodes`.`code` AS `code`,`crimecodes`.`description` AS `description`,`Longitude`,`Latitude` \
        FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code` JOIN `area` ON `allcrimes`.`Area ID`=`area`.`id`\
        WHERE `allcrimes`.`DR Number` = "+parseInt(req.params.drNumber)+"";

        let data=await db.query(query);

        data = data.map(item=> {
            item.type="Feature",
            item.geometry = {
                type:"Point",
                coordinates:[item.Longitude, item.Latitude]
            };

            item.properties = {
                DRNumber: item['DR Number'],
                "Date Occurred": item['Date Occurred'],
                "Crime Code":item['code'],
                "Area ID": item['Area ID'],
                "Area Name":item['Area'],
                description: item.description,
                "Time Occurred": item['Time Occurred'],
                "Crime Code": item["code"]
            }
            delete item['DR Number'];
            delete item['Time Occurred'];
            delete item['Date Occurred'];
            delete item['Area ID'];
            delete item["code"];
            delete item.description
            delete item.Longitude;
            delete item.Latitude;
            return item;
        })
        res.send({
            success:true,
            geoJson: {
                type:"FeatureCollection",
                features: data
            }
        })


    }catch(error){
        console.log(error)
    }
})


app.get('/api/crimes/:crimeID?', async(req,res)=>{
    try{
        if(req.params.crimeID === undefined){
            throw new Error('must provide areaID in the form: /api/reviews/<crimeCode>')
        }else if(isNaN(req.params.crimeID)){
            throw new Error(`product id of ${req.params.crimeID} is not a number`)
        }
        const query = "SELECT `DR Number`, `Date Occurred`,`Time Occurred`,`Area ID`, `area`.`name` AS `name`,`crimecodes`.`code` AS `code`, `crimecodes`.`description`,`Longitude`,`Latitude` \
        FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code` JOIN `area` ON `allcrimes`.`Area ID` = `area`.`id`\
        WHERE `Date Occurred` > DATE_SUB('2019-02-02', INTERVAL 1 YEAR) AND `allcrimes`.`Crime Code` = "+parseInt(req.params.crimeID)+" ORDER BY `Date Occurred` DESC";

        let data=await db.query(query);

        data = data.map(item=> {
            item.type="Feature",
            item.geometry = {
                type:"Point",
                coordinates:[item.Longitude, item.Latitude]
            };

            item.properties = {
                DRNumber: item['DR Number'],
                "Date Occurred": item['Date Occurred'],
                "Area ID": item['Area ID'],
                description: item.description,
                "Time Occurred": item['Time Occurred'],
                "Crime Code": item["code"],
                "Area Name":item.name
            }
            delete item['DR Number'];
            delete item['Time Occurred'];
            delete item['Date Occurred'];
            delete item['Area ID'];
            delete item.name;
            delete item.description;
            delete item.code;
            delete item.Longitude;
            delete item.Latitude;
            return item;
        })
        res.send({
            success:true,
            geoJson: {
                type:"FeatureCollection",
                features: data
            }
        })


    }catch(error){
        console.log(error)
    }
})

app.get('/api/precInfo',async(req,res)=>{
    // res.sendFile(path.join(__dirname,'dummyGetFiles','generalMap.json'))
    try{
        const query = "SELECT `Area ID` AS `PREC`,COUNT(`DR Number`) AS `total` FROM `allcrimes`\
        WHERE `Date Occurred` > DATE_SUB('2019-02-02', INTERVAL 1 YEAR) GROUP BY `Area ID`";
        let data = await db.query(query);
        console.log(data)
        res.send({
            success:true,
            data:data
        })
        


    }catch(error){
        console.log(error)
    }

})

//app.get('./api/mapdata/:areaID')
app.get('/api/area/:areaID?', async(req,res)=>{
    // res.sendFile(path.join(__dirname, 'dummyGetFiles', 'detailedMap.json'))
    try{
        if(req.params.areaID === undefined){
            throw new Error('must provide areaID in the form: /api/reviews/<areaID>')
        }else if(isNaN(req.params.areaID)){
            throw new Error(`product id of ${req.params.areaID} is not a number`)
        }

        const query = "SELECT `DR Number`, `Date Occurred`,`Time Occurred`,`Area ID`, `area`.`name` AS `name`,`crimecodes`.`code` AS `code`, `crimecodes`.`description`,`Longitude`,`Latitude` \
        FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code` JOIN `area` ON `allcrimes`.`Area ID` = `area`.`id`\
        WHERE `Date Occurred` > DATE_SUB('2019-02-02', INTERVAL 1 YEAR) AND `Area ID` = "+parseInt(req.params.areaID);

        let data=await db.query(query);

        data = data.map(item=> {
            item.type="Feature",
            item.geometry = {
                type:"Point",
                coordinates:[item.Longitude, item.Latitude]
            };

            item.properties = {
                DRNumber: item['DR Number'],
                "Date Occurred": item['Date Occurred'],
                "Area ID": item['Area ID'],
                "Area Name":item.name,
                description: item.description,
                "Time Occurred": item['Time Occurred'],
                "Crime Code": item["code"]
            }

            delete item.name;
            delete item['DR Number'];
            delete item['Time Occurred'];
            delete item['Date Occurred'];
            delete item['Area ID'];
            delete item.code;
            delete item.description;
            delete item.Longitude;
            delete item.Latitude;
            return item;
        })

        

        res.send({
            success:true,
            geoJson: {
                type:"FeatureCollection",
                features: data
            }
        })


    }catch(error){
        console.log(error)
    }
});

app.get('/api/area/:areaID/crimes/:crimeCode?', async(req,res)=>{
    // res.sendFile(path.join(__dirname, 'dummyGetFiles', 'detailedMap.json'))
    try{
        if(req.params.areaID === undefined){
            throw new Error('must provide areaID in the form: /api/reviews/<areaID>')
        }else if(isNaN(req.params.areaID || req.params.crimeCode)){
            throw new Error(`product id of ${req.params.areaID} or ${req.params.crimeCode} is not a number`)
        }

        const query = "SELECT `DR Number`, `Date Occurred`,`Time Occurred`,`Area ID`, `area`.`name` AS `name`,`crimecodes`.`code` AS `code`, `crimecodes`.`description`,`Longitude`,`Latitude` \
        FROM `allcrimes` JOIN `crimecodes` ON `allcrimes`.`Crime Code` = `crimecodes`.`code` JOIN `area` ON `allcrimes`.`Area ID` = `area`.`id`\
        WHERE `Date Occurred` > DATE_SUB('2019-02-02', INTERVAL 1 YEAR) AND `Area ID` = "+parseInt(req.params.areaID)+" AND `code`="+parseInt(req.params.crimeCode);

        let data=await db.query(query);

        data = data.map(item=> {
            item.type="Feature",
            item.geometry = {
                type:"Point",
                coordinates:[item.Longitude, item.Latitude]
            };

            item.properties = {
                DRNumber: item['DR Number'],
                "Date Occurred": item['Date Occurred'],
                "Area ID": item['Area ID'],
                "Area Name":item.name,
                description: item.description,
                "Time Occurred": item['Time Occurred'],
                "Crime Code": item["code"]
            }

            delete item.name;
            delete item['DR Number'];
            delete item['Time Occurred'];
            delete item['Date Occurred'];
            delete item['Area ID'];
            delete item.code;
            delete item.description;
            delete item.Longitude;
            delete item.Latitude;
            return item;
        })

        res.send({
            success:true,
            geoJson: {
                type:"FeatureCollection",
                features: data
            }
        })


    }catch(error){
        console.log(error)
    }
});





// {
//     label: '2019',
//     data: [12000,15678,13294,9023,13643,10000,15387, 8000, 11000,15678,13294,9023],
//     borderColor: 'rgb(255,99,132)',
//     backgroundColor: 'rgba(0,0,0,0)',
//     borderWidth: 3,
//     lineTension:0
// }



app.get('/api/stats/linegraph', async(req,res)=>{
    const query = "SELECT YEAR(`Date Occurred`) AS year, MONTH(`Date Occurred`) AS month, COUNT(`DR Number`) AS total FROM `allcrimes` GROUP BY YEAR(`Date Occurred`), MONTH(`Date Occurred`)";
    let stats = await db.query(query);
    console.log(stats)

    // let data = {
    //     label:null,
    //     totals:[],
    //     borderColor: '',
    //     backgroundColor:'rgba(0,0,0,0)',
    //     borderWidth:3,
    //     lineTension:0
    // }

    // stats.forEach(item=>{
    //     if(item.year === 2016){
    //         data.label=2016;
    //         data.totals.push(item.total)
    //         data.borderColor=randomizer();
    //     }
    // })
    res.send(stats);

})


//this might go under crimes api
// app.get('/api/stats', async(req, res) => {
//     //
//     // const sql = 'SELECT * FROM `test`';
//     //
//     // const users = await db.query(sql);

//     const sql = 'SELECT * FROM `areas`';
//     //const users = 'I think itll work just saying text';
//     const results =  await db.query(sql);
    
//     res.send({
//         success: true,
//         users: results
//     });
// });


app.listen(PORT, () => {
    console.log('Server Running at localhost:' + PORT);
}).on('error', (err) => {
    console.log('Server listen error, you probably already have a server on PORT:' + PORT)
});