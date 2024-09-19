import React from 'react';
import { Card, CardContent, Typography, Box, Divider } from '@mui/material';
import { FaPen } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md'; 
import { useNavigate } from 'react-router-dom'; 
import './ActivityCard.css';

const ActivityCard = ({ title, summary, endpoints }) => {
  const navigate = useNavigate(); 
  const handleEndpointClick = (endpoint, index) => {
    if (endpoint === 'Ir para a atividade') {
      navigate(`/activity/${index+1}`); 
    }
  };

  return (
    <Card className="activity-card">
      <CardContent className="activity-card-content">
        <div className="activity-card-icon">
          <FaPen size={25} />
        </div>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: '24px',
            color: '#4a4a4a',
            textAlign: 'center',
            marginTop: '120px',
            marginRight: '90px',
            marginBottom: '10px',
          }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="activity-card-summary">
          {summary}
        </Typography>
      </CardContent>
      <Box className="activity-card-hover-content">
        <Typography variant="body2" color="text.primary" sx={{ marginBottom: '15px', fontSize: '25px' }}>
          <strong>Atividade:</strong>
        </Typography>
        {endpoints.map((endpoint, index) => (
          <React.Fragment key={index}>
            <Box
              className="endpoint-item"
              sx={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}
              onClick={() => handleEndpointClick(endpoint, index)} 
            >
              <Typography
                variant="body2"
                color="text.primary"
                sx={{
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  flexGrow: 1,
                  cursor: 'pointer', 
                }}
              >
                {endpoint}
              </Typography>
              <MdArrowForward size={16} style={{ marginLeft: '70px', color: '#4a4a4a' }} /> 
            </Box>
            {index < endpoints.length - 1 && <Divider sx={{ my: 1, backgroundColor: '#e0e0e0' }} />} 
          </React.Fragment>
        ))}
      </Box>
    </Card>
  );
};

export default ActivityCard;
