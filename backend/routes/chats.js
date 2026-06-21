const express = require("express");
const chat = require("../models/chat");
const auth = require("../middleware/auth");

const router = express.Router();


// GET All Chats
router.get("/", auth, async (req, res) => {
    try {

        const chats = await Chat.find({
            userId: req.userId,
        });

        res.json(chats);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});


// SAVE Chat
router.post("/", auth, async (req, res) => {

    try {

        const { title, messages } = req.body;

        const chat = new Chat({
            userId: req.userId,
            title,
            messages,
        });

        await chat.save();

        res.status(201).json(chat);

    } catch (error) {

        res.status(500).json({
            message: error.message,
        });
    }
});

module.exports = router;