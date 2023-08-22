import { Add, ArrowForward } from '@mui/icons-material'
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { ProductionMenu } from '../rab/Production'

const Production = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <ProductionMenu style={{ gap: '20px' }}>
        <NavLink to={'milk'}>Milk <ArrowForward /></NavLink>
        <NavLink to={'manure'}>Manure <ArrowForward /></NavLink>
      </ProductionMenu>
      <Outlet />
    </VerticallyFlexGapContainer>
  )
}

export default Production