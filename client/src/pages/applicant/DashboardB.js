import React, { useContext } from 'react'
import { AuthContext } from '../../providers/Auth';
import { Page, Footer, PageHeaderImage } from 'components/generic'

export default function Dashboard2B() {
  const { state } = useContext(AuthContext);
  const { username } = state;
  return (
    <>
    <Page centerContent isLoading={false}>
        
        <p>Welcome: {username}</p>
        </Page>
    </>
  )
}
