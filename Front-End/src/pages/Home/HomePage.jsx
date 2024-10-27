import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
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

  console.log(activities);

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
    </Container>
  );
};

export default Homepage;
