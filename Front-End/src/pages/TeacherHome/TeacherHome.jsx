import React from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  People as PeopleIcon,
} from "@mui/icons-material";
import "./TeacherHome.css";
import { useNavigate } from "react-router-dom";

const TeacherHomepage = () => {
  const navigate = useNavigate();

  const handleClickAtividades = () => {
    navigate("/atividades");
  };

  const handleClickAlunos = () => {
    navigate("/alunos");
  };

  return (
    <Container
      disableGutters
      className="home-wrapper"
      maxWidth={false}
      style={{ padding: "20px" }}
    >
      <Grid
        container
        spacing={4}
        justifyContent="center"
        sx={{ marginTop: 10 }}
      >
        {/* Card de Atividades */}
        <Grid item>
          <Card
            sx={{
              width: 345,
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "translateY(-5px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={handleClickAtividades}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <AddIcon
                sx={{ fontSize: 60, color: "#1976d2", marginBottom: 2 }}
              />
              <Typography variant="h6" component="div">
                Atividades
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Visualize, cadastre e gerencie suas atividades
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Card de Gerenciar Alunos */}
        <Grid item>
          <Card
            sx={{
              width: 345,
              height: 250,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f5f5f5",
                transform: "translateY(-5px)",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
            onClick={handleClickAlunos}
          >
            <CardContent sx={{ textAlign: "center" }}>
              <PeopleIcon
                sx={{
                  fontSize: 60,
                  color: "#2e7d32",
                  marginBottom: 2,
                }}
              />
              <Typography variant="h6" component="div">
                Alunos
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                Visualize e gerencie seus alunos cadastrados
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TeacherHomepage;