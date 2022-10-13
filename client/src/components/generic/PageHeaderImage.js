import React from 'react'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { CollectionNotice } from 'components/generic/CollectionNotice'
import { AlertError } from 'components/generic'
import { useTranslation } from 'react-i18next'
import header_image from 'assets/images/banner-image.png'

const styles = {
  imgContainer: {
    backgroundImage: `url(${header_image})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }
}
export const PageHeaderImage = ({ header, subheader, children, withCollectionNotice = false, alertProp = null }) => {
  const { t } = useTranslation()
  return (
    <>
      <Box pt={[3, 6]} pb={[3, 6]} style={styles.imgContainer}>
        <Container maxWidth='md'>
          <Box mb={2.5} component={Typography} variant='h1' style={{ color: 'white' }}>
            {t(header)}
          </Box>
          {subheader && (
            <Typography variant='subtitle1' style={{ color: 'white' }}>
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
  )
}