// src/components/ActivityCard.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import './ActivityCard.css'; // Importando o CSS

const ActivityCard = ({ title, summary, endpoints }) => {
  return (
    <Card className="activity-card">
      <CardContent className="activity-card-content">
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="activity-card-summary">
          {summary}
        </Typography>
      </CardContent>
      <Box className="activity-card-hover-content">
        <Typography variant="body2" color="text.primary">
          <strong>Endpoints:</strong>
        </Typography>
        {endpoints.map((endpoint, index) => (
          <Typography key={index} variant="body2" color="primary">
            {endpoint}
          </Typography>
        ))}
      </Box>
    </Card>
  );
};

export default ActivityCard;
