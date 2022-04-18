import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import HYHGlobe from "../images/HYHGlobe.png";

export default function Dashboard() {
 const [time, setTime] = useState('');
 const [date, setDate] = useState('');

    function getTime() {
        setTimeout(() => {
            setInterval(() => {
                setTime(new Date().toLocaleTimeString())
            }, 1000)
        })
        return time
    }
    getTime()

    function getDate() {
        let currentDate = new Date();
        let newDate = currentDate.toUTCString()
        newDate = newDate.slice(0, 17)
        setDate(newDate)
    }
  
    useEffect(getDate, [])

  return (
    <main>
      <NavBar />
      <section className='dashHeader'>
        <div>
            <h1 id="dashTitle" style={{fontSize:'60px'}}>Welcome, Eloise!</h1>
            <p id='date' style={{fontSize:'20px'}}> It is {date} at {time} </p>
        </div>
        <img id="dashImg" src={HYHGlobe} width="25%" />
      </section>
    </main>
  );
}
