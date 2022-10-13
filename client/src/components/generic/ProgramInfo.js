import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { useTranslation } from 'react-i18next'
export const ProgramInfo = () => {
  const { t } = useTranslation()
  const [isCollectionNoticeExpanded, setCollectionNoticeExpanded] = useState(false)

  return (
    <Box pt={[3]} pb={[4]}>
      <Container maxWidth='sm' disableGutters>
        <Typography component='div' variant='caption' color='textPrimary'>
          <Box mt={1} style={{ fontWeight: 600, textDecoration: 'underline' }}>
            <Typography variant='h4'>
              {t('Health Care Covid-19 Funding for Critical Workers and Operators')}
            </Typography>
          </Box>
          <Typography variant='h4' style={{ paddingBottom: '5px' }}>About the Critical Worker Benefit</Typography>
          {t('The Critical Worker Benefit is intended to recognize the service of select workers identified as critical for the delivery of basic services to Albertans in response to the COVID-19 pandemic. The Critical Worker Benefit provides a one-time lump-sum payment to eligible workers.')}
          <Box
            mt={0.25}
            color='secondary.main'
            style={{ cursor: 'pointer', textDecoration: 'underline', width: "fit-content" }}
            onClick={() => setCollectionNoticeExpanded(prevState => !prevState)}
          >
            {!isCollectionNoticeExpanded ? t('Show More') : t('Show Less')}
          </Box>
          <Collapse in={isCollectionNoticeExpanded}>
            <Box mt={1}>
              {t('As this is funding provided from government to workers, this benefit is not intended to affect any employment agreement, including a collective agreement or alter any terms and conditions of workers’ employment. In administering the benefit, employers are required to comply with the Critical Worker Benefit program guidelines and the applicable grant agreement, and employers do not have discretion with respect to the amount of the benefit or a worker’s eligibility for the benefit. Employers are administering funds on behalf of government.')}
            </Box>
            <Box mt={1}>
              <a href='https://open.alberta.ca/publications/critical-worker-benefit-application-guidelines-for-the-health-sector' target='_blank' >Application Guideline</a>
            </Box>
            <Box mt={1}>
              <Typography variant='h4' style={{ paddingBottom: '5px' }}>About the Operator COVID-19 Support Funding</Typography>
              {t('Operator COVID-19 Support Funding is intended to provide support to operators of non-contracted licensed supportive living and both contracted and non-contracted home care, hospices and residential addiction and mental health treatment centres. This funding will help operators pay for increased staffing, additional cleaning supplies and personal protective equipment.')}
            </Box>
            <Box mt={1}>
              <a href='https://open.alberta.ca/publications/operator-covid-19-support-funding-application-guidelines-for-operators' target='_blank' >Application Guideline for Operator COVID-19 Support Funding </a>
            </Box>
            <Box mt={1}>
              <Typography variant='h4' style={{ paddingBottom: '5px' }}>FOIP Statement</Typography>
              {t("The personal information in this application form and any related attachments is being collected by Alberta Health under section 33(c) and 34(1)(k)(i)&(ii) of the Freedom on Information and Protection of Privacy (FOIP) Act of Alberta for the purpose of determining eligibility for a grant under the Critical Worker Benefit Program and the Operator COVID-19 Funding program.  Certain personal information may potentially be disclosed to other Government of Alberta Ministries in accordance with section 40(1)(l) of the FOIP Act for the purpose of determining or verifying an individual’s suitability or eligibility for a program or benefit under the Critical Worker Benefit Program. All personal information will be managed in accordance with the provisions of the FOIP Act.  Any questions regarding the collection and use of this information can be directed to e-Health Support Services at 1 (833) 611-1140.")}
            </Box>
          </Collapse>
        </Typography>
      </Container>
    </Box>
  )
}
