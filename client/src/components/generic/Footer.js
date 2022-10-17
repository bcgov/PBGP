import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';

export const Footer = ({ maxWidth = 'md' }) => {
  const { t } = useTranslation();

  return (
    <Box mt='auto'>
      <Box borderTop={1} borderColor='divider' bgcolor='primary.main'>
        <Container maxWidth={maxWidth}>
          <Box pt={1.25} pb={1.25}>
            <Grid container alignItems='center' justify='space-between'>
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={true}>
                    <Link href='https://www.alberta.ca/disclaimer.aspx' target='_blank'>
                      <Typography variant='body2' color='textSecondary'>
                        {t('Home')}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={true}>
                    <Link href='https://www.alberta.ca/privacystatement.aspx' target='_blank'>
                      <Typography variant='body2' color='textSecondary'>
                        {t('Disclaimer')}
                      </Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={12} sm={true}>
                    <Link href='https://www.alberta.ca/accessibility.aspx' target='_blank'>
                      <Typography variant='body2' color='textSecondary'>
                        {t('Accessibility')}
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box mt={[3, 0]}>
                  <Typography variant='body2' color='textSecondary'>
                    &copy; 2021 {t('Government of BC')}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
