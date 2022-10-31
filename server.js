const express = require('express');
const app = express();
const fs = require('fs'); 
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.static('.'));
app.use(bodyParser.json());

app.get('/catalog', (req, res) => {
    fs.readFile('./catalog.json', 'utf8', (err, data) => {
        res.send(data);
    });
})

app.listen(3000, function () {
    console.log('server is running on port 3000!');
});

app.post('/addToCart', (req, res) => {
    fs.readFile('./cart.json', 'utf8', (err, data) => {
        if (err) {
            res.send('{"result": 0}')
        } else {
            const cart = JSON.parse(data);
            const item = req.body;
            
            cart.push(item);
            fs.writeFile('./cart.json', JSON.stringify(cart), (err) => {
                if (err) {
                    res.send('{"result": 0}')
                } else {
                    res.send('{"result": 1}')
                }
            })
        }


    })    
})
 