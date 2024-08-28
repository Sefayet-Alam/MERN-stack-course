const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    },
});

const upload = multer({ storage: storage }).single('myfile'); //postman key=myfile

//route: http://localhost:8000/upload***
app.post('/upload', function (req, res) {
    upload(req, res, function (error) {
        if (error) {
            return res.send("Error uploading file..");
        }
        else {
            res.send('File uploaded successfully!');
        }
    })
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


//github link: https://github.com/Sefayet-Alam/MERN-stack-course/blob/main/Module%2015/Live_Exam/index.js