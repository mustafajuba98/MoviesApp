import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

// MUI Imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function Loginform() {
  const [userInfo, setUserInfo] = useState({
    email: "", // Initialize with empty strings
    password: "",
  });

  const [errors, setErrors] = useState({
    errEmail: null,
    errPass: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  // const navigate = useNavigate(); // إذا كنت تريد التوجيه برمجياً بعد تسجيل الدخول

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // Validate on change
    if (name === "email") {
      setErrors({
        ...errors,
        errEmail:
          value.length === 0
            ? "Email is required"
            : !emailRegex.test(value)
            ? "Please enter a valid email address"
            : null,
      });
    } else if (name === "password") {
      setErrors({
        ...errors,
        errPass:
          value.length === 0
            ? "Password is required"
            : value.length < 8
            ? "Password must be at least 8 characters long"
            : null,
      });
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault(); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError =
      userInfo.email.length === 0
        ? "Email is required"
        : !emailRegex.test(userInfo.email)
        ? "Please enter a valid email address"
        : null;
    const passError =
      userInfo.password.length === 0
        ? "Password is required"
        : userInfo.password.length < 8
        ? "Password must be at least 8 characters long"
        : null;

    setErrors({ errEmail: emailError, errPass: passError });

    if (!emailError && !passError) {
      console.log("Login submitted:", userInfo);
      alert("Login attempt (check console)");
    } else {
      console.log("Form has errors");
    }
  };

  const isFormValid =
    !errors.errEmail && !errors.errPass && userInfo.email && userInfo.password;

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal" 
            required
            fullWidth 
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus 
            value={userInfo.email}
            onChange={handleInputChange}
            error={!!errors.errEmail} 
            helperText={errors.errEmail} 
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            value={userInfo.password}
            onChange={handleInputChange}
            error={!!errors.errPass}
            helperText={errors.errPass}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained" 
            sx={{ mt: 3, mb: 2 }} 
            disabled={!isFormValid} 
          >
            Login
          </Button>

        </Box>
      </Box>
    </Container>
  );
}

export default Loginform;
