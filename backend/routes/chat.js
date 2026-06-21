const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/", async (req, res) => {
    try {

        const { message } = req.body;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openrouter/free",

                messages: [
                    {
                        role: "system",
                        content: `
You are Sigma GPT.

Reply in a friendly and concise way.

Keep answers short unless the user asks for details.

You help students and developers with coding, DSA, projects, interviews and career guidance.

IMPORTANT:
Whenever you provide code:

1. Always use markdown code blocks.
2. Always include language name.
3. Never write code in a single line.
4. Properly indent code.
5. Put every statement on a new line.

Example:

\`\`\`java
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
\`\`\`
`
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const reply =
            response.data.choices[0].message.content;

        res.json({
            reply,
        });

    } catch (error) {

        console.log(error.response?.data || error.message);

        res.status(500).json({
            message: "Something went wrong",
        });
    }
});

module.exports = router;