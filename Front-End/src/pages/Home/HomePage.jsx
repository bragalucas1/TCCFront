import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './HomePage.css';

const Homepage = () => {
  const activities = [
    {
      title: 'Atividade 1',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      endpoints: [
        '/api/atividade1/endpoint1',
        '/api/atividade1/endpoint2',
        '/api/atividade1/endpoint3',
      ],
    },
    {
      title: 'Atividade 2',
      summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
      endpoints: [
        '/api/atividade2/endpoint1',
        '/api/atividade2/endpoint2',
        '/api/atividade2/endpoint3',
      ],
    },
    {
        title: 'Atividade 3',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
        endpoints: [
          '/api/atividade3/endpoint1',
          '/api/atividade3/endpoint2',
          '/api/atividade3/endpoint3',
        ],
    },
    {
        title: 'Atividade 4',
        summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.',
        endpoints: [
          '/api/atividade4/endpoint1',
          '/api/atividade4/endpoint2',
          '/api/atividade4/endpoint3',
        ],
    },
    // Adicione mais atividades conforme necessário
  ];

  return (
    <Container disableGutters className="home-wrapper" maxWidth={false} style={{ padding: '20px' }}>
      <Grid container spacing={4} justifyContent="center" sx={{ marginTop: 10 }}>
        {activities.map((activity, index) => (
          <Grid item key={index}>
            <ActivityCard
              title={activity.title}
              summary={activity.summary}
              endpoints={activity.endpoints}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Homepage;
