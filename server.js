const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Body Parser Middleware
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => res.send('api works'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

const PORT = process.env.PORT || '3000';
app.listen(PORT, err => {
    if (!err) {
        console.log(`listening on port ${PORT}`);
    }
})  