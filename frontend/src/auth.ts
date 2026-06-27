import api from "./api";

export async function logout() {
  try {
    await api.post("/auth/logout", {}, { withCredentials: true });
  } catch (_) {
    // ha a backend már "nem ismeri" a refresh tokent, akkor is mehet tovább
  }

  localStorage.removeItem("token");
  window.location.href = "/";
}
