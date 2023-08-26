import React, { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useDispatch, useSelector } from 'react-redux'
import { getMilkProductionOnMCCLevel } from '../../redux/features/milkProductionSlice'
import { getManureProductionOnMCCLevel } from '../../redux/features/manureProductionSlice'
import MilkYearMonthChart from '../../components/charts/MilkYearMonthChart'
import ManureYearMonthChart from '../../components/charts/ManureYearMonthChart'

const Stats = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManureProductionOnMCCLevel({ mccId: JSON.parse(localStorage.getItem('mccUser')).mccId, periodType: 'year', periodValue: new Date().getFullYear()}))
    dispatch(getMilkProductionOnMCCLevel({ mccId: JSON.parse(localStorage.getItem('mccUser')).mccId, periodType: 'year', periodValue: new Date().getFullYear()}))
  },[dispatch])

  const { 
    amountOfMilkProductionOnMccLevel, 
    comparativeMilkProductionStatsMCCLevel,
    milkFilterType, 
    milkFilterValue, 
    milkProductionOnMccLevel 
  } = useSelector(state => state.milk);
  
  const { 
    amountOfManureProductionOnMccLevel,
    comparativeManureProductionStatsMCCLevel, 
    manureFilterType, 
    manureFilterValue, 
    manureProductionOnMccLevel 
  } = useSelector(state => state.manure);

  return (
    <VerticallyFlexGapContainer>
      <Helmet>
        <title>{`MCC - ${JSON.parse(localStorage.getItem('mccUser')).mccName} - Dashboard`}</title>
        <meta name="description" content={`MCC - ${JSON.parse(localStorage.getItem('mccUser')).mccName} - Dashboard`} />
      </Helmet>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
        <span style={{ textAlign:'left', width: '100%' }}><strong>Milk </strong>- Records in {milkFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfMilkProductionOnMccLevel} Ltrs</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Manure </strong>- Records in {manureFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfManureProductionOnMccLevel} Tones</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px', boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '100%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Comparison of Milk production for year 2022 and 2023</strong>
          <MilkYearMonthChart data={comparativeMilkProductionStatsMCCLevel} />            
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px',boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '100%' }}>
        <strong style={{ textAlign:'left', width: '100%' }}>Comparison of Manure production for year 2022 and 2023</strong>
          <ManureYearMonthChart data={comparativeManureProductionStatsMCCLevel}/>            
        </VerticallyFlexGapContainer>
      
      </HorizontallyFlexSpaceBetweenContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats