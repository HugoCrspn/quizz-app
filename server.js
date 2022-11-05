const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database;
connectDB();

// Init Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define Routes;
app.use('/api/users', require('./routes/api/user.routes'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile.route'));
app.use('/api/questions', require('./routes/api/question.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()  => console.log(`Server started in port ${PORT}`));