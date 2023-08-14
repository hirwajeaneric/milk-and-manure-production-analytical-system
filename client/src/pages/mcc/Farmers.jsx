import React from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import AddFarmersForm from '../../components/forms/AddFarmersForm';
import FarmerTable from '../../components/tables/FarmerTable';

const Farmers = () => {
  const { isLoading, farmersForSelectedDistrict } = useSelector(state => state.user);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of farmers delivering production to ${JSON.parse(localStorage.getItem('mccUser')).mccName}`}</title>
        <meta name="description" content={`List of farmers delivering production to ${JSON.parse(localStorage.getItem('mccUser')).mccName}`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Farmers</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <AddFarmersForm />
        <FarmerTable data={farmersForSelectedDistrict} />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Farmers