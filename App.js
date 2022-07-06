import './App.css';
import React from "react";


import VideoPlayer from './components/VideoPlayer';
import TopBar from './components/TopBar';
import Messages from './components/Messages';
import CallOptions from './components/CallOptions';

function App() {
 
 
  return (
     
      <div className="App">
       <div className="">
        <TopBar/>
       </div>
       <div className="App__body"> 
          <div className="App_bodyVideo">
            <VideoPlayer/>
          </div>
          <div  className="sidebar">
            <div>
              <Messages className="messages"/>
            </div>
            <div>
              <CallOptions/>
            </div>
          </div>
       </div>

      </div>
    
  );
}

export default App;
