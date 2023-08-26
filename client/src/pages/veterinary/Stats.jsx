import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles';
import { useSelector } from 'react-redux'
import MilkYearMonthChart from '../../components/charts/MilkYearMonthChart'
import ManureYearMonthChart from '../../components/charts/ManureYearMonthChart'

const Stats = () => {

  const { 
    isLoading: loadingManure, 
    manureProductionOnCountryLevel, 
    manureFilterType, 
    comparativeManureProductionStatsDistrictLevel, 
    manureFilterValue, 
    amountOfManureProductionOnDistrictLevel 
  } = useSelector(state => state.manure);
  
  const { 
    isLoading: loadingMilk, 
    milkProductionOnCountryLevel, 
    milkFilterType, 
    comparativeMilkProductionStatsDistrictLevel, 
    milkFilterValue, 
    amountOfMilkProductionOnDistrictLevel 
  } = useSelector(state => state.milk);
  
  const { 
    isLoading: loadingMccs, 
    allMCCs, 
    numberOfAllMCCs 
  } = useSelector(state => state.mcc);
  
  const { 
    isLoading: loadingUsers, 
    allMccEmployees, 
    numberOfAllMccEmployees 
  } = useSelector(state => state.user);




  return (
    <VerticallyFlexGapContainer>
      <Helmet>
        <title>Veterinary Dashboard - Home</title>
      </Helmet>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Milk </strong>- Records in {milkFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfMilkProductionOnDistrictLevel} Ltrs</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Manure </strong>- Records in {manureFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfManureProductionOnDistrictLevel} Tones</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px', boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '100%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Comparison of Milk production for year 2022 and 2023</strong>
          <MilkYearMonthChart data={comparativeMilkProductionStatsDistrictLevel} />            
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px',boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '100%' }}>
        <strong style={{ textAlign:'left', width: '100%' }}>Comparison of Manure production for year 2022 and 2023</strong>
          <ManureYearMonthChart data={comparativeManureProductionStatsDistrictLevel}/>            
        </VerticallyFlexGapContainer>
      
      </HorizontallyFlexSpaceBetweenContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats