import ReactMarkdown from "react-markdown";
import { useState } from "react";

import { Prism as SyntaxHighlighter }
    from "react-syntax-highlighter";

import { vscDarkPlus }
    from "react-syntax-highlighter/dist/esm/styles/prism";

function ChatArea({ currentChat }) {

    const [copiedIndex, setCopiedIndex] =
        useState(null);

    const handleCopy = (
        text,
        index
    ) => {

        navigator.clipboard.writeText(
            text
        );

        setCopiedIndex(index);

        setTimeout(() => {

            setCopiedIndex(null);

        }, 2000);
    };

    return (
        <div
            style={{
                flex: 1,
                backgroundColor: "#212121",
                color: "white",
                overflowY: "auto",
                padding: "20px",
            }}
        >

            {!currentChat && (
                <div
                    style={{
                        height: "80vh",
                        display: "flex",
                        justifyContent:
                            "center",
                        alignItems:
                            "center",
                        flexDirection:
                            "column",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "34px",
                            fontWeight: "500",
                            marginBottom:
                                "10px",
                        }}
                    >
                        What's on your mind today?
                    </h1>

                    <p
                        style={{
                            color: "#999",
                            fontSize: "15px",
                        }}
                    >
                        Sigma GPT is ready to help 🚀
                    </p>
                </div>
            )}

            {currentChat?.messages.map(
                (msg, index) => (
                    <div
                        key={index}
                        style={{
                            width: "100%",
                            padding:
                                "24px 0",
                            borderBottom:
                                "1px solid #2a2a2a",
                        }}
                    >
                        <div
                            style={{
                                maxWidth:
                                    "850px",
                                margin:
                                    "0 auto",
                            }}
                        >
                            <div
                                style={{
                                    display:
                                        "flex",
                                    alignItems:
                                        "center",
                                    justifyContent:
                                        "space-between",
                                    marginBottom:
                                        "12px",
                                }}
                            >
                                <div
                                    style={{
                                        fontWeight:
                                            "600",
                                        fontSize:
                                            "15px",
                                    }}
                                >
                                    {msg.role ===
                                        "user"
                                        ? "👤 You"
                                        : "🤖 Sigma GPT"}
                                </div>

                                {msg.role ===
                                    "assistant" && (
                                        <button
                                            onClick={() =>
                                                handleCopy(
                                                    msg.content,
                                                    index
                                                )
                                            }
                                            style={{
                                                backgroundColor:
                                                    "#2f2f2f",
                                                color:
                                                    "white",
                                                border:
                                                    "1px solid #444",
                                                borderRadius:
                                                    "6px",
                                                padding:
                                                    "6px 10px",
                                                cursor:
                                                    "pointer",
                                                fontSize:
                                                    "12px",
                                            }}
                                        >
                                            {copiedIndex ===
                                                index
                                                ? "✅ Copied"
                                                : "📋 Copy"}
                                        </button>
                                    )}
                            </div>

                            <div
                                style={{
                                    lineHeight:
                                        "1.9",
                                    fontSize:
                                        "15px",
                                    color:
                                        "#ececec",
                                }}
                            >



                                <ReactMarkdown
                                    components={{
                                        code({
                                            inline,
                                            className,
                                            children,
                                            ...props
                                        }) {

                                            const match =
                                                /language-(\w+)/.exec(
                                                    className || ""
                                                );

                                            return !inline &&
                                                match ? (
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    wrapLongLines={true}
                                                    customStyle={{
                                                        borderRadius: "10px",
                                                        padding: "15px",
                                                        fontSize: "14px",
                                                        overflowX: "auto",
                                                        whiteSpace: "pre-wrap",
                                                    }}
                                                >
                                                    {String(children).replace(/\n$/, "")}
                                                </SyntaxHighlighter>
                                            ) : (
                                                <code
                                                    style={{
                                                        backgroundColor:
                                                            "#2f2f2f",
                                                        padding:
                                                            "2px 6px",
                                                        borderRadius:
                                                            "4px",
                                                    }}
                                                    {...props}
                                                >
                                                    {
                                                        children
                                                    }
                                                </code>
                                            );
                                        },
                                    }}
                                >
                                    {
                                        msg.content
                                    }
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

export default ChatArea;