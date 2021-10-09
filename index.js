import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; // npm install dotenv

import postRoutes from './routes/posts.js';
import userRoutes from './routes/users.js';

const app = express();
dotenv.config();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

// connects the routes from posts.js to the app
// appends the /posts in front of each route from there
app.use('/posts', postRoutes);
app.use('/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello to Memories MERN API');
});

// database @ https://www.mongodb.com/cloud/atlas
// before adding dotenv variables:
// const CONNECTION_URL = 'stringWithUsername&Password'
// const PORT = process.env.PORT || 5000;
// mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//    .then(() => {app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))})
//    .catch(err => console.log(err.message));


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))})
    .catch(err => console.log(err.message));

mongoose.set('useFindAndModify', false);