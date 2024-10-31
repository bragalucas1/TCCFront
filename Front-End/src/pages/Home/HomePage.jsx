import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Box } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import "./HomePage.css";
import ActivitiesService from "../../services/Activities/ActivitiesService";

const Homepage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await ActivitiesService.getAllActivities();
        setActivities(response.atividades);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    };

    fetchActivities();
  }, []);

  const EmptyState = () => (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        width: "100%",
        height: "calc(100vh - 100px)", // Ajusta para altura total menos o header/padding
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <SearchIcon
        sx={{
          fontSize: 60,
          color: "grey.400",
          mb: 2,
        }}
      />
      <Typography
        variant="h6"
        sx={{
          color: "grey.400",
          fontWeight: "normal",
        }}
      >
        Nenhuma atividade encontrada.
      </Typography>
    </Box>
  );

  return (
    <Container
      disableGutters
      className="home-wrapper"
      maxWidth={false}
      style={{
        padding: "20px",
        position: "relative", // Adiciona posição relativa ao container
        minHeight: "calc(100vh - 40px)", // Altura total menos padding
      }}
    >
      {activities.length > 0 ? (
        <Grid
          container
          spacing={4}
          justifyContent="center"
          sx={{ marginTop: 10 }}
        >
          {activities.map((activity, index) => (
            <Grid item key={index}>
              <ActivityCard
                title={activity.nome}
                summary={activity.tipo}
                content={activity.conteudo}
                endpoints={activity.endpoints}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <EmptyState />
      )}
    </Container>
  );
};

export default Homepage;
