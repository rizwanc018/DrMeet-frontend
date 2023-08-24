import { useState, useRef, useEffect } from 'react'
import { SiWorldhealthorganization } from 'react-icons/si'
import TypingIndicator from '../TypingIndicator';
import { useNavigate } from 'react-router-dom'


const Dietitian = () => {
    const navigate = useNavigate()

    const [typing, setTyping] = useState(false);
    const [userInput, setUserInput] = useState('');
    const [messages, setMessages] = useState([
        {
            message: "How can I help you today",
            sender: "ChatGPT",
        },
    ]);

    const chatMessagesRef = useRef(null);
    const scrollToLastMessage = () => {
        if (chatMessagesRef.current) {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToLastMessage();
    }, [messages]);


    const API_KEY = import.meta.env.VITE_OPENAI_API_KEY
    const systemMessage = {
        "role": "system", "content": "Explain like dietition answer only diet related questions"
    }


    const handleSend = async (e) => {
        e.preventDefault()
        if (userInput.trim() === '') {
            return;
        }

        const newMessage = {
            message: userInput,
            sender: "user",
            direction: "outgoing",
        };

        const newMessages = [...messages, newMessage]
        setMessages(newMessages)
        setUserInput('')
        setTyping(true)
        await processMessageToChatGPT(newMessages);
    }

    async function processMessageToChatGPT(chatMessages) {
        let apiMessages = chatMessages.map((messageObject) => {
            let role = "";
            if (messageObject.sender === "ChatGPT") {
                role = "assistant";
            } else {
                role = "user";
            }
            return { role: role, content: messageObject.message }
        })

        const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
                systemMessage,
                ...apiMessages
            ]
        }

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + API_KEY,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(apiRequestBody)
            });

            const data = await response.json();
            setMessages([...chatMessages, {
                message: data.choices[0].message.content,
                sender: "ChatGPT"
            }]);
            setTyping(false);
        } catch (error) {
            console.log(error)
            navigate('/dietitian')
        }
    }



    const handleChange = (e) => {
        setUserInput(e.target.value);
    };
    return (
        <div className="chat-card mt-10 mb-10 flex-grow  bg-white rounded-5 shadow-md  w-4/5 sm:max-w-lg">

            {/* <div className="chat-card mx-4 mt-10 flex-grow  bg-white rounded-5 shadow-md overflow-hidden w-full sm:max-w-lg"> */}
            <div className="chat-header p-4 bg-primary flex items-center">
                <div className='flex items-center gap-2'>
                    <SiWorldhealthorganization className='text-3xl' />
                    <span className="text-base text-black">Diet Bot</span>
                </div>
            </div>
            <div className='h-full flex flex-col justify-between'>
                <div className="chat-body flex-1 max-h-[calc(100%-80px)] overflow-y-scroll p-4" ref={chatMessagesRef} >
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.direction === 'outgoing' ? 'justify-end' : 'justify-start'}`}>
                            <div
                                className={`message max-w-[85%] mb-6 p-4  ${msg.direction === 'outgoing' ? 'bg-blue-100 rounded-bl-3xl rounded-tl-3xl rounded-tr-xl' : 'bg-green-200 rounded-br-3xl rounded-tr-3xl rounded-tl-xl'
                                    } `}
                            >
                                <p className="text-base text-gray-700">{msg.message}</p>
                            </div>
                        </div>
                    ))}
                    {typing && (
                        < TypingIndicator />
                    )}
                </div>
                <form className="chat-footer border p-4 bg-gray-200 flex flex-col sm:flex-row sticky bottom-0 left-0 w-full">
                    <input
                        className="flex-grow p-2 border-none rounded-3 mb-2 sm:mb-0 sm:mr-2"
                        type="text"
                        placeholder="Type your message"
                        value={userInput}
                        onChange={handleChange}
                    />
                    <button
                        className="p-2  rounded border-none bg-blue-500 text-white font-bold cursor-pointer transition duration-300 hover:bg-green-500"
                        onClick={(e) => handleSend(e)}
                    >
                        Send
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Dietitian;