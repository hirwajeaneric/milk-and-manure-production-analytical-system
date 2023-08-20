import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import MCCMilkProductionTable from '../../components/tables/MCCMilkProductionTable';
import { useDispatch, useSelector } from 'react-redux';
import { getMilkProductionOnMCCLevel } from '../../redux/features/milkProductionSlice';

const MilkProduction = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMilkProductionOnMCCLevel({ mccId: JSON.parse(localStorage.getItem('mccUser')).mccId, periodType: 'year', periodValue: new Date().getFullYear()}))
  },[])

  const { milkProductionOnMccLevel } = useSelector(state => state.milk);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Manure</strong></HeaderTwo>
        <Button variant='contained' size='small' color='primary' type='button' onClick={(e) => { navigate('./add'); }}>Add</Button>  
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer>
          <MCCMilkProductionTable data={milkProductionOnMccLevel} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default MilkProduction