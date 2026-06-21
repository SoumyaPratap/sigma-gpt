// import { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import ReactMarkdown from "react-markdown";

// function Dashboard() {

//     const [chats, setChats] = useState(() => {
//         const savedChats = localStorage.getItem("chats");
//         return savedChats ? JSON.parse(savedChats) : [];
//     });

//     const [currentChatId, setCurrentChatId] = useState(null);
//     const [input, setInput] = useState("");
//     const [isTyping, setIsTyping] = useState(false);

//     const messagesEndRef = useRef(null);

//     useEffect(() => {
//         localStorage.setItem("chats", JSON.stringify(chats));
//     }, [chats]);

//     useEffect(() => {
//         messagesEndRef.current?.scrollIntoView({
//             behavior: "smooth",
//         });
//     }, [chats, isTyping]);

//     const handleNewChat = () => {
//         const newChat = {
//             id: Date.now(),
//             title: `Chat ${chats.length + 1}`,
//             messages: [],
//         };

//         setChats((prev) => [...prev, newChat]);
//         setCurrentChatId(newChat.id);
//     };

//     const handleDeleteChat = (chatId) => {

//     const updatedChats = chats.filter(
//         (chat) => chat.id !== chatId
//     );

//     setChats(updatedChats);

//     if (currentChatId === chatId) {

//         if (updatedChats.length > 0) {
//             setCurrentChatId(updatedChats[0].id);
//         } else {
//             setCurrentChatId(null);
//         }
//     }
// };

// const handleRenameChat = (chatId) => {

//     const newTitle = prompt("Enter new chat name:");

//     if (!newTitle) return;

//     setChats((prevChats) =>
//         prevChats.map((chat) =>
//             chat.id === chatId
//                 ? {
//                       ...chat,
//                       title: newTitle,
//                   }
//                 : chat
//         )
//     );
// };

//     const currentChat = chats.find(
//         (chat) => chat.id === currentChatId
//     );

//     const handleSend = async () => {

//         if (input.trim() === "" || !currentChat) {
//             return;
//         }

//         const userMessage = {
//             role: "user",
//             content: input,
//         };

//         setChats((prevChats) =>
//             prevChats.map((chat) =>
//                 chat.id === currentChatId
//                     ? {
//                         ...chat,
//                         messages: [
//                             ...chat.messages,
//                             userMessage,
//                         ],
//                     }
//                     : chat
//             )
//         );

//         const currentInput = input;

//         setInput("");
//         setIsTyping(true);

//         try {

//             const response = await axios.post(
//                 "https://sigma-gpt-backend-oh77.onrender.com/api/chat",
//                 {
//                     message: currentInput,
//                 }
//             );

//             const sigmaMessage = {
//                 role: "assistant",
//                 content: response.data.reply,
//             };

//             setChats((prevChats) =>
//                 prevChats.map((chat) =>
//                     chat.id === currentChatId
//                         ? {
//                             ...chat,
//                             messages: [
//                                 ...chat.messages,
//                                 sigmaMessage,
//                             ],
//                         }
//                         : chat
//                 )
//             );

//         } catch (error) {

//             const errorMessage = {
//                 role: "assistant",
//                 content:
//                     "⚠️ Sigma GPT is unavailable.",
//             };

//             setChats((prevChats) =>
//                 prevChats.map((chat) =>
//                     chat.id === currentChatId
//                         ? {
//                             ...chat,
//                             messages: [
//                                 ...chat.messages,
//                                 errorMessage,
//                             ],
//                         }
//                         : chat
//                 )
//             );

//         } finally {
//             setIsTyping(false);
//         }
//     };

//     return (
//         <div
//             style={{
//                 display: "flex",
//                 height: "100vh",
//                 backgroundColor: "#343541",
//                 color: "white",
//             }}
//         >

//             {/* Sidebar */}
//             <div
//                 style={{
//                     width: "260px",
//                     backgroundColor: "#202123",
//                     padding: "20px",
//                     overflowY: "auto",
//                 }}
//             >

//                 <h2>🚀 Sigma GPT</h2>

//                 <button
//                     onClick={handleNewChat}
//                     style={{
//                         width: "100%",
//                         padding: "12px",
//                         backgroundColor: "#343541",
//                         color: "white",
//                         border: "1px solid gray",
//                         borderRadius: "8px",
//                         cursor: "pointer",
//                         marginBottom: "20px",
//                     }}
//                 >
//                     + New Chat
//                 </button>

//                 {
//                     chats.map((chat) => (

//                         <div
//                             key={chat.id}
//                             onClick={() =>
//                                 setCurrentChatId(chat.id)
//                             }
//                             style={{
//                                 padding: "12px",
//                                 marginBottom: "10px",
//                                 borderRadius: "8px",
//                                 cursor: "pointer",
//                                 backgroundColor:
//                                     currentChatId === chat.id
//                                         ? "#444654"
//                                         : "transparent",
//                             }}
//                         >
//                             <div
//     style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//     }}
// >

//     <span>
//         💬 {chat.title}
//     </span>

//     <div>

//     <button
//         onClick={(e) => {
//             e.stopPropagation();
//             handleRenameChat(chat.id);
//         }}
//         style={{
//             background: "transparent",
//             border: "none",
//             color: "white",
//             cursor: "pointer",
//             marginRight: "10px",
//         }}
//     >
//         ✏️
//     </button>

//     <button
//         onClick={(e) => {
//             e.stopPropagation();
//             handleDeleteChat(chat.id);
//         }}
//         style={{
//             background: "transparent",
//             border: "none",
//             color: "white",
//             cursor: "pointer",
//         }}
//     >
//         🗑️
//     </button>

// </div>

// </div>

// <button
//     onClick={() => {
//         window.location.href = "/solve-dsa";
//     }}
//     style={{
//         width: "100%",
//         padding: "12px",
//         marginTop: "20px",
//         backgroundColor: "#10A37F",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//     }}
// >
//     🧩 Solve DSA
// </button>

// <button
//     onClick={() => {
//         window.location.href = "/mock-interview";
//     }}
//     style={{
//         width: "100%",
//         padding: "12px",
//         marginTop: "10px",
//         backgroundColor: "#10A37F",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//     }}
// >
//     🎤 Mock Interview
// </button>


// <button
//     onClick={() => {

//         localStorage.removeItem("token");

//         window.location.href = "/";
//     }}
//     style={{
//         width: "100%",
//         padding: "12px",
//         marginTop: "20px",
//         backgroundColor: "#dc3545",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//     }}
// >
//     Logout
// </button>

// <button
//     onClick={() => {
//         window.location.href =
//             "/resume-analyzer";
//     }}
//     style={{
//         width: "100%",
//         padding: "12px",
//         marginTop: "20px",
//         backgroundColor: "#10A37F",
//         color: "white",
//         border: "none",
//         borderRadius: "8px",
//         cursor: "pointer",
//     }}
// >
//     📄 Resume Analyzer
// </button>
//                         </div>

//                     ))
//                 }

//             </div>

//             {/* Main Chat */}
//             <div
//                 style={{
//                     flex: 1,
//                     display: "flex",
//                     flexDirection: "column",
//                 }}
//             >

//                 {/* Messages */}
//                 <div
//                     style={{
//                         flex: 1,
//                         overflowY: "auto",
//                         padding: "20px",
//                     }}
//                 >

//                     {
//                         currentChat ? (

//                             currentChat.messages.map(
//                                 (msg, index) => (

//                                     <div
//                                         key={index}
//                                         style={{
//                                             display: "flex",
//                                             justifyContent:
//                                                 msg.role === "user"
//                                                     ? "flex-end"
//                                                     : "flex-start",
//                                             marginBottom: "20px",
//                                         }}
//                                     >

//                                         <div
//                                             style={{
//                                                 maxWidth: "70%",
//                                                 padding: "15px",
//                                                 borderRadius: "12px",
//                                                 backgroundColor:
//                                                     msg.role === "user"
//                                                         ? "#10A37F"
//                                                         : "#444654",
//                                             }}
//                                         >

//                                             <ReactMarkdown>
//                                                 {msg.content}
//                                             </ReactMarkdown>

//                                         </div>

//                                     </div>

//                                 )
//                             )

//                         ) : (

//                             <div
//                                 style={{
//                                     textAlign: "center",
//                                     marginTop: "100px",
//                                 }}
//                             >
//                                 <h2>
//                                     Welcome to Sigma GPT 🚀
//                                 </h2>

//                                 <p>
//                                     Start a new chat to begin.
//                                 </p>
//                             </div>

//                         )
//                     }

//                     {
//                         isTyping && (

//                             <div
//                                 style={{
//                                     color: "#ccc",
//                                     marginTop: "10px",
//                                 }}
//                             >
//                                 Sigma is typing...
//                             </div>

//                         )
//                     }

//                     <div ref={messagesEndRef}></div>

//                 </div>

//                 {/* Input */}
//                 <div
//                     style={{
//                         padding: "20px",
//                         borderTop: "1px solid #444",
//                     }}
//                 >

//                     <input
//                         type="text"
//                         placeholder="Message Sigma GPT..."
//                         value={input}
//                         onChange={(e) =>
//                             setInput(e.target.value)
//                         }
//                         onKeyDown={(e) => {
//                             if (e.key === "Enter") {
//                                 handleSend();
//                             }
//                         }}
//                         style={{
//                             width: "85%",
//                             padding: "15px",
//                             borderRadius: "10px",
//                             border: "none",
//                             outline: "none",
//                             backgroundColor: "#40414F",
//                             color: "white",
//                         }}
//                     />

//                     <button
//                         onClick={handleSend}
//                         style={{
//                             marginLeft: "10px",
//                             padding: "15px 20px",
//                             borderRadius: "10px",
//                             border: "none",
//                             backgroundColor: "#10A37F",
//                             color: "white",
//                             cursor: "pointer",
//                         }}
//                     >
//                         Send
//                     </button>

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default Dashboard;


import { useState, useEffect } from "react";
import axios from "axios";

import Sidebar from "../components/Sidebar";
import ChatArea from "../components/ChatArea";
import MessageInput from "../components/MessageInput";

function Dashboard() {

    const [chats, setChats] = useState(() => {
        const savedChats =
            localStorage.getItem("chats");

        return savedChats
            ? JSON.parse(savedChats)
            : [];
    });

    const [currentChatId, setCurrentChatId] =
    useState(() => {

        const savedCurrentChat =
            localStorage.getItem(
                "currentChatId"
            );

        return savedCurrentChat
            ? JSON.parse(
                  savedCurrentChat
              )
            : null;
    });

        const [searchTerm, setSearchTerm] =
    useState("");

    const [sidebarOpen, setSidebarOpen] =
    useState(true);

    useEffect(() => {

    localStorage.setItem(
        "currentChatId",
        JSON.stringify(
            currentChatId
        )
    );

}, [currentChatId]);

    const currentChat = chats.find(
        (chat) => chat.id === currentChatId
    );

    const saveChats = (updatedChats) => {

        setChats(updatedChats);

        localStorage.setItem(
            "chats",
            JSON.stringify(updatedChats)
        );
    };

    const handleNewChat = () => {

    const newChat = {
        id: Date.now(),
       title: "New Chat",
        messages: [],
    };

    const updatedChats = [
        ...chats,
        newChat,
    ];

    saveChats(updatedChats);

    setCurrentChatId(newChat.id);
};

const handleRenameChat = (id) => {

    const newName = prompt(
        "Enter new chat name"
    );

    if (!newName) return;

    const updatedChats = chats.map(
        (chat) =>
            chat.id === id
                ? {
                      ...chat,
                      title: newName,
                  }
                : chat
    );

    saveChats(updatedChats);
};

const handleDeleteChat = (id) => {

    const confirmDelete =
        window.confirm(
            "Delete this chat?"
        );

    if (!confirmDelete) return;

    const updatedChats =
        chats.filter(
            (chat) =>
                chat.id !== id
        );

    saveChats(updatedChats);

    if (currentChatId === id) {

    if (
        updatedChats.length > 0
    ) {

        setCurrentChatId(
            updatedChats[0].id
        );

    } else {

        setCurrentChatId(null);
    }
}
};

    const handleSend = async (
        message
    ) => {

        if (!currentChat) return;

        const userMessage = {
            role: "user",
            content: message,
        };

        const updatedChats = chats.map(
    (chat) => {

        if (
            chat.id === currentChatId
        ) {

            return {
                ...chat,

                title:
    chat.messages.length === 0
        ? message.length > 25
            ? message.substring(0, 25) + "..."
            : message
        : chat.title,

                messages: [
                    ...chat.messages,
                    userMessage,
                ],
            };
        }

        return chat;
    }
);

        saveChats(updatedChats);

        try {

            const response =
                await axios.post(
                   "https://sigma-gpt-backend-oh77.onrender.com/api/chat",
                    {
                        message,
                    }
                );

            const aiMessage = {
                role: "assistant",
                content:
                    response.data.reply,
            };

            const finalChats =
                updatedChats.map((chat) =>
                    chat.id ===
                    currentChatId
                        ? {
                              ...chat,
                              messages: [
                                  ...chat.messages,
                                  aiMessage,
                              ],
                          }
                        : chat
                );

            saveChats(finalChats);

        } catch (error) {

            console.log(error);

            const errorMessage = {
                role: "assistant",
                content:
                    "⚠️ Sigma GPT unavailable.",
            };

            const finalChats =
                updatedChats.map((chat) =>
                    chat.id ===
                    currentChatId
                        ? {
                              ...chat,
                              messages: [
                                  ...chat.messages,
                                  errorMessage,
                              ],
                          }
                        : chat
                );

            saveChats(finalChats);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                backgroundColor:
                    "#212121",
            }}
        >
           <Sidebar
    chats={chats}
    currentChatId={currentChatId}
    setCurrentChatId={setCurrentChatId}
    handleNewChat={handleNewChat}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    handleRenameChat={handleRenameChat}
    handleDeleteChat={handleDeleteChat}
    sidebarOpen={sidebarOpen}
    setSidebarOpen={setSidebarOpen}
/>
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection:
                        "column",
                }}
            >
                <ChatArea
                    currentChat={
                        currentChat
                    }
                />

                <MessageInput
                    handleSend={
                        handleSend
                    }
                />
            </div>
        </div>
    );
}

export default Dashboard;