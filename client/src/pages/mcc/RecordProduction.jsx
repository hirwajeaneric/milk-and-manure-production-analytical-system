import React from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import AddFarmersForm from '../../components/forms/AddFarmersForm';

const RecordProduction = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`Record milk and manure production`}</title>
        <meta name="description" content={`Record milk and manure production`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Record Production</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <AddFarmersForm />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default RecordProduction