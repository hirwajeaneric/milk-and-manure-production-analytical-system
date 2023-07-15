import { ArrowForward } from '@mui/icons-material';
import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import styled from 'styled-components'
import { VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'

export const ProductionMenu = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  align-items: center;
  width: 100%;
  justify-content: flex-start;

  a {
    text-decoration: none;
    color: black;
    display: flex;
    flex-direction: row;
    gap: 20px;
    align-items: center;

    svg {
      font-size: 100%;
    }

    &:hover {
      color: green;
    }

    &.active {
      color: orangered;
    }
  }
`;

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