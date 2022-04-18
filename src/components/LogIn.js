import React, { useState } from "react";
import Userfront from "@userfront/react";
import HYHMain from "../images/HYHMain.jpg";
import "../stylesheets/login.css";



Userfront.init("5nxgy66b");

const LoginForm = Userfront.build({
  toolId: "rlbdod"
});

export default function LogIn() {

const LoginForm = Userfront.build({
  toolId: "rlbdod"
});
  return (
    <main className="loginMain">
      <section className="loginLeft">
        <div className="loginTitle">
          <h1 style={{fontSize:'90px'}}>Hearts You Hold</h1>
          <h3 style={{fontSize:'60px', textAlign:'center'}}>Admin Portal</h3>
        </div>
        <div>
          <img src={HYHMain} height="100%" width="100%"></img>
        </div>
      </section>
      <div className="loginFormContainer">
        {/* Log In Form */}
        <LoginForm />
      </div>
    </main>
  );
}

//Authorization: `Bearer ${Userfront.tokens.accessToken}`,