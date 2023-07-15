import React from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import CountryLevelMilkProductionTable from '../../components/tables/CountryLevelMilkProductionTable';

const listOfVeterinaries = [
  {
    id: '1',
    district: 'Gatsibo',
    quantity: 60000,
    period: 'Weekly',
  },
  {
    id: '2',
    district: 'Rubavu',
    quantity: 50000,
    period: 'Weekly',
  },
  {
    id: '3',
    district: 'Nyagatare',
    quantity: 40000,
    period: 'Weekly',
  },
  {
    id: '4',
    district: 'Rwamagana',
    quantity: 40000,
    period: 'Weekly',
  },
  {
    id: '5',
    district: 'Gicumbi',
    quantity: 40000,
    period: 'Weekly',
  },
];

const MilkProduction = () => {
  const params = useParams();

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Milk</strong></HeaderTwo>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer style={{ width: '49%' }}>
          <CountryLevelMilkProductionTable data={listOfVeterinaries} />
        </VerticallyFlexGapContainer>
        <VerticallyFlexGapContainer style={{ width: '49%' }}>
          <Outlet />
          {!params.productionId && 
            <VerticallyFlexSpaceBetweenContainer style={{ color: 'gray', background: '#c2d6d6', minHeight: '300px', alignItems: 'center', justifyContent: 'center' }}>
              <p>Select production data</p>
            </VerticallyFlexSpaceBetweenContainer>
          }
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default MilkProduction