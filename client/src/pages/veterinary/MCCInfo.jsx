import React, { useEffect } from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import MCCEmployeeInDistrictTable from '../../components/tables/MCCEmployeeInDistrictTable';
import AddMCCEmployeeForm from '../../components/forms/AddMCCEmployeeForm';
import { getEmployeesInDistrict } from '../../redux/features/userSlice';
import { getMccDetails } from '../../redux/features/mccSlice';
import { useDispatch } from 'react-redux';

export default function MCCInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('veterinary'));
    dispatch(getEmployeesInDistrict(user.district));
    dispatch(getMccDetails({id: params.mccId}));
  }, [])

  const { employeesOfSelectedDistrict } = useSelector(state => state.user);
  const { isLoading, selectedMcc } = useSelector(state => state.mcc);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of mcc employees in ${params.district.toUpperCase()} District`}</title>
        <meta name="description" content={`List of mcc employees in ${params.district.toUpperCase()} District`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>{`MCC Employees in ${params.district.toUpperCase()}`}</strong></HeaderTwo>
      <HorizontallyFlexGapContainer>
        <VerticallyFlexGapContainer>
          <DetailElement>
            
          </DetailElement>
        </VerticallyFlexGapContainer>
        <VerticallyFlexGapContainer style={{ gap: '10px', alignItems: 'flex-start' }}>
          <AddMCCEmployeeForm />
          <MCCEmployeeInDistrictTable data={employeesOfSelectedDistrict} />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
};