import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../store/chatSlice';
import { useNavigate } from 'react-router-dom';

function Chat() {
  const [message, setMessage] = useState('');
  const { userInfo } = useSelector(state => state.auth);
  const { users } = useSelector(state => state.user);
  const { currentRoomId, rooms } = useSelector(state => state.chat);
  const selectedRoom = rooms?.length && rooms.find(i => i.roomId === currentRoomId);
  const messages = selectedRoom?.messages;
  const otherUserId = selectedRoom?.users?.length && selectedRoom?.users.find(i => i !== userInfo?.id);
  const otherUsername = users?.length && users?.find(i => i?.id === otherUserId)?.name;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  let limit = 25;
  const [messageCount, setMessageCount] = useState(limit);
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userInfo?.id) {
      navigate('/');
    }
  }, [userInfo]);

  useEffect(() => {
    if (messages?.length && messages?.length > messageCount) {
      setVisibleMessages(messages?.slice(messages.length - messageCount))
    } else {
      setVisibleMessages(messages)
    }
  }, [messages, messageCount]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, [visibleMessages]);

  const handleScroll = () => {
    const element = chatContainerRef.current;
    if (element.scrollTop === 0 && !isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setMessageCount(prev => prev + limit);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() !== '') {
      dispatch(sendMessage({ roomId: currentRoomId, userId: userInfo?.id, message }));
      setMessage('');
    }
  };

  return (
    <div className='h-screen w-full relative'>
      <div className='w-full absolute top-0 bg-purple-600 p-1 flex items-center justify-center'>
        <button className='bg-white absolute left-2 font-semibold rounded-full px-4 text-sm' onClick={() => navigate('/rooms')}>back</button>

        <h1 className='text-lg text-white font-bold'>{otherUsername}</h1>
      </div>
      <div
        ref={chatContainerRef} onScroll={handleScroll}
        className='w-full h-[90vh] overflow-y-scroll bg-slate-50 p-2 pt-10'
      >
        {isLoading && (
          <div className="absolute top-12 z-50 left-0 w-full h-fit flex items-center justify-center">
            <p className="text-black">Loading...</p>
          </div>
        )}
        <div className='w-full h-[90.2vh] flex flex-col gap-1'>
          {visibleMessages?.length > 0 && visibleMessages.map((i, index) => {
            let user = users?.length && users.find(j => j.id === i?.userId);
            let userShortName = user?.name && user?.name.substring(0, 2).toUpperCase();
            let isMe = user?.id === userInfo?.id;
            return (
              <div key={i?.message + index} className={`w-full flex ${isMe && 'justify-end'}`}>
                <div className={`w-fit flex items-center gap-1 ${isMe && 'flex-row-reverse'}`}>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isMe ? 'bg-slate-300' : 'bg-purple-600 text-white'}`}>{userShortName}</div>
                  <div className={`p-2 ${isMe ? 'bg-slate-300 rounded-tl-lg rounded-br-lg' : 'bg-purple-600 text-white rounded-tr-lg rounded-bl-lg'}`}>
                    <p>{i?.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className='w-full h-[10vh] bg-purple-600 flex items-center justify-between px-2 gap-2'>
        <input
          type="text" 
          id="message" 
          value={message} 
          onChange={handleMessageChange} 
          placeholder="Your message"
          className='p-2 rounded-lg flex-1 outline-none'
        />
        <button type='submit' className='w-fit bg-white py-2 px-4 font-semibold rounded-lg'>send</button>
      </form>
    </div>
  );
}

export default Chat;
