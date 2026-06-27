import { logout } from "../auth";

export default function LogoutButton() {
  return (
    <button onClick={logout}>
      Kilépés
    </button>
  );
}
