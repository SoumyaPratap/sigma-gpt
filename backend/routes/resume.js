const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const axios = require("axios");

const router = express.Router();

const upload = multer({
    dest: "uploads/",
});

router.post(
    "/analyze",
    upload.single("resume"),
    async (req, res) => {

        try {

            const pdfBuffer = fs.readFileSync(
                req.file.path
            );

            const pdfData =
                await pdfParse(pdfBuffer);

            const resumeText = pdfData.text;

            const response =
                await axios.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    {
                        model: "openrouter/free",

                        messages: [
                            {
                                role: "system",
                                content:
                                    "Analyze resumes. Give ATS score out of 100, strengths, weaknesses and improvement suggestions.",
                            },
                            {
                                role: "user",
                                content: resumeText,
                            },
                        ],
                    },
                    {
                        headers: {
                            Authorization:
                                `Bearer ${process.env.OPENROUTER_API_KEY}`,
                            "Content-Type":
                                "application/json",
                        },
                    }
                );

            fs.unlinkSync(req.file.path);

            res.json({
                analysis:
                    response.data.choices[0]
                        .message.content,
            });

        } catch (error) {

            console.log(error);

            res.status(500).json({
                message:
                    "Resume analysis failed",
            });
        }
    }
);

module.exports = router;