import React from 'react';
import { Container, Grid, Typography } from '@mui/material';
import ActivityCard from '../../components/ActivityCard/ActivityCard';
import './HomePage.css';

const Homepage = () => {
  const activities = [
    {
      title: 'Atividade 1',
      summary: 'Atividade sobre listas encadeadas e pilhas.',
      endpoints: [
        'Ir para a atividade',
        'Documentações úteis'
      ],
    },
    {
      title: 'Atividade 2',
      summary: 'Atividade sobre filas e árvores.',
      endpoints: [
        'Ir para a atividade',
        'Documentações úteis'
      ],
    },
    {
        title: 'Atividade 3',
        summary: 'Atividade sobre grafos e algoritmos de busca.',
        endpoints: [
          'Ir para a atividade',
          'Documentações úteis'
        ],
    },
    {
        title: 'Atividade 4',
        summary: 'Atividade sobre algoritmos de ordenação e complexidade.',
        endpoints: [
          'Ir para a atividade',
          'Documentações úteis',
        ],
    },
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
