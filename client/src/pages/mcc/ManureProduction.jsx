import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';
import React from 'react'
import { NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import CountryLevelManureProductionTable from '../../components/tables/CountryLevelManureProductionTable';
import CountryLevelMilkProductionTable from '../../components/tables/CountryLevelMilkProductionTable';
import MCCManureProductionTable from '../../components/tables/MCCManureProductionTable';

const listOfVeterinaries = [
  {
    id: '1',
    date: 'July 10, 2023',
    farmerName: 'Karoli Rwanga',
    quantity: 500,
    period: 'Weekly',
  },
  {
    id: '2',
    date: 'July 10, 2023',
    farmerName: 'Mugisha Aime Bruce',
    quantity: 300,
    period: 'Weekly',
  },
  {
    id: '3',
    date: 'July 11, 2023',
    farmerName: 'Gakwandi Lambert',
    quantity: 600,
    period: 'Weekly',
  },
  {
    id: '4',
    date: 'July 12, 2023',
    farmerName: 'Uwimana Elie',
    quantity: 100,
    period: 'Weekly',
  },
  {
    id: '5',
    date: 'July 12, 2023',
    farmerName: 'Sibo Ulyse',
    quantity: 100,
    period: 'Weekly',
  },
];

const ManureProduction = () => {
  const params = useParams();
  const navigate = useNavigate();

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Manure</strong></HeaderTwo>
        <Button variant='contained' size='small' color='primary' type='button' onClick={(e) => { navigate('./add'); }}>Add</Button>  
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer style={{ width: '49%' }}>
          <MCCManureProductionTable data={listOfVeterinaries} />
        </VerticallyFlexGapContainer>
        <VerticallyFlexGapContainer style={{ width: '49%' }}>
          <Outlet />
          {!params.productionId || !window.location.pathname.includes('add') && 
            <VerticallyFlexSpaceBetweenContainer style={{ color: 'gray', background: '#c2d6d6', minHeight: '300px', alignItems: 'center', justifyContent: 'center' }}>
              <p>Select production data</p>
            </VerticallyFlexSpaceBetweenContainer>
          }
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ManureProduction