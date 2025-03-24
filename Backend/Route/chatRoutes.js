const express = require('express');
const checkToken = require('../CheckToken');
const { createchat, getFriendChat } = require('../Controller/chatControler');
const router = express.Router();


router.post('/create/:friendId',checkToken,createchat)
router.get('/getFriendChat/:friendId',checkToken,getFriendChat)



module.exports = router