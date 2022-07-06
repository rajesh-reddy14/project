import React, { useContext, useState } from 'react'
import { Button, TextField } from '@material-ui/core';
import { Assignment, PhoneDisabled, PhoneEnabled } from '@material-ui/icons';
import {SocketContext} from "../SocketContext"
import "./callOptions.css"
import {CopyToClipboard} from "react-copy-to-clipboard";
import CallNotification from './CallNotification';
function CallOptions() {
    const {setUserName,userName,myId,callAccepted,callEnded,callUser,incommingCall,leaveCall} = useContext(SocketContext);
    const [idToCall,setIdToCall]=useState("");
    const handleClick=(id)=>{
        if(userName==="" && id===""){
            alert("Enter Name and Id to make a call")
        }
        else if(userName===""){
             alert("Enter name to make a call")
        }else if(id==="")
        {
            alert("Enter Id to make a call")
        }else{
            callUser(id);
            setIdToCall("")
        }
        
    }

    const handleEndCall=()=>{
      leaveCall();
    }
    return (
        <div className="callOptions">
            <div className="default">
             <div className="left">
             <div className="nameAndId">
             <div className="textField">
             <TextField onChange={(e)=> setUserName(e.target.value)} label="Enter name" className="topBar__nameField" value={userName}  />
             </div>
             <div className="copyBoard">
             <CopyToClipboard text={myId} >
             
             <Button className="copyButton" variant="outlined" color="primary"  startIcon={<Assignment fontSize="large" />}>
                 <h3  className="copyText" > Copy Your ID</h3>
                </Button>
            
                
              </CopyToClipboard>
              </div>
             </div>
              <div className="toCallInfo">
             <TextField onChange={(e)=> setIdToCall(e.target.value)} label="Enter ID of the receiver" fullWidth className="topBar__nameField" value={idToCall} />
        
             </div>
              </div>
          
               <div className="bigButton">
               {!callAccepted && callEnded && (<Button  variant="contained" className="button" color="primary" onClick={()=>handleClick(idToCall)} startIcon={<PhoneEnabled fontSize="large"/>} >Call</Button>)}
               {callAccepted && callEnded && (<Button  variant="contained" className="button" color="secondary" onClick={handleEndCall} startIcon={<PhoneDisabled fontSize="large"/>} >Hang up</Button>)}
               </div>
               
        </div>
            {incommingCall && !callAccepted && (<CallNotification/>)}
            
        </div>
        
    )
}

export default CallOptions
