import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewUser } from '../store/userSlice';
import { setUserInfo } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const Login = () => {
  const { users } = useSelector(state => state.user);

  const [username, setUsername] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSetUsername = (e) => {
    e.preventDefault();
    if (username.trim() !== '') {
      const id = uuidv4();
      const name = username.trim();
      const user = users?.length && users.find(i => i?.name === name);
      if(!user) {
        dispatch(addNewUser({ id, name }));
        dispatch(setUserInfo({ id, name }))
        setUsername('');
        navigate('/rooms')
      } else {
        dispatch(setUserInfo(user))
        setUsername('');
        navigate('/rooms')
      }
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-purple-500 to-purple-300 flex items-center justify-center'>
        <form onSubmit={handleSetUsername} className='w-[90%] mx-auto h-fit rounded-lg shadow-lg bg-white flex flex-col gap-2 p-2'>
          <label htmlFor="username" className='font-medium text-lg'>Enter your username</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={handleUsernameChange} 
            placeholder="Your username"
            className='border border-slate-600 outline-none py-2 px-4 rounded'
          />
          <button type='submit' disabled={!username.trim()} className='border border-slate-600 py-1 px-3 rounded w-fit mx-auto mt-2 disabled:cursor-not-allowed hover:bg-purple-300  duration-300 font-semibold'>Submit</button>
        </form>
    </div>
  )
}

export default Login