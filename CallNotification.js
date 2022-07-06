import React, { useContext } from 'react'
import {SocketContext} from "../SocketContext";
import { Button } from '@material-ui/core'
import "./callNotifi.css"
function CallNotification() {
    const {call,answerCall,userName} =  useContext (SocketContext);
    const handleAnswer = ()=>{
      if(userName===""){
        alert('Enter your name before accepting the call!');
      }else{
        answerCall();
      }
    }
    return (
        <div className="notification">
        <div className="name">
           <h2>Call From {call.name}</h2>
        </div>
        <div className="button">
          <Button variant="outlined" className="setW" color="primary" onClick={handleAnswer}>Answer the call</Button>
        </div>
            
        </div>
    )
}

export default CallNotification
