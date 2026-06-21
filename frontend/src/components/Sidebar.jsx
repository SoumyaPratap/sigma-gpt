import { useNavigate } from "react-router-dom";

function Sidebar({
    chats,
    currentChatId,
    setCurrentChatId,
    handleNewChat,
    searchTerm,
    setSearchTerm,
    handleRenameChat,
    handleDeleteChat,
    sidebarOpen,
    setSidebarOpen,
})
{

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const userName =
        user?.name || "User";

    const filteredChats = chats.filter(
        (chat) =>
            chat.title
                .toLowerCase()
                .includes(
                    searchTerm.toLowerCase()
                )
    );

    return (
        <div
            style={{
                width: "240px",
                backgroundColor: "#171717",
                color: "white",
                display: "flex",
                flexDirection: "column",
                padding: "12px",
                borderRight: "1px solid #2f2f2f",
            }}
        >

            {/* <button
    onClick={() =>
        setSidebarOpen(
            !sidebarOpen
        )
    }
    style={{
        background: "none",
        border: "none",
        color: "white",
        cursor: "pointer",
        fontSize: "20px",
        marginBottom: "15px",
    }}
>
    ☰
</button> */}

            {/* Logo */}
            <h2
                style={{
                    fontSize: "18px",
                    fontWeight: "600",
                    marginBottom: "15px",
                }}
            >
                 {sidebarOpen
    ? "🚀 Sigma GPT"
    : "🚀"}
            </h2>

            {/* New Chat */}
            {sidebarOpen && (
    <button
        onClick={handleNewChat}
        style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #444",
            backgroundColor: "#202123",
            color: "white",
            cursor: "pointer",
            marginBottom: "15px",
            fontSize: "14px",
        }}
    >
        + New Chat
    </button>
)}

            {/* Search */}
            <input
                value={searchTerm}
                onChange={(e) =>
                    setSearchTerm(
                        e.target.value
                    )
                }
                placeholder="🔍 Search Chats"
                style={{
                    padding: "10px",
                    fontSize: "14px",
                    borderRadius: "10px",
                    border: "none",
                    marginBottom: "15px",
                    backgroundColor: "#2a2b32",
                    color: "white",
                    outline: "none",
                }}
            />

            {/* Tools */}
            <h4
                style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "10px",
                    letterSpacing: "1px",
                }}
            >
                TOOLS
            </h4>

            <button
                onClick={() =>
                    navigate("/resume-analyzer")
                }
                style={buttonStyle}
            >
                📄 Resume Analyzer
            </button>

            <button
                onClick={() =>
                    navigate("/solve-dsa")
                }
                style={buttonStyle}
            >
                🧩 Solve DSA
            </button>

            <button
                onClick={() =>
                    navigate("/mock-interview")
                }
                style={buttonStyle}
            >
                🎤 Mock Interview
            </button>

            <hr
    style={{
        border: "1px solid #2f2f2f",
        marginTop: "10px",
        marginBottom: "10px",
    }}
/>

            {/* Recent Chats */}
            <h4
                style={{
                    fontSize: "12px",
                    color: "#888",
                    marginBottom: "10px",
                    letterSpacing: "1px",
                }}
            >
                RECENT CHATS
            </h4>

            <div
    style={{
        flex: 1,
        overflowY: "auto",
    }}
>
                {filteredChats.map((chat) => (
                    <div
                        key={chat.id}
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                            padding: "10px",
                            borderRadius: "8px",
                            marginBottom: "5px",
                            backgroundColor:
                                currentChatId ===
                                chat.id
                                    ? "#2a2b32"
                                    : "transparent",
                        }}
                    >
                        <span
    onClick={() =>
        setCurrentChatId(chat.id)
    }
    style={{
        cursor: "pointer",
        fontSize: "14px",
        flex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
    }}
>
                            💬 {chat.title}
                        </span>

                        <div>
                            <span
                                onClick={() =>
                                    handleRenameChat(
                                        chat.id
                                    )
                                }
                                style={{
                                    cursor: "pointer",
                                    marginRight:
                                        "8px",
                                }}
                            >
                                ✏️
                            </span>

                            <span
                                onClick={() =>
                                    handleDeleteChat(
                                        chat.id
                                    )
                                }
                                style={{
                                    cursor: "pointer",
                                }}
                            >
                                🗑️
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Profile */}
            <div
                style={{
                    borderTop:
                        "1px solid #2f2f2f",
                    paddingTop: "12px",
                    marginTop: "10px",
                }}
            >
                <div
                    style={{
                        fontSize: "13px",
                        color: "#ddd",
                        marginBottom: "10px",
                    }}
                >
                    👤 {userName}
                </div>

                <button
                    onClick={() => {

                        localStorage.removeItem(
                            "token"
                        );

                        localStorage.removeItem(
                            "user"
                        );

                        navigate("/");
                    }}
                    style={{
                        width: "100%",
                        backgroundColor:
                            "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "10px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                    }}
                >
                    Logout
                </button>
            </div>

        </div>
    );
}

const buttonStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "8px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#10A37F",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
};

export default Sidebar;