const express = require('express');
require('express-async-errors');
const cors = require('cors');
const middleware = require('./utils/middleware');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');
const subredditRoutes = require('./routes/subreddit');
const userRoutes = require('./routes/user');
const path = require("path");

require("dotenv").config()

const app = express();

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use('/api', authRoutes);
app.use('/api/reddim/posts', postRoutes);
app.use('/api/reddim/subreddits', subredditRoutes);
app.use('/api/reddim/users', userRoutes);

app.use(middleware.unknownEndpointHandler);
app.use(middleware.errorHandler);
app.use(express.static(path.join(__dirname, "client", "build")))

module.exports = app;