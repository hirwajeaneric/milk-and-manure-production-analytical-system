import React from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import DistrictManureProductionTable from '../../components/tables/DistrictManureProductionTable';
import { useSelector } from 'react-redux';

const ManureProduction = () => {

  const { manureProductionOnDistrictLevel } = useSelector(state => state.manure);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Manure</strong></HeaderTwo> 
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer>
          <DistrictManureProductionTable data={manureProductionOnDistrictLevel} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ManureProduction