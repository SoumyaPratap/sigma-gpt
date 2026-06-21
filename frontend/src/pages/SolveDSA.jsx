import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function SolveDSA() {

    const [problem, setProblem] = useState("");
    const [solution, setSolution] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSolve = async () => {

        if (!problem.trim()) {
            alert("Please enter a DSA problem.");
            return;
        }

        try {

            setLoading(true);
            setSolution("");

            const response = await axios.post(
                "http://localhost:5000/api/chat",
                {
                    message: `
You are Solve DSA mode.

Solve this problem in the following format:

1. Hint
2. Brute Force Approach
3. Optimal Approach
4. Code (Java)
5. Time Complexity
6. Space Complexity
7. Dry Run

Problem:
${problem}
                    `,
                }
            );

            setSolution(response.data.reply);

        } catch (error) {

            console.log(error);

            alert("Failed to solve problem.");

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

            <h1>🧩 Solve DSA</h1>

            <p>
                Paste your LeetCode or DSA problem.
            </p>

            <textarea
                value={problem}
                onChange={(e) =>
                    setProblem(e.target.value)
                }
                rows={10}
                placeholder="Paste problem here..."
                style={{
                    width: "100%",
                    padding: "15px",
                    borderRadius: "10px",
                    backgroundColor: "#444654",
                    color: "white",
                    border: "none",
                }}
            />

            <br />
            <br />

            <button
                onClick={handleSolve}
                style={{
                    padding: "12px 20px",
                    backgroundColor: "#10A37F",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Solve Problem
            </button>

            {
                loading && (
                    <p style={{ marginTop: "20px" }}>
                        🧠 Sigma GPT is solving...
                    </p>
                )
            }

            {
                solution && (
                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor: "#444654",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >
                        <ReactMarkdown>
                            {solution}
                        </ReactMarkdown>
                    </div>
                )
            }

        </div>
    );
}

export default SolveDSA;