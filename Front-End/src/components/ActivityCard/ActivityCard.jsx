import React from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import { PenLine } from "lucide-react";
import { MdArrowForward } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./ActivityCard.css";

const ActivityCard = ({ title, summary, content, endpoints = [] }) => {
  const navigate = useNavigate();

  const handleEndpointClick = (endpoint, index) => {
    if (endpoint === "Ir para a atividade") {
      navigate(`/activity/${index + 1}`);
    }
  };

  return (
    <Card className="activity-card">
      <CardContent className="activity-card-content">
        <div className="activity-card-icon">
          <PenLine size={22} strokeWidth={2.5} />
        </div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "24px",
            color: "#4a4a4a",
            textAlign: "center",
            marginTop: "80px", // Aumentado para mover o título para baixo
            marginBottom: "10px",
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "20px",
            color: "#4a4a4a",
            textAlign: "center",
            marginTop: "30px", // Aumentado para mover o título para baixo
            marginBottom: "10px",
          }}
        >
          {summary}
        </Typography>
        <div className="content-circle-main">
          <Typography
            variant="body2"
            color="text.secondary"
            className="content-text-main"
          >
            {content}
          </Typography>
        </div>
      </CardContent>
      <Box className="activity-card-hover-content">
        <div className="content-circle">
          <Typography
            variant="body2"
            color="text.primary"
            className="content-text"
          >
            {content}
          </Typography>
        </div>
        <Typography
          variant="body2"
          color="text.primary"
          sx={{ marginBottom: "15px", fontSize: "25px" }}
        >
          <strong>Atividades:</strong>
        </Typography>
        {endpoints.map((endpoint, index) => (
          <React.Fragment key={index}>
            <Box
              className="endpoint-item"
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: "8px",
              }}
              onClick={() => handleEndpointClick(endpoint, index)}
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  flexGrow: 1,
                  cursor: "pointer",
                }}
              >
                {endpoint}
              </Typography>
              <MdArrowForward
                size={16}
                style={{ marginLeft: "70px", color: "#4a4a4a" }}
              />
            </Box>
            {index < endpoints.length - 1 && (
              <Divider sx={{ my: 1, backgroundColor: "#e0e0e0" }} />
            )}
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default ActivityCard;
