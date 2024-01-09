const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()
const { CONNECTION_STR, DATABASE_NAME, API_PORT, ORIGINS } = process.env;
const TokenManager = require('./jwt')

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = CONNECTION_STR;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const corsOptions = {
  origin: ORIGINS,
  optionsSuccessStatus: 200
}

app.use(cors());
app.use(express.json());
/**
 * @swagger
 * /get:
 *   get:
 *     summary: Get data
 *     tags:
 *       - Data
 *     parameters:
 *       - in: query
 *         name: _id
 *         schema:
 *           type: string
 *         required: true
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               msg: get success
 *               data:
 *                 _id: "1"
 *                 Seed_RepDate: "25640623"
 *                 Seed_Year: "2564"
 *                 Seeds_YearWeek: "26"
 *                 Seed_Varity: "ขาวดอกมะลิ 105"
 *                 Seed_RDCSD: "ลำปาง"
 *                 Seed_Stock2Sale: "198,325"
 *                 Seed_Season: "1"
 *                 Seed_Crop _Year: "2564"
 * 
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               msg: Token invalid
 */
app.get('/get', cors(corsOptions), async (req, res) => {
  let jwtStatus = TokenManager.authAccess(req);
  const { _id } = req.body
  if(jwtStatus!=false){
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection('location');
  
      const result = await collection.findOne({'﻿_id': _id});
  
      res.send(result);
    } finally {
      await client.close();
    }
  } else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
});
app.post('/add', cors(corsOptions), async (req, res) => {
  let jwtStatus = TokenManager.authAccess(req);
  const { Seed_RepDate, Seed_Year, Seeds_YearWeek, Seed_Varity, Seed_RDCSD, Seed_Stock2Sale, Seed_Season, Seed_Crop_Year } = req.body
  if(jwtStatus!=false){
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection('location');

      const last_id = await collection.find().sort({ _id: -1 }).limit(1).toArray(); // last_id[0]["﻿_id"]
  
      const result = await collection.insertOne({
        "﻿_id": String(parseInt(last_id[0]["﻿_id"].trim(), 10)+1),
        Seed_RepDate: Seed_RepDate,
        Seed_Year: Seed_Year,
        Seeds_YearWeek: Seeds_YearWeek,
        Seed_Varity: Seed_Varity,
        Seed_RDCSD: Seed_RDCSD,
        Seed_Stock2Sale: Seed_Stock2Sale,
        Seed_Season: Seed_Season,
        "Seed_Crop _Year": Seed_Crop_Year
      });
  
      res.send({msg:`${result.acknowledged == true? 'add success':'error'}`});
    } finally {
      await client.close();
    }
  } else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})
app.put('/edit', cors(corsOptions), async (req, res) => {
  let jwtStatus = TokenManager.authAccess(req);
  const { _id, Seed_RepDate, Seed_Year, Seeds_YearWeek, Seed_Varity, Seed_RDCSD, Seed_Stock2Sale, Seed_Season, Seed_Crop_Year } = req.body
  if(jwtStatus!=false){
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection('location');
  
      const result = await collection.updateOne({'﻿_id': _id}, {$set: {
        Seed_RepDate: Seed_RepDate,
        Seed_Year: Seed_Year,
        Seeds_YearWeek: Seeds_YearWeek,
        Seed_Varity: Seed_Varity,
        Seed_RDCSD: Seed_RDCSD,
        Seed_Stock2Sale: Seed_Stock2Sale,
        Seed_Season: Seed_Season,
        "Seed_Crop _Year": Seed_Crop_Year
      }});
  
      res.send({msg:`${result.matchedCount == '1'? 'edit success':'_id not found'}`});
    } finally {
      await client.close();
    }
  } else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})
app.delete('/delete', cors(corsOptions), async (req, res) => {
  let jwtStatus = TokenManager.authAccess(req);
  const { _id } = req.body
  if(jwtStatus!=false){
    try {
      await client.connect();
      const db = client.db(DATABASE_NAME);
      const collection = db.collection('location');
  
      const result = await collection.deleteOne({'﻿_id': _id});
  
      res.send({msg:`${result.deletedCount == '1'? 'delete success':'_id not found'}`});
    } finally {
      await client.close();
    }
  } else{
    res.status(401)
    res.json({msg:'Token invalid'})
  }
})

app.post('/login', cors(corsOptions),(req,res)=>{
  const { user, pass } = req.body
  if (user === 'admin' && pass === 'admin') {
    res.send({access_token:TokenManager.getGenerateAccessToken({'user_id':user})})
  } else {
    res.send({msg:'user or pass invalid'})
  }
})

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Docs',
      version: '1.0.0',
    },
  },
  apis: ['index.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


app.listen(API_PORT, () => {
  console.log('CORS enable. Server on port '+API_PORT);
})