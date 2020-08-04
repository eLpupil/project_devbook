const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Body Parser Middleware
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/auth', require('./routes/api/auth'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    
    app.get('*', (req, res) => {
        res.sendFile(__dirname + '/client/build/index.html')
    });
}

const PORT = process.env.PORT || '3000';
app.listen(PORT, err => {
    if (!err) {
        console.log(`listening on port ${PORT}`);
    }
})  