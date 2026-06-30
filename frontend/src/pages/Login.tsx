import { useState } from "react";
import api from "../api";

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/login",
        { username, password },
        { withCredentials: true } // refresh cookie miatt kötelező
      );

      // Backend: { accessToken: "...", refreshTokenCookieSet: true }
      const accessToken = response.data.accessToken;

      localStorage.setItem("token", accessToken);

      setError("");
      alert("Sikeres bejelentkezés!");
    } catch (err) {
      setError("Hibás felhasználónév vagy jelszó");
    }
  };

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Bejelentkezés</h2>

      <input
        type="text"
        placeholder="Felhasználónév"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Jelszó"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Belépés</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
