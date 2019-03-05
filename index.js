const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const db = require('./db');
const PORT = process.env.PORT || 9000;
const ENV = process.env.NODE_ENV || 'development';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/crimedata', async(req, res)=>{
    res.send({
        success: true,
        crimeData: {
            totalCrime: {
                count: 'Number',
                totalPropertyCrime: 'Number',
                totalViolentCrime: 'Number'
            }
        }
    })
})

app.get('/api/stats', async(req, res)=>{
    
    res.send({
    success: true,
    data:[{
            idDrNumber: 190506343,
            crimeCode: {
                code:624,
                crimeType: 'Violent',
                crimeDescription: 'Battery - Simple Assault',
            },
            areaId: 05,
            longitude: 33.7941,
            latitude: -118.29,
            dateOccurred: '2019-23-02',
            timeOccurred: '02:40',
            dateCreated: '2019-23-02 02:40'
        },
        {
            idDrNumber: 192006589,
            crimeCode: {
                code:624,
                crimeType: 'Violent',
                crimeDescription: 'Battery - Simple Assault'
            },
            areaId: {
                id: 5,
                name: 'some block'
            },
            longitude: 34.0654,
            latitude:  34.0654,
            dateOccurred: 2019-23-02,
            timeOccurred: '20:27',
            dateCreated: '2019-23-02 02:40'
        },
        {
            idDrNumber: 190307371,
            crimeCode: {
                code:230,
                crimeType: 'Violent',
                crimeDescription: 'ASSAULT WITH DEADLY WEAPON, AGGRAVATED ASSAULT'
            },
            areaId: {
                id: 5,
                name:'some block'
            },
            longitude: 34.0268,
            latitude:  -118.2808,
            dateOccurred: 2019-23-02,
            timeOccurred: '00:08',
            dateCreated: '2019-23-02 02:40'
        }
]})
})


app.get('/api/mapdata', async(req,res)=>{
    res.send({
        success: true,
        mapData: [
            {
                idDrNumber: 190506343,
                longitude: 33.7941,
                latitude: -118.29,
            },
            {
                idDrNumber: 190506353,
                longitude: 33.7941,
                latitude: -117.29,
            },
            {
                idDrNumber: 190506323,
                longitude: 33.7941,
                latitude: -116.29,
            },
        ]
    })
});





//this might go under stats api
app.get('/api/charts', async(req, res) => {
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