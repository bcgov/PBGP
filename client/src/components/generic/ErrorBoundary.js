import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import { Page, Button } from '.';

export class ErrorBoundary extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return !hasError ? children : (
      <Page hideFooter centerContent>
        <Grid container justify="center">
          <Grid item xs={10} sm={6} md={4}>
            <Box m={2} display="flex" flexDirection="column" alignItems="center">
              <Typography
                variant="body1"
                color="textPrimary"
                paragraph
              >
                An unexpected error has occurred.
              </Typography>
              <Button
                text="Refresh Page"
                onClick={() => window.location.reload()}
                fullWidth={false}
              />
            </Box>
          </Grid>
        </Grid>
      </Page>
    );
  }
}
