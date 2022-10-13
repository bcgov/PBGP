import React, { useState, useEffect } from 'react';
import Collapse from '@material-ui/core/Collapse';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'react-i18next';


export const CollectionNotice = () => {
  const { t } = useTranslation();
  const [isCollectionNoticeExpanded, setCollectionNoticeExpanded] = useState(false);

  return (
    <Box pt={[3]} pb={[2]}>
      <Container maxWidth="sm">
        <Typography component="div" variant="caption" color="textPrimary">
          <Box mt={1} style={{fontWeight: 600, textDecoration: 'underline'}}>
            {t("Alberta COVID-19 Border Testing Pilot Program")}
          </Box>          
            {t("The Alberta COVID-19 Border Testing Pilot Program (“Pilot”) will allow eligible international travellers who arrive at Calgary International Airport or the Coutts landborder crossing to quarantine for a shorter time period provided that they")}
          <Box
            mt={0.25}
            color="secondary.main"
            style={{ cursor: 'pointer', textDecoration: 'underline' }}
            onClick={() => setCollectionNoticeExpanded(prevState => !prevState)}
          >
            {!isCollectionNoticeExpanded ? t("Show More") : t("Show Less")}
          </Box>
          <Collapse in={isCollectionNoticeExpanded}>
            <Box mt={1}>
              {t("a. test negative for COVID-19; and")}
            </Box>
            <Box mt={1}>
              {t("b. commit to following specific public health and testing measures set by the Government of Canada and the Government of Alberta, which are described at ")}
              <span><a href="www.alberta.ca/international-border-pilot-project.aspx">www.alberta.ca/international-border-pilot-project.aspx.</a></span>
            </Box>
            <Box mt={1}>
              {t("Participants in this program will be closely monitored and data from the Pilot will help inform decisions on new measures for international travel during the COVID-19 pandemic.")}
            </Box>
            <Box mt={1} style={{fontWeight: 600, textDecoration: 'underline'}}>
              {t("Collection and Use of Health Information")}
            </Box>
            <Box mt={1}>
              {t("The information on this form is being collected by Alberta Health pursuant to sections 20(b), 27(1)(a),(b), 27(2), and 22(2)(a) of the Health Information Act (HIA) for the purposes of")}
            </Box>
            <Box mt={1}>
              {t("a. determining eligibility to participate in the Pilot, and")}
            </Box>
            <Box mt={1}>
              {t("b. contacting travellers to communicate COVID-19 test results and obtain additional health information as needed in the course of the Pilot.")}
            </Box>
            <Box mt={1}>
              {t("If you choose to participate in the Pilot, your health information may be used for thepurpose of evaluating the Pilot.  Certain information may also be disclosed to law enforcement authorities for compliance and law enforcement purposes.")}
            </Box>
            <Box mt={1}>
              {t("The confidentiality of this information, and your privacy, are protected by provisionsof the HIA.")}
            </Box>
            <Box mt={1}>
              {t("On this form, you will be asked to enter information about other members of your traveling party.  You may only enter information about other adults or mature minors if they have authorized you to provide information about them.")}
            </Box>
            <Box mt={1}>
              {t("On a separate form, you will be asked to consent to the disclosure of your health information for certain purposes.")}
            </Box>
            <Box mt={1}>
              {t("If you have any questions regarding the collection, use or disclosure of this information, please contact eHealth Support Services at 1-888-245-9403 or by mail at 14th Floor North Tower, ATB Place, 10025 Jasper Avenue, Edmonton, Alberta T5J 1S6.")}
            </Box>
          </Collapse>
        </Typography>
      </Container>
    </Box>
  )
}