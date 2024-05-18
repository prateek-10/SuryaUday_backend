const authService = require("../services/login");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const token = await authService.login(email, password);
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(401).json({ message: "Invalid Credentials" });
  }
}

async function refreshToken(req, res) {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const newToken = await authService.refreshToken(token);
    res.json({ newToken });
  } catch (error) {
    console.error("Refresh token error:", error.message);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = {
  login,
  refreshToken,
};
