import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function MockInterview() {

    const [role, setRole] = useState("");
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    // Start Interview
    const startInterview = async () => {

        if (!role.trim()) {
            alert("Please enter a role.");
            return;
        }

        try {

            setLoading(true);
            setFeedback("");

            const response = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    message: `
You are an interviewer.

Start a mock interview for a ${role} role.

Ask ONLY ONE interview question.
                    `,
                }
            );

            setQuestion(response.data.reply);

        } catch (error) {

            console.log(error);

            alert("Interview failed to start.");

        } finally {

            setLoading(false);
        }
    };

    // Evaluate Answer
    const evaluateAnswer = async () => {

        if (!answer.trim()) {
            alert("Please enter your answer.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    message: `
You are an interviewer.

Role: ${role}

Question:
${question}

Candidate Answer:
${answer}

Evaluate the answer in this format:

1. Technical Accuracy (/10)
2. Communication (/10)
3. Strengths
4. Improvements
5. Next Interview Question
                    `,
                }
            );

            setFeedback(response.data.reply);

        } catch (error) {

            console.log(error);

            alert("Evaluation failed.");

        } finally {

            setLoading(false);
        }
    };

    return (
        <div
            style={{
                backgroundColor: "#343541",
                color: "white",
                minHeight: "100vh",
                padding: "40px",
            }}
        >

            <h1>🎤 Mock Interview</h1>

            <input
                type="text"
                placeholder="Enter Role (Frontend Developer)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#444654",
                    color: "white",
                    border: "none",
                }}
            />

            <br /><br />

            <button
                onClick={startInterview}
                style={{
                    padding: "12px 20px",
                    backgroundColor: "#10A37F",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Start Interview
            </button>

            {
                loading && (
                    <p style={{ marginTop: "20px" }}>
                        🤖 Sigma GPT is thinking...
                    </p>
                )
            }

            {
                question && (

                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#444654",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >

                        <h2>Question</h2>

                        <ReactMarkdown>
                            {question}
                        </ReactMarkdown>

                    </div>

                )
            }

            {
                question && (

                    <>
                        <textarea
                            rows={6}
                            placeholder="Type your answer..."
                            value={answer}
                            onChange={(e) =>
                                setAnswer(e.target.value)
                            }
                            style={{
                                width: "100%",
                                marginTop: "20px",
                                padding: "15px",
                                borderRadius: "10px",
                                backgroundColor: "#444654",
                                color: "white",
                                border: "none",
                            }}
                        />

                        <br /><br />

                        <button
                            onClick={evaluateAnswer}
                            style={{
                                padding: "12px 20px",
                                backgroundColor: "#10A37F",
                                color: "white",
                                border: "none",
                                borderRadius: "8px",
                                cursor: "pointer",
                            }}
                        >
                            Evaluate Answer
                        </button>
                    </>
                )
            }

            {
                feedback && (

                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#444654",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >

                        <h2>Feedback</h2>

                        <ReactMarkdown>
                            {feedback}
                        </ReactMarkdown>

                    </div>

                )
            }

        </div>
    );
}

export default MockInterview;