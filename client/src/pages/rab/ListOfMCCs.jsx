import React, { useEffect } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getmccsForSelectedDistrict } from '../../redux/features/mccSlice';
import CountryLevelMCCTable from '../../components/tables/CountryLevelMCCTable';

export default function ListOfMCCs() {
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('veterinary'));
    getmccsForSelectedDistrict(user.district);
  }, [])

  const { isLoading, allmccs } = useSelector(state => state.mcc);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of mccs on the country level`}</title>
        <meta name="description" content={`List of mccs on the country level`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>{`MCCs in Rwanda`}</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '10px', alignItems: 'flex-start' }}>
        <CountryLevelMCCTable data={allmccs} />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}