import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] =
        useState("");

    const handleLogin = async () => {

        try {

            const response =
                await axios.post(
                   "https://sigma-gpt-backend-oh77.onrender.com/api/auth/login",
                    {
                        email,
                        password,
                    }
                );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(
                    response.data.user
                )
            );

            navigate("/dashboard");

        } catch (error) {

            alert(
                error.response?.data
                    ?.message ||
                    "Login Failed"
            );
        }
    };

    return (
        <div
            style={{
                height: "100vh",
                backgroundColor:
                    "#212121",
                display: "flex",
                justifyContent:
                    "center",
                alignItems: "center",
            }}
        >
            <div
                style={{
                    width: "380px",
                    backgroundColor:
                        "#171717",
                    padding: "40px",
                    borderRadius: "20px",
                    border:
                        "1px solid #333",
                    boxShadow:
                        "0 0 30px rgba(0,0,0,0.4)",
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "35px",
                    }}
                >
                    <div
                        style={{
                            fontSize: "55px",
                            marginBottom: "10px",
                        }}
                    >
                        🚀
                    </div>

                    <h1
                        style={{
                            color: "white",
                            margin: 0,
                            fontSize: "42px",
                            fontWeight: "700",
                        }}
                    >
                        Sigma GPT
                    </h1>

                    <p
                        style={{
                            color: "#999",
                            marginTop: "10px",
                            marginBottom: 0,
                            fontSize: "16px",
                        }}
                    >
                        Welcome Back
                    </p>
                </div>

                <input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginBottom:
                            "15px",
                        borderRadius:
                            "10px",
                        border:
                            "1px solid #444",
                        backgroundColor:
                            "#202123",
                        color: "white",
                        boxSizing:
                            "border-box",
                        fontSize: "15px",
                    }}
                />

                <input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "14px",
                        marginBottom:
                            "20px",
                        borderRadius:
                            "10px",
                        border:
                            "1px solid #444",
                        backgroundColor:
                            "#202123",
                        color: "white",
                        boxSizing:
                            "border-box",
                        fontSize: "15px",
                    }}
                />

                <button
                    onClick={handleLogin}
                    style={{
                        width: "100%",
                        padding: "14px",
                        border: "none",
                        borderRadius:
                            "10px",
                        backgroundColor:
                            "#10A37F",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Login
                </button>

                <p
                    style={{
                        color: "#999",
                        textAlign:
                            "center",
                        marginTop:
                            "22px",
                        fontSize: "15px",
                    }}
                >
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        style={{
                            color:
                                "#10A37F",
                            textDecoration:
                                "none",
                            fontWeight:
                                "600",
                        }}
                    >
                        Signup
                    </Link>
                </p>

            </div>
        </div>
    );
}

export default Login;