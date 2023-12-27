"use client"
import { useEffect, useState } from 'react';
import io from "socket.io-client"

let socket

export default function Home() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  useEffect(() => {
    socketInitilizer()
  }, []);

  const socketInitilizer = async ()=>{
    await fetch("/api/socket")

    socket = io()

    socket.on("receive-message", data=>{
      console.log(data)
      setAllMessage(pre => [...pre,data])
    })

    console.log("Good connection !")
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()

    socket.emit("send-message",{
      username,
      message 
    })

    setMessage("")
  }


  return (
    <div>
      <h1 className='text-3xl'>Chat app</h1>
      <p className=''>Enter a username</p>
      <input 
        className='border border-black '
        placeholder='Name...'
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />

      <br />
      <br />

      {!!username && (
        <div>

          {allMessage.map(({username,message},index)=>(
            <p key={index}>
              {username} : {message}
            </p>
          ))}

          <form onSubmit={handleSubmit}>
            <input 
              className='border border-black '
              placeholder='Message...'
              value={message} 
              name="message" 
              onChange={e=>setMessage(e.target.value)} 
            />
          </form>
        </div>
      )}

    </div>
  )
}
