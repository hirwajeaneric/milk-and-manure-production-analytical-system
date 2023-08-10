import { Outlet } from 'react-router-dom'
import { CenterFlexedContainer } from '../../../components/styles/GenericStyles'

const Auth = () => {
  return (
    <CenterFlexedContainer style={{ width: '100vw', height: '100vh', background: "url('/cows.jpg'), rgba(0,0,0,.4)", backgroundBlendMode:'color-dodge',backgroundSize: 'cover', backgroundRepeat:'no-repeat', backgroundOrigin: 'unset' }}>
      <Outlet />
  </CenterFlexedContainer>
  )
}

export default Auth