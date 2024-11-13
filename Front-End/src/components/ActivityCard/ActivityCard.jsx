import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityCard = ({ title, summary, content, activity }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${activity.nome}`, { state: { activity } });
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
          background: "linear-gradient(135deg, #df6ef1, #b861d9)",
          borderRadius: "12px",
          padding: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 8px rgba(223, 110, 241, 0.2)",
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
          {title}
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
          {summary}
        </Typography>

        {/* Content Balloon */}
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
              backgroundColor: "rgba(223, 110, 241, 0.03)",
              borderRadius: "12px",
              padding: "16px",
              border: "1px solid rgba(223, 110, 241, 0.2)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: "-1px",
                left: "20px",
                right: "20px",
                height: "1px",
                background:
                  "linear-gradient(90deg, rgba(223,110,241,0) 0%, rgba(223,110,241,0.4) 50%, rgba(223,110,241,0) 100%)",
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
                borderTop: "8px solid rgba(223, 110, 241, 0.2)",
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
              {content}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ActivityCard;
