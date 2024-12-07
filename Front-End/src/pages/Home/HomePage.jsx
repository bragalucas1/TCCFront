import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Badge,
  Tooltip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import "./HomePage.css";
import ActivitiesService from "../../services/Activities/ActivitiesService";

const SubmissionStatus = ({ activity }) => {
  const getSubmissionStatus = () => {
    if (!activity.submissoes || activity.submissoes.length === 0) {
      return {
        icon: <HelpOutlineIcon />,
        color: "grey",
        tooltip: "Sem submissão",
        quantidade: 0,
      };
    }
    const lastSubmission = activity.submissoes[activity.submissoes.length - 1];

    if (lastSubmission.status === "Correto") {
      return {
        icon: <CheckCircleIcon />,
        color: "success",
        tooltip: "Correto",
        quantidade: lastSubmission.quantidade_sub,
      };
    }

    return {
      icon: <CancelIcon />,
      color: "error",
      tooltip: `${lastSubmission.quantidade_sub} tentativa(s)`,
      quantidade: lastSubmission.quantidade_sub,
    };
  };

  const status = getSubmissionStatus();

  return (
    <Box
      sx={{
        position: "absolute",
        top: "16px",
        right: "16px",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        height: "40px",
      }}
    >
      <Tooltip
        title={status.tooltip}
        placement="top"
        arrow
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          fontSize: "14px",
        }}
      >
        <Badge
          badgeContent={status.quantidade}
          color={status.color}
          sx={{
            cursor: "pointer",
            "& .MuiBadge-badge": {
              right: -3,
              top: 3,
              border: `2px solid #fff`,
              padding: "0 4px",
            },
          }}
        >
          {React.cloneElement(status.icon, {
            sx: {
              fontSize: 24,
              color:
                status.color === "success"
                  ? "#4caf50"
                  : status.color === "error"
                  ? "#f44336"
                  : "#9e9e9e",
            },
          })}
        </Badge>
      </Tooltip>
    </Box>
  );
};

const Homepage = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const response = await ActivitiesService.getAllActivities(user.id);
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
        height: "calc(100vh - 100px)",
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
        position: "relative",
        minHeight: "calc(100vh - 40px)",
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
              <Box sx={{ position: "relative" }}>
                <SubmissionStatus activity={activity} />
                <ActivityCard activity={activity} />
              </Box>
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
