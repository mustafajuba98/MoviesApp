import React from "react";
import { Link as RouterLink } from "react-router-dom";

// MUI Imports
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ReportProblemIcon from "@mui/icons-material/ReportProblem"; 

function Notfound() {
  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <ReportProblemIcon
          sx={{ fontSize: 80, color: "warning.main", mb: 2 }}
        />{" "}
        <Typography component="h1" variant="h3" gutterBottom fontWeight="bold">
          404 - Page Not Found
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Oops! The page you are looking for does not exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          component={RouterLink} 
          to="/"
          size="large" 
        >
          Go Back Home
        </Button>
      </Box>
    </Container>
  );
}

export default Notfound;
