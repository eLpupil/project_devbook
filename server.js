const express = require('express');
const app = express();



app.get('/', (req, res) => {
    res.send('api works');
})















const PORT = process.env.PORT || '3000';
app.listen(PORT, err => {
    if (!err) {
        console.log('listening on port ' + PORT);
    }
})