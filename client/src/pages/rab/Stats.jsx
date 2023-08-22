import React from 'react'
import { Helmet } from 'react-helmet-async'
import { HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import CountryLevelMilkProductionTable from '../../components/tables/CountryLevelMilkProductionTable'
import { useSelector } from 'react-redux'

const Stats = () => {

  const { isLoading: loadingManure, manureProductionOnCountryLevel, manureFilterType, manureFilterValue, amountOfManureProductionOnCountryLevel } = useSelector(state => state.manure);
  const { isLoading: loadingMilk, milkProductionOnCountryLevel, milkFilterType, milkFilterValue, amountOfMilkProductionOnCountryLevel } = useSelector(state => state.milk);
  const { isLoading: loadingMccs, allMCCs, numberOfAllMCCs } = useSelector(state => state.mcc);
  const { isLoading: loadingUsers, allMccEmployees, numberOfAllMccEmployees } = useSelector(state => state.user);

  return (
    <VerticallyFlexGapContainer>
      <Helmet>
        <title>RAB Dashboard - Home</title>
      </Helmet>
      
      <HorizontallyFlexSpaceBetweenContainer style={{ flexWrap: 'wrap', gap: '20px', alignItems: 'flex-start' }}>
        
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Milk </strong>- Records in {milkFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfMilkProductionOnCountryLevel} Ltrs</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <span style={{ textAlign:'left', width: '100%' }}><strong>Manure </strong>- Records in {manureFilterValue}</span>
          <HorizontallyFlexSpaceBetweenContainer style={{ alignItems: 'flex-end' }}>
            <HeaderTwo style={{ fontSize: '200%' }}>{amountOfManureProductionOnCountryLevel} Tones</HeaderTwo>
            <img src='/weekly-inputs.png' alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px', boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Registered MCCs vs Unregistered ones</strong>
          <HorizontallyFlexSpaceBetweenContainer>
            <img src='/RegisteredVsUnregistered.png' style={{ width: '100%' }} alt='' />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
        <VerticallyFlexGapContainer style={{ gap: '20px',boxShadow: '0px 2px 8px rgba(0,0,0,0.32)', background:'white', padding: '20px', borderRadius:'5px', width: '49%' }}>
          <strong style={{ textAlign:'left', width: '100%' }}>Milk Weekly Records</strong>
          <HorizontallyFlexSpaceBetweenContainer>
            <CountryLevelMilkProductionTable data={[]} />
          </HorizontallyFlexSpaceBetweenContainer>
        </VerticallyFlexGapContainer>
      
      </HorizontallyFlexSpaceBetweenContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Stats