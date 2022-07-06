import React, { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import "./videoPlayer.css"
function VideoPlayer() {
    const {Video,callerVideo,callAccepted,callEnded,call}=useContext(SocketContext);
    return (
        
        <div className="videoplayer">
           
           {callAccepted && callEnded && 
                (
                    <div className="videoplayer__callerVideo">
                    <video playsInline ref={callerVideo} autoPlay className="videoplayer__callerVideo__video">
                       
                    </video>
                    <h3 className="text">{call.name? call.name : "caller"}</h3>
                    </div>
                )
            }

            <div className="videoplayer__myVideo">
                <video playsInline muted ref={Video} autoPlay className="videoplayer__myVideo__video">
                    
                </video>
                
            </div>

           
           
        </div>
    )
    
}

export default VideoPlayer
