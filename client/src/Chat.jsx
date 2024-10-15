import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, username, room }) => {
    const [crtm, setCrtm] = useState('');
    const [messages, setMessages] = useState([]);
    const sendMessage = async () => {
        if (crtm !== '') {
            const msgData = {
                room: room,
                author: username,
                message: crtm,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }
            await socket.emit('send_message', msgData);
            setMessages((list) => [...list, msgData])
            setCrtm('');
        }
    }
    useEffect(() => {
        socket.on("receive_message", (data) => {
            setMessages((list) => [...list, data])
            console.log(data);
        });

    }, [socket]);
    return (
        <div className='chat-window'>
            <div className="chat-header">
                <p>Live Chat</p>
            </div>
            <div className="chat-body">
                <ScrollToBottom className='message-container'>
                    {messages.map((message, i) => {
                        return (
                            <div key={i} className="message" id={username === message.author ? "you" : "other"}>
                                {" "}
                                <div>
                                    <div className='message-content'>
                                        <p>{message.message}</p>
                                    </div>
                                    <div className='message-meta'>
                                        <p id='time'>{message.time}</p>
                                        <p id='author'>{message.author}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </ScrollToBottom>

            </div>
            <div className="chat-footer">
                <input type="text" placeholder='Heyy...'
                    value={crtm}
                    onChange={e => setCrtm(e.target.value)}
                    onKeyDown={(e) => { e.key === "Enter" && sendMessage() }} />
                <button onClick={sendMessage}>&#9658; </button>
            </div>
        </div>
    )
}

export default Chat