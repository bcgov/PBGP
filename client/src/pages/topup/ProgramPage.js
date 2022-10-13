import React, { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import { Page, Button, PageHeader } from 'components/generic'
import { useTranslation } from 'react-i18next'
import { Box, Grid, Card, CardContent, Container, Typography } from '@material-ui/core'
import { useToast } from 'hooks/toast'

function RouteLink({ to, text, variant }) {
  return (
    <Link
      to={to}
      component={
        React.forwardRef((props, ref) => (
          <Button
            {...props}
            ref={ref}
            fullWidth={false}
            text={text}
            variant={variant}
          />
        ))
      }
    />
  )
}
export default function ProgramPage() {
  const { t } = useTranslation()
  const [loading, toggleLoading] = useState(false)
  const location = useLocation()
  const [checked, setChecked] = useState(false)
  const [isRead, setIsRead] = useState(false)
  const { openToast } = useToast();

  if (isRead) {
    return (<Redirect to={{ pathname: '/dashboard', state: { from: location } }} />)
  }
  return (
    <Page>
      <PageHeader
        header='Health Care COVID-19 Funding for Critical Workers and Operators'
        subheader='Program Information and Terms'>
      </PageHeader>
      <Container maxWidth='sm'>
        {
          loading ? (
            <Typography>Loading...</Typography>
          ) : (
              <>
                {sections.map(item => (
                  <>
                    <Box py={2} px={4}>
                      <Card>
                        <CardContent>
                          <Typography variant='h3'>{item.name}</Typography>
                          <Box my={2}><Typography variant='h6'>{item.description}</Typography></Box>
                          <Grid item sm={3}>
                            <RouteLink text='Read More' color='primary' to={item.link} variant='contained' />
                          </Grid>
                        </CardContent>
                      </Card>
                    </Box>
                  </>
                ))}
              </>
            )}

        <Box py={2} px={4}>
          <Card>
            <CardContent>
              <Box my={2}>
                <Grid container
                  direction='row'
                  justify='start'
                  alignItems='center'
                  style={{ marginTop: 4 }}
                >
                  <Typography variant='h3'>Have you read the terms and services?</Typography>
                  <input
                    style={{ marginLeft: 24 }}
                    type='checkbox'
                    value={checked}
                    name='terms'
                    label='Yes'
                    options={null}
                    onChange={e => {
                      setChecked(!checked)
                      openToast({ status: 'success', message: 'Updated Successfully' });
                      setIsRead(true)
                    }}
                  />
                </Grid>
              </Box>
              <Typography variant='body1'>Placeholder some information. Pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus.</Typography>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </Page >
  )
}

const sections = [
  { name: 'Operator Benefit', link: '/operator-benefit-information', description: 'Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis nunc sed blandit libero. At tellus at urna condimentum mattis pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Vestibulum lorem sed risus ultricies tristique nulla. Dolor morbi non arcu risus quis varius quam quisque.' },
  { name: 'Employee Benefit', link: '/employee-benefit-information', description: 'Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis nunc sed blandit libero. At tellus at urna condimentum mattis pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Vestibulum lorem sed risus ultricies tristique nulla. Dolor morbi non arcu risus quis varius quam quisque.' },
  { name: 'Privacy Statement', link: '/privacy-statement', description: 'Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis nunc sed blandit libero. At tellus at urna condimentum mattis pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Vestibulum lorem sed risus ultricies tristique nulla. Dolor morbi non arcu risus quis varius quam quisque.' },
  { name: 'Employer Grant Agreement', link: '/employer-grant-agreement', description: 'Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis nunc sed blandit libero. At tellus at urna condimentum mattis pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Vestibulum lorem sed risus ultricies tristique nulla. Dolor morbi non arcu risus quis varius quam quisque.' },
  { name: 'Employee Eligibility Attestation', link: '/employee-eligibility', description: 'Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat. Sit amet porttitor eget dolor morbi non arcu risus quis. Mattis nunc sed blandit libero. At tellus at urna condimentum mattis pellentesque id. Nunc vel risus commodo viverra maecenas. Montes nascetur ridiculus mus mauris. Dis parturient montes nascetur ridiculus mus mauris vitae ultricies leo. Vestibulum lorem sed risus ultricies tristique nulla. Dolor morbi non arcu risus quis varius quam quisque.' }
]


