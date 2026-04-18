import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { loginPageStyles } from "../styles/loginPage.styles";

export const LoginPage = () => {
  const navigate = useNavigate();
  const { signIn, loading } = useAuth();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 🔥 evita recarga

    if (!userName || !password) return;

    const success = await signIn(userName, password);

    if (success) {
      navigate("/dashboard");
    }
  };

  return (
    <div style={loginPageStyles.container}>
      <form style={loginPageStyles.card} onSubmit={handleLogin}>
        <h2>Login 📚</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          style={loginPageStyles.input}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={loginPageStyles.input}
        />

        <button
          type="submit" // 🔥 importante
          disabled={loading}
          style={loginPageStyles.button}
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
};
