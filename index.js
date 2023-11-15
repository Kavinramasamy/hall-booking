import express from 'express';
import cors from 'cors';
import { } from 'dotenv/config.js';
import { db_connection } from './Database/DB.js';
import { RouterPage } from './Router/RouterPage.js';

const app = express();

db_connection();


app.use(cors({ origin: "*" }));
app.use(express.json());

app.use('/', RouterPage);

app.listen(process.env.PORT, () => { console.log("server connected", process.env.PORT) });