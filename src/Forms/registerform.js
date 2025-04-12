import { useState } from "react";
import { Link as RouterLink } from "react-router-dom"; 

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
import Grid from "@mui/material/Grid"; 
import Link from "@mui/material/Link"; 

function Registerform() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    errName: null,
    errEmail: null,
    errUsername: null,
    errPass: null,
    errConfirm: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });

    // --- Validation Logic ---
    let currentErrors = { ...errors };
    switch (name) {
      case "name":
        currentErrors.errName =
          value.trim().length === 0 ? "Name is required" : null;
        break;
      case "email":
        currentErrors.errEmail =
          value.trim().length === 0
            ? "Email is required"
            : !emailRegex.test(value)
            ? "Invalid email format"
            : null;
        break;
      case "username":
        currentErrors.errUsername =
          value.trim().length === 0
            ? "Username is required"
            : /\s/.test(value)
            ? "Username cannot contain spaces"
            : null;
        break;
      case "password":
        currentErrors.errPass =
          value.length === 0
            ? "Password is required"
            : !passwordRegex.test(value)
            ? "Password must be 8+ chars with numbers & special characters (!@#$%^&*)"
            : null;
        // Also validate confirm password if password changes
        currentErrors.errConfirm =
          userInfo.confirmPassword && value !== userInfo.confirmPassword
            ? "Passwords do not match"
            : errors.errConfirm && userInfo.confirmPassword.length === 0 // Clear confirm error if user fixed password but confirm is empty
            ? "Please confirm your password"
            : null;
        break;
      case "confirmPassword":
        currentErrors.errConfirm =
          value.length === 0
            ? "Please confirm your password"
            : value !== userInfo.password
            ? "Passwords do not match"
            : null;
        break;
      default:
        break;
    }
    setErrors(currentErrors);
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleMouseDownConfirmPassword = (event) => event.preventDefault();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Trigger validation for all fields on submit click
    const finalErrors = {
      errName: userInfo.name.trim().length === 0 ? "Name is required" : null,
      errEmail:
        userInfo.email.trim().length === 0
          ? "Email is required"
          : !emailRegex.test(userInfo.email)
          ? "Invalid email format"
          : null,
      errUsername:
        userInfo.username.trim().length === 0
          ? "Username is required"
          : /\s/.test(userInfo.username)
          ? "Username cannot contain spaces"
          : null,
      errPass:
        userInfo.password.length === 0
          ? "Password is required"
          : !passwordRegex.test(userInfo.password)
          ? "Password must be 8+ chars with numbers & special characters (!@#$%^&*)"
          : null,
      errConfirm:
        userInfo.confirmPassword.length === 0
          ? "Please confirm your password"
          : userInfo.confirmPassword !== userInfo.password
          ? "Passwords do not match"
          : null,
    };
    setErrors(finalErrors);

    const hasErrors = Object.values(finalErrors).some(
      (error) => error !== null
    );

    if (!hasErrors) {
      console.log("Registration submitted:", userInfo);
      alert("Registration attempt (check console)"); // Placeholder
    } else {
      console.log("Registration form has errors");
    }
  };

  // Check if form is generally valid for enabling submit button
  const isFormValid = () => {
    return (
      userInfo.name &&
      userInfo.email &&
      userInfo.username &&
      userInfo.password &&
      userInfo.confirmPassword &&
      !Object.values(errors).some((error) => error !== null) 
    );
  };

  return (
    <Container component="main" maxWidth="sm">
      {" "}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {/* Name */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={userInfo.name}
            onChange={handleInputChange}
            error={!!errors.errName}
            helperText={errors.errName}
          />
          {/* Email */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={userInfo.email}
            onChange={handleInputChange}
            error={!!errors.errEmail}
            helperText={errors.errEmail}
          />
          {/* Username */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={userInfo.username}
            onChange={handleInputChange}
            error={!!errors.errUsername}
            helperText={errors.errUsername}
          />
          {/* Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
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
          {/* Confirm Password */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleInputChange}
            error={!!errors.errConfirm}
            helperText={errors.errConfirm}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            disabled={!isFormValid()}
          >
            Register
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} to="/loginform" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Registerform;
