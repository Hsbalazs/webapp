import { useEffect, useState } from "react";
import api from "../api";

interface User {
  id: number;
  username: string;
  email: string;
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (err) {
        setError("Nem sikerült lekérni a felhasználókat. Lehet, hogy nincs JWT token.");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Felhasználók</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul>
        {users.map((u) => (
          <li key={u.id}>
            <strong>{u.username}</strong> – {u.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
