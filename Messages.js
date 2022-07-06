import React, { useContext, useEffect, useState } from 'react'
import "./messges.css"
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import { IconButton, Input } from '@material-ui/core';
import { Send } from '@material-ui/icons';
import {SocketContext} from "../SocketContext"


function Messages() {
  const {sendMessage,setMessages,messages,myId,callAccepted}=useContext(SocketContext);
  const [message,setMessage]=useState("");
  const handleClick=()=>{
    if(!callAccepted){
      alert('Connect to a call to have a text chat')
    }else{
      if(message!==""){
        sendMessage(message);
      setMessages((prev)=>{
        return(
          [...prev,{id:myId,text:message}]
        )
      })
      setMessage('');
      
      
      
      }
    }
    
  }

  useEffect(()=>{
    var myDiv = document.getElementById("myDiv");
    myDiv.scrollTop = myDiv.scrollHeight;
  },[messages])
    return (
        <div onKeyDown={(e)=>{return(e.key==='Enter'? handleClick() : null)} }>
            <div className="messages">
              <div className="heading">
              
              {callAccepted?<FiberManualRecordIcon className="iconOnline"/>:<FiberManualRecordIcon className="iconOfline"/>}
             <h2> Chat</h2>

              </div>
              <div className="chatLog">
              
              <div className="messageLog" id="myDiv">
                  
                   {messages.map((msg,i)=>
                      <p key={i} className={msg.id===myId?"myMessage":"receivedMessage"}>{msg.text}</p>
                    )}
                  
                </div>
            
               
                <div className="inp_Chat">
                   <div className="inputField">
                   <Input  onChange={(e)=>setMessage(e.target.value)} placeholder="Enter Message to send" fullWidth value={message}/>
                   </div>
                   <div className="sendButton">
                     <IconButton onClick={handleClick}  >
                     
                     <Send />
                     </IconButton>
                   </div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default Messages;
