import { create } from "zustand";

interface AuthState {
  user: { username: string; isAdmin: boolean } | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (username, password, rememberMe) => {
    // Fake authentication logic
    if (username) {
      const isAdmin = username === "admin@example.com"; // Set admin status based on username

      const user = { username, isAdmin };
      localStorage.setItem("user", JSON.stringify(user)); // Store in localStorage if "remember me" is checked

      set({ user });
      return { success: true };
    }
    
    return { success: false, error: "Invalid credentials" };
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));
