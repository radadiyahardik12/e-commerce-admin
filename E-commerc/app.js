const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const CategoryRoutes = require('./routes/category');
const ProductRoutes = require('./routes/products');
const UserRoutes = require('./routes/user');

const app = express();
const multer = require('multer');
const upload = multer();

app.use(upload.any()); 
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.options('*', cors());

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
app.use(allowCrossDomain);


mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api/user', UserRoutes)
app.use('/api/category', CategoryRoutes)
app.use('/api/products', ProductRoutes)

const PORT = 5000;

const start = async () => {
    try {
       await mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });
        app.listen(PORT, () => {
            console.log("done");
         });  
    } catch (error) {
        console.error(error);
    }
}

start();