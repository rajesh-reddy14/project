import SwitchVideoOutlinedIcon from '@material-ui/icons/SwitchVideoOutlined';

import React, { useContext} from 'react'
import {SocketContext} from "../SocketContext"
import "./topBar.css";

function TopBar() {
    const {userName} = useContext(SocketContext);
   
  
    return (
        <div className="topBar">
                <div className="topBar__Icon">
                    <SwitchVideoOutlinedIcon fontSize="large"/>

                </div>
                <h1 className="brand">ChatVideo</h1>
              
                <h1 className="username">{userName}</h1>
        </div>
    )
}

export default TopBar
