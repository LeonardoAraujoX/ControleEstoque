import React from "react";
import { useNavigate } from "react-router-dom";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  return (
    <div id="reset-password-container">
        <form id="reset-password-form">
            <h2>Redefinir Senha</h2>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input type="text" id="email" name="email" required />
            </div>
            <button type="submit">Enviar Instruções</button>
            <button onClick={() => navigate("/loginpage")}>Cancelar</button>
        </form>
    </div>
  );
};

export default ResetPasswordPage;