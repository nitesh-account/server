import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import dotenv from 'dotenv';

import randomDataRoutes from './routes/randomdata.js'

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cors());

app.use('/randomdata', randomDataRoutes);

app.get('/', (req, res) => {
    res.send("Hello to dashboard API test");
})

// const CONNECTION_URL = 'mongodb+srv://user_01:test123@cluster0.yjzl3.mongodb.net/<dbname>?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => console.log(`Sever is running on port: ${PORT}`)))
.catch((error)=> console.log(error.message));

mongoose.set('useFindAndModify', false);
