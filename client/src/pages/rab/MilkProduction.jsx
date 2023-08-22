import React from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import CountryLevelMilkProductionTable from '../../components/tables/CountryLevelMilkProductionTable';

const MilkProduction = () => {
  const { milkProductionOnCountryLevel } = useSelector(state => state.milk);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Milk</strong></HeaderTwo>  
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer>
          <CountryLevelMilkProductionTable data={milkProductionOnCountryLevel} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default MilkProduction