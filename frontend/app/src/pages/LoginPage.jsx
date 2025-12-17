import React, { use } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
    const navigate = useNavigate();
    
  return (

      <div id ="login-container">
        <form id="login-form">
            <h2>Login</h2>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required />
            </div>
            <div className="input-group">
                <label htmlFor="password">Senha:</label>
                <input type="password" id="password" name="password" required />
            </div>
            <div className="forgot-password">
                <a href="/reset-password">Esqueceu senha</a>
            </div>
            // Colocar a rota para a home
            <button onClick={() => navigate("/")} type="submit">Entrar</button>
        </form>
      </div>

  );
};

export default LoginPage;