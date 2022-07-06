import React, { createContext, useRef, useState, useEffect } from "react";
import {io} from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext();

const socket = io("https://chat-video-app.herokuapp.com/");

const ContextProvider = ({children})=>{
  
    const callerVideo = useRef();
    const connectionRef = useRef();
    const [incommingCall,setIncomming]=useState(false);
    const [myId,setMyId] = useState('');
    const [stream,setStream]=useState();
    const [userName,setUserName]=useState('');
    const [callEnded,setCallEnded]=useState(true);
    const [call,setCall]=useState({});
    const [callAccepted,setCallAccepted]=useState(false);
    const Video=useRef();
    const [messages,setMessages]=useState([]);
    const [targetId,setTargetId]=useState("");
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video:true , audio: true })
        .then((currentStream) => {
          setStream(currentStream);
          
          Video.current.srcObject = currentStream;
          
      })
      .catch((err)=>{
          console.log(err);
      });
       
       socket.on('successfulConnection',(id)=>{
        setMyId(socket.id);
       });
      
       socket.on('incommingCall',({from,signal,callerName})=>{
           
           setCall({from:from,signal:signal,name:callerName});
           
           setIncomming(true);
       });
       socket.on('incommingMessage',(msg)=>{
        setMessages((messages)=>{
            return (
                [...messages,msg]
            )
        })
    })

    socket.on('callEnded',()=>{
        alert('Call Ended');
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
    
    })

   
    },[]);

   

   
   
    const answerCall =() =>{
        setCallAccepted(true);
        setIncomming(false);
        const peer =new Peer({initiator:false,trickle:false,stream:stream})
        peer.on('signal',(data)=>{
            socket.emit('callAnswered',({signal:data,to:call.from,name:userName}));

        });
        setTargetId(call.from);
        peer.on('stream',(callerStream)=>{
            callerVideo.current.srcObject=callerStream;
        });
        peer.signal(call.signal);

        connectionRef.current = peer;
    };

    const callUser = (id) =>{
        setTargetId(id);
        const peer =new Peer({initiator:true,trickle:false,stream:stream});
        peer.on('signal',(data)=>{
            socket.emit('callUser',({idToCall:id,signalData:data,from:myId,myName:userName}))
        });
        peer.on('stream',(userStream)=>{
            callerVideo.current.srcObject=userStream;
        });


        socket.on('callAccepted',(signal)=>{
            setCallAccepted(true);
            peer.signal(signal.signal);
            setCall({name:signal.name})
        });
        connectionRef.current = peer;
    }

    const sendMessage=(message)=>{
        const msgObj={
            id:myId,
            text:message,
            to:targetId
        }

        socket.emit('sendMessage',(msgObj));

    }

    
    const leaveCall=()=>{
       
       socket.emit('endCall',(targetId));
        
        setCallEnded(true);
        connectionRef.current.destroy();
        window.location.reload();
       

    }
   




    return (
        <SocketContext.Provider value={{
                call,
                userName,
                callAccepted,
                Video,
                callEnded,
                setCallEnded,
                myId,
                incommingCall,
                callerVideo,
                setUserName,
                answerCall,
                callUser,
                sendMessage,
                setMessages,
                messages,
                leaveCall
                
    
            }
        }>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider,SocketContext}

