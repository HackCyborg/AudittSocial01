login: async (email: string, password: string): Promise<User> => {
  // Define hardcoded credentials
  const adminEmail = "admin@example.com";
  const adminPassword = "Admin@123"; // Set a fixed password

  const userEmail = "user@example.com";
  const userPassword = "User@123"; // Example user password

  // Check credentials
  if (
    (email === adminEmail && password === adminPassword) ||
    (email === userEmail && password === userPassword)
  ) {
    const user: User = {
      id: "user-001",
      email: email,
      isAdmin: email === adminEmail, // Only admin@example.com is marked as admin
    };

    localStorage.setItem("user", JSON.stringify(user));
    window.location.href = "/"; // Redirect to home page
    return user;
  }

  throw new Error("Invalid credentials");
}
