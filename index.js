const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// POST method route for processing data
app.post('/bfhl', (req, res) => {
    try {
        const data = req.body.data;
        const user_id = "john_doe_17091999";
        const email = "john@xyz.com";
        const roll_number = "ABCD123";

        let numbers = [];
        let alphabets = [];
        let highest_lowercase_alphabet = '';

        data.forEach(item => {
            if (!isNaN(item)) { // Check if item is a number
                numbers.push(item);
            } else if (/^[a-zA-Z]+$/.test(item)) { // Check if item is an alphabet
                alphabets.push(item);
                if (item === item.toLowerCase()) {
                    if (highest_lowercase_alphabet === '' || item > highest_lowercase_alphabet) {
                        highest_lowercase_alphabet = item;
                    }
                }
            }
        });

        const response = {
            is_success: true,
            user_id: user_id,
            email: email,
            roll_number: roll_number,
            numbers: numbers,
            alphabets: alphabets,
            highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : []
        };

        res.json(response);
    } catch (error) {
        res.status(400).json({ is_success: false, error: error.message });
    }
});

// GET method route for operation code
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(port, () => {
    console.log("Server running on port ${port}");
});