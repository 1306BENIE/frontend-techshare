import type { RegisterFormValues, LoginFormValues } from "@/interfaces/auth";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function register(data: RegisterFormValues) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de l’inscription");
  }
  return response.json();
}

export async function login(data: LoginFormValues) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Erreur lors de la connexion");
  }
  return response.json();
}

export function logout() {
  // Pour un backend JWT classique, il suffit de supprimer le token côté client
  localStorage.removeItem("token");
}
