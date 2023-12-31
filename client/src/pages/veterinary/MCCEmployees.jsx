import React, { useEffect } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import MCCEmployeeInDistrictTable from '../../components/tables/MCCEmployeeInDistrictTable';
import AddMCCEmployeeForm from '../../components/forms/AddMCCEmployeeForm';
import { getEmployeesInDistrict } from '../../redux/features/userSlice';

const MCCEmployees = () => {
  const params = useParams();

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('veterinary'));
    getEmployeesInDistrict(user.district);
  }, [])

  const { isLoading, employeesOfSelectedDistrict } = useSelector(state => state.user);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of mcc employees in ${params.district.toUpperCase()} District`}</title>
        <meta name="description" content={`List of mcc employees in ${params.district.toUpperCase()} District`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>{`MCC Employees in ${params.district.toUpperCase()}`}</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '10px', alignItems: 'flex-start' }}>
        <AddMCCEmployeeForm />
        <MCCEmployeeInDistrictTable data={employeesOfSelectedDistrict} />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default MCCEmployees;