import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {

    const navigate = useNavigate();

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSignup = async () => {

        try {

            const response =
                await axios.post(
                  "https://sigma-gpt-backend-oh77.onrender.com/api/auth/signup",
                    {
                        name,
                        email,
                        password,
                    }
                );

            alert(
                response.data.message
            );

            navigate("/");

        } 
        // catch (error) {

        //     alert(
        //         error.response?.data
        //             ?.message ||
        //             "Signup Failed"
        //     );
        // }

        catch (error) {
    console.log("FULL ERROR:", error);
    console.log("RESPONSE:", error.response);

    alert(
        error.response?.data?.message ||
        error.message ||
        "Signup Failed"
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
                        Create Your Account
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) =>
                        setName(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) =>
                        setEmail(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <button
                    onClick={handleSignup}
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
                    Create Account
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
                    Already have an
                    account?{" "}
                    <Link
                        to="/"
                        style={{
                            color:
                                "#10A37F",
                            textDecoration:
                                "none",
                            fontWeight:
                                "600",
                        }}
                    >
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
}

const inputStyle = {
    width: "100%",
    padding: "14px",
    marginBottom: "15px",
    borderRadius: "10px",
    border: "1px solid #444",
    backgroundColor: "#202123",
    color: "white",
    boxSizing: "border-box",
    fontSize: "15px",
};

export default Signup;