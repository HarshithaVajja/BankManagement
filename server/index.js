import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import bcrypt from 'bcrypt';
import routes from './routes/routes.js';

const app = express();

app.use(express.json());
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// mongoose setup

// const PORT = 6001;
// mongoose.connect('mongodb://localhost:27017/bankManagement', { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }
// )
const PORT = 6001;
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{

    // Use all routes from routes.js
    app.use('/', routes);


    app.listen(PORT, ()=>{
        console.log(`Running @ ${PORT}`);
    });
}
).catch((e)=> console.log(`Error in db connection ${e}`));