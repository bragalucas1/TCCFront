import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PenLine, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${activity.nome}`, { state: { activity } });
  };

  const formatDeadline = (time) => {
    const date = new Date(time);
    const formattedDate = date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    const formattedTime = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${formattedDate} - ${formattedTime}`;
  };

  return (
    <Card
      onClick={handleClick}
      sx={{
        width: 300,
        borderRadius: "16px",
        boxShadow: "0 10px 20px rgba(0,0,0,0.08)",
        transition: "all 0.3s ease",
        background: "linear-gradient(145deg, #ffffff, #f9f9f9)",
        border: "1px solid rgba(223, 110, 241, 0.1)",
        position: "relative",
        overflow: "visible",
        "&:hover": {
          transform: "translateY(-5px)",
          boxShadow: "0 15px 30px rgba(223, 110, 241, 0.15)",
        },
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          position: "absolute",
          top: "16px",
          left: "16px",
          background: "linear-gradient(135deg, #2196f3, #1976d2)", // Azul Material UI
          borderRadius: "12px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(33, 150, 243, 0.2)",
          zIndex: 1,
        }}
      >
        <PenLine size={20} color="white" strokeWidth={2.5} />
      </Box>

      <CardContent sx={{ padding: 3, pt: 5 }}>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            paddingTop: "10px",
            fontSize: "22px",
            color: "#2d3748",
            fontWeight: 600,
            mb: 1,
            mt: 2,
          }}
        >
          {activity.nome}
        </Typography>

        {/* Summary */}
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "16px",
            color: "#718096",
            mb: 2,
            fontWeight: 500,
          }}
        >
          {activity.tipo}
        </Typography>

        {/* Deadline */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(33, 150, 243, 0.1)",
            borderRadius: "8px",
            padding: "8px 12px",
            mb: 2,
            border: "1px solid rgba(33, 150, 243, 0.1)", // Azul claro
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: "rgba(33, 150, 243, 0.1)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Clock
            size={18}
            color="#2196f3"
            style={{
              marginRight: "8px",
              strokeWidth: 2,
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#2d3748",
              fontFamily: "Inter, system-ui, sans-serif",
              letterSpacing: "0.02em",
              background: "linear-gradient(135deg, #2196f3, #1976d2)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {formatDeadline(activity.data_limite)}
          </Typography>
        </Box>

        {/* Content Box */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            mt: 3,
            mb: 2,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              maxWidth: "90%",
              backgroundColor: "rgba(33, 150, 243, 0.03)",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid rgba(33, 150, 243, 0.2)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-1px",
                left: "20px",
                right: "20px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(33,150,243,0) 0%, rgba(33,150,243,0.4) 50%, rgba(33,150,243,0) 100%)",
              },
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: "-8px",
                left: "50%",
                transform: "translateX(-50%)",
                width: 0,
                height: 0,
                borderLeft: "8px solid transparent",
                borderRight: "8px solid transparent",
                borderTop: "8px solid rgba(33, 150, 243, 0.2)",
              },
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Inter, system-ui, sans-serif",
                fontSize: "15px",
                color: "#4a5568",
                lineHeight: 1.7,
                textAlign: "center",
                letterSpacing: "0.01em",
                fontWeight: 450,
                WebkitFontSmoothing: "antialiased",
                MozOsxFontSmoothing: "grayscale",
                "& strong": {
                  color: "#2d3748",
                  fontWeight: 600,
                },
                "& em": {
                  fontStyle: "italic",
                  color: "#553C9A",
                },
              }}
            >
              {activity.conteudo}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
