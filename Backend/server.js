const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/priyanshutest', (req, res) => {
    const data = req.body.data;
    const user_id = "PriyanshuTest1"; 
    const email = "oyepkofficial@gmail.com";
    const roll_number = "22BCS15037"; 

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item) && item.length === 1 && /^[a-zA-Z]$/.test(item));
    const highest_alphabet = alphabets.length > 0 ? [alphabets.sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()))[0]] : [];

    const response = {
        is_success: true,
        user_id: user_id,
        email: email,
        roll_number: roll_number,
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: highest_alphabet
    };

    res.status(200).json(response);
});


app.get('/priyanshutest', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});