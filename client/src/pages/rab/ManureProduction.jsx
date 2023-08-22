import React from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import CountryLevelManureProductionTable from '../../components/tables/CountryLevelManureProductionTable';
import { useSelector } from 'react-redux';

const ManureProduction = () => {

  const { manureProductionOnCountryLevel } = useSelector(state => state.manure);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Manure</strong></HeaderTwo> 
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer>
          <CountryLevelManureProductionTable data={manureProductionOnCountryLevel} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ManureProduction