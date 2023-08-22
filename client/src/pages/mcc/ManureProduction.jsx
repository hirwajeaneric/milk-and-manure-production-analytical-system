import { Button } from '@mui/material';
import React, { useEffect } from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from '../../components/styles/GenericStyles'
import MCCManureProductionTable from '../../components/tables/MCCManureProductionTable';
import { useDispatch, useSelector } from 'react-redux';
import { getManureProductionOnMCCLevel } from '../../redux/features/manureProductionSlice';
import { useNavigate, useParams } from 'react-router-dom';

const ManureProduction = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getManureProductionOnMCCLevel({ mccId: JSON.parse(localStorage.getItem('mccUser')).mccId, periodType: 'year', periodValue: new Date().getFullYear()}))
  },[dispatch])

  const { manureProductionOnMccLevel } = useSelector(state => state.manure);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HorizontallyFlexSpaceBetweenContainer>
        <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Manure</strong></HeaderTwo>
        <Button variant='contained' size='small' color='primary' type='button' onClick={(e) => { navigate(`/mcc/${params.code}/record`) }}>Add</Button>  
      </HorizontallyFlexSpaceBetweenContainer>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer>
          <MCCManureProductionTable data={manureProductionOnMccLevel} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ManureProduction