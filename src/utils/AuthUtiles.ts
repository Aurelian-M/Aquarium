

  import { type RealUser } from "../context/types";

export async function registerUser(newUser: { username: string; password: string; isAdmin: boolean }): Promise<RealUser | null> {
    console.log("🟢 Frontend is sending:", newUser);
   
  try {
    const response = await fetch("http://localhost:3001/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) return null;
 console.log("Backend responded with", response.status);
    const data = await response.json();
    return {
      id: data.id,
      username: data.username,
      role: data.isAdmin ? "admin" : "user",
    };
  } catch (err) {
    console.error("Registration error:", err);
    return null;
  }
}

export async function loginUser(username: string, password: string): Promise<{ user: RealUser; token: string } | null> {
  try {
    const response = await fetch("http://localhost:3001/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) return null;

    const data = await response.json();
    const user: RealUser = {
      id: data.user.id,
      username: data.user.username,
      role: data.user.isAdmin ? "admin" : "user",
    };

    return { user, token: data.token };
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}
