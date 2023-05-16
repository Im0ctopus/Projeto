import React, { useEffect, useState } from "react";
import CheckButton from "react-validation/build/button";
import AuthService from "../auth.service";
import { useNavigate } from "react-router-dom";
const required = (value) => {
if (!value) {
return (
<div className="alert alert-danger" role="alert">
Este campo é de preenchimento obrigatório!
</div>
);
}
};
export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);
    const [message, setmessage] = useState("");
    const navigate = useNavigate();
    async function HandleLogin(event) {
        event.preventDefault();
        setmessage("");
        setloading(true);
        AuthService.login(email, password)
    .then((res) => {
    if (res === "" || res === false) {
    setmessage("Autenticação falhou.");
    setloading(false);
    }
    else {
    navigate("/");
    }
    })
    .catch((error) => {
    setmessage("Autenticação falhou.");
    setloading(false);
    });
    }
    return (
        <div className="col-md-4">
        <div className="card card-container">
        <img
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        alt="profile-img"
        className="profile-img-card"
        />
        <form onSubmit={HandleLogin}>
        <div className="form-group">
        <label htmlFor="username">Email</label>
        <input
        type="email"
        className="form-control"
        name="username"
        value={email}
        onChange={(value) => setemail(value.target.value)}
        />
        </div>
        <div className="form-group">
<label htmlFor="password">Password</label>
<input
type="password"
className="form-control"
name="password"
value={password}
onChange={(value) => setpassword(value.target.value)}
/>
</div>
<div className="form-group">
<button className="btn btn-primary btn-block">
<span>Login</span>
</button>
</div>
{message && (
<div className="form-group">
<div className="alert alert-danger" role="alert">
{message}
</div>
</div>
)}
</form>
</div>
</div>
);
}


