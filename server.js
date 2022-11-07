const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const { checkUser } = require('./middleware/auth.middleware');

const app = express();

// Connect Database;
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// jwt
app.get('*', checkUser);

// Define Routes;
app.use('/api/users', require('./routes/api/user.route'));
app.use('/api/profile', require('./routes/api/profile.route'));
app.use('/api/questions', require('./routes/api/question.route'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()  => console.log(`Server started in port ${PORT}`));