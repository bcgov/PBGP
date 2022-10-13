import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { CollectionNotice } from 'components/generic/CollectionNotice'
import { AlertError } from 'components/generic'
import { useTranslation } from 'react-i18next'

export const PageHeader = ({ header, subheader, children, withCollectionNotice = false, alertProp = null, maxWidth = 'md' }) => {
  const { t } = useTranslation();

  return (
    <>
      <Box pt={[3, 6]} pb={[3, 6]} bgcolor='secondary.main' color='common.white'>
        <Container maxWidth={maxWidth}>
          <Box mb={2.5} component={Typography} variant='h1'>
            {t(header)}
          </Box>
          {subheader && (
            <Typography variant='subtitle1'>
              {t(subheader)}
            </Typography>
          )}
          {children}
        </Container>
      </Box>
      {/** Collection Notice */}
      {withCollectionNotice && <CollectionNotice />}
      {/** Alert */}
      {alertProp && window._env_[alertProp] && <AlertError
        message={t(window._env_[alertProp])}
      />}
    </>
  );
}
