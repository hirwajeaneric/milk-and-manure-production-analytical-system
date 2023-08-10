import React, { useEffect, useState } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import DistrictLevelMCCTable from '../../components/tables/DistrictLevelMCCTable';
import { useParams } from 'react-router-dom';
import AddMCCForm from '../../components/forms/AddMCCForm';
import { getmccsForSelectedDistrict } from '../../redux/features/mccSlice';

const ListAddMCCs = () => {
  const params = useParams();

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('veterinary'));
    getmccsForSelectedDistrict(user.district);
  }, [])

  const { isLoading, mccForSelectedDistrict } = useSelector(state => state.mcc);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of MCCs in ${params.district.toUpperCase()} District`}</title>
        <meta name="description" content={`List of mccs in ${params.district.toUpperCase()} District`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>{`MCCs in ${params.district.toUpperCase()}`}</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '10px', alignItems: 'flex-start' }}>
        <AddMCCForm />
        <DistrictLevelMCCTable data={mccForSelectedDistrict} />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ListAddMCCs;