import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import Copyright from '../components/Copyright';

export default function EmptyPage() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          EmptyPage
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
