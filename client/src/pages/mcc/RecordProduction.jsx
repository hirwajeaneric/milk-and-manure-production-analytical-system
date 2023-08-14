import React from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async';
import AddMilkProductionForm from '../../components/forms/AddMilkProductionForm';
import AddManureProductionForm from '../../components/forms/AddManureProductionForm';

const RecordProduction = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`Record milk and manure production`}</title>
        <meta name="description" content={`Record milk and manure production`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Record Production</strong></HeaderTwo>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <AddMilkProductionForm />
        <AddManureProductionForm />
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default RecordProduction