import React, {useState} from "react";
import Dashboard from "./Dashboard";
import '../stylesheets/loading.css'

export default function Loading() {
    const [timer, setTimer] = useState(false)


    setTimeout(() => {
        setTimer(true)}, 1000)
    
        if (!timer){
            return (
                <div id="loading-wrapper">
                <div id="loading-text">LOADING</div>
                <div id="loading-content"></div>
              </div>
            )
        }else {
            return window.location.href="/dashboard"
        }
}
