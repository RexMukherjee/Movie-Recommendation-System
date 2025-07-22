const user = {
  name: "User Example",
  email: "demo@example.com",
  phone: "9999999999",
  password: "password123",
};

const userLogin = (req, res) => {
  const { email, password } = req.body;

  if (email === user.email && password === user.password) {
    
    return res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  }
};

module.exports = { userLogin };