import axios from "axios";

const API_URL = "https://sigma-gpt-backend-oh77.onrender.com/api/chats";

export const getChats = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            authorization: token,
        },
    });

    return response.data;
};

export const saveChat = async (title, messages) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        {
            title,
            messages,
        },
        {
            headers: {
                authorization: token,
            },
        }
    );

    return response.data;
};