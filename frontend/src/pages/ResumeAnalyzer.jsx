import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {

        if (!file) {
            alert("Please select a PDF resume.");
            return;
        }

        const formData = new FormData();

        formData.append("resume", file);

        try {

            setLoading(true);
            setAnalysis("");

            const response = await axios.post(
                "http://localhost:5000/api/resume/analyze",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

            setAnalysis(
                response.data.analysis
            );

        } catch (error) {

            console.log(error);

            alert(
                "Resume analysis failed."
            );

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

            <h1>
                📄 Resume Analyzer
            </h1>

            <p>
                Upload your resume and let
                Sigma GPT analyze it.
            </p>

            <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                    setFile(
                        e.target.files[0]
                    )
                }
                style={{
                    marginTop: "20px",
                }}
            />

            <br />
            <br />

            <button
                onClick={handleAnalyze}
                style={{
                    padding: "12px 20px",
                    backgroundColor: "#10A37F",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                }}
            >
                Analyze Resume
            </button>

            {
                loading && (

                    <p
                        style={{
                            marginTop: "20px",
                        }}
                    >
                        🔍 Sigma GPT is analyzing
                        your resume...
                    </p>

                )
            }

            {
                analysis && (

                    <div
                        style={{
                            marginTop: "30px",
                            backgroundColor:
                                "#444654",
                            padding: "20px",
                            borderRadius: "10px",
                        }}
                    >

                        <h2>
                            Analysis Result
                        </h2>

                        <ReactMarkdown>
                            {analysis}
                        </ReactMarkdown>

                    </div>

                )
            }

        </div>
    );
}

export default ResumeAnalyzer;