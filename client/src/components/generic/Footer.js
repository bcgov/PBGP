import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from "react-i18next";

export const Footer = ({ maxWidth= 'md' }) => {
  const { t } = useTranslation();

  return (
    <Box mt="auto">
      <Box borderTop={1} borderColor="divider" bgcolor="common.lightGrey">
        <Container maxWidth={maxWidth}>
          <Box pt={4} pb={4}>
            <Grid container alignItems="center" justify="space-between">
              <Grid item>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={true}>
                    <Link href="https://www.alberta.ca/disclaimer.aspx" target="_blank">{t("Disclaimer")}</Link>
                  </Grid>
                  <Grid item xs={12} sm={true}>
                    <Link href="https://www.alberta.ca/privacystatement.aspx" target="_blank">{t("Privacy")}</Link>
                  </Grid>
                  <Grid item xs={12} sm={true}>
                    <Link href="https://www.alberta.ca/accessibility.aspx" target="_blank">{t("Accessibility")}</Link>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Box mt={[3, 0]}>
                  <Typography variant="body2" color="textSecondary">
                    &copy; 2021 {t("Government of Alberta")}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
      <Box pt={1} pb={1} bgcolor="secondary.main" />
    </Box>
  );
};
