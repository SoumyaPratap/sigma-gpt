import { useState } from "react";

function MessageInput({ handleSend }) {
    const [message, setMessage] = useState("");

    const send = () => {
        if (!message.trim()) return;

        handleSend(message);
        setMessage("");
    };

    return (
        <div
            style={{
                backgroundColor: "#212121",
                padding: "20px",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <div
                style={{
                    width: "100%",
                    maxWidth: "900px",
                    display: "flex",
                    alignItems: "center",
                    backgroundColor: "#2f2f2f",
                    borderRadius: "30px",
                    padding: "8px",
                }}
            >
                <input
                    value={message}
                    onChange={(e) =>
                        setMessage(e.target.value)
                    }
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            send();
                        }
                    }}
                    placeholder="Ask anything..."
                    style={{
                        flex: 1,
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "white",
                        fontSize: "16px",
                        padding: "12px",
                    }}
                />

                <button
                    onClick={send}
                    style={{
                        width: "42px",
                        height: "42px",
                        borderRadius: "50%",
                        border: "none",
                        backgroundColor: "#10A37F",
                        color: "white",
                        cursor: "pointer",
                        fontSize: "18px",
                    }}
                >
                    ↑
                </button>
            </div>
        </div>
    );
}

export default MessageInput;