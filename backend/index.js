const express = require("express");
const app = express();
const cors = require("cors");
const postsRouter = require('./routes/posts');

app.use(cors());

const PORT = require("dotenv").PORT || 8000;
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use('/posts', postsRouter);

app.listen(PORT,()=>{
    console.log(`Server running in port ${PORT}`)
})