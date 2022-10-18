import React, { useContext } from 'react'
import { AuthContext } from '../../providers/Auth';

export default function Dashboard2B() {
  const { state } = useContext(AuthContext);
  const { username } = state;
  return (
    <>
      <div>Dashboard</div>
      <p>Welcome: {username}</p>
    </>
  )
}
