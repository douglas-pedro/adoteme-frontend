'use client'

import withAuth from '../hoc/withAuth'
import LogoutButton from '../components/ButtonLogout'

const IndexAdopter = () => {
  return (
    <div className="">
      <p>Index Adotar</p>
      <LogoutButton />
    </div>
  )
}

export default withAuth(IndexAdopter)
