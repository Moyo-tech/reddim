// import express from "express";

const express = require('express');
const { auth } = require('../utils/middleware');
const {
    getUser,
} = require('../controllers/user');

const router = express.Router();

router.get('/:username', getUser);
module.exports = router;