import React, { useEffect } from 'react'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { DetailElement, MccInfoContainer } from '../../components/styles/PagesStyles';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import MCCEmployeeInDistrictTable from '../../components/tables/MCCEmployeeInDistrictTable';
import AddMCCEmployeeForm from '../../components/forms/AddMCCEmployeeForm';
import { getEmployeesForMcc } from '../../redux/features/userSlice';
import { getMccDetails } from '../../redux/features/mccSlice';
import { useDispatch } from 'react-redux';

export default function MCCInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    var user = JSON.parse(localStorage.getItem('veterinary'));
    dispatch(getEmployeesForMcc({mccCode: params.mccCode}));
    dispatch(getMccDetails({code: params.mccCode}));
  }, [])

  const { employeesOfSelectedMcc } = useSelector(state => state.user);
  const { isLoading, selectedMcc } = useSelector(state => state.mcc);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`List of mcc employees in ${params.district.toUpperCase()} District`}</title>
        <meta name="description" content={`List of mcc employees in ${params.district.toUpperCase()} District`} /> 
      </Helmet>
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>{selectedMcc.name}</strong></HeaderTwo>
      
      <MccInfoContainer style={{ gap: '10px' }}>
        
        <div className='left'>
          <h3 style={{ fontWeight: '400', paddingBottom: '10px', borderBottom: '1px solid gray', width: '100%' }}>More info</h3>
          <DetailElement>
            <label>Code</label>
            <p>{selectedMcc.code}</p>
          </DetailElement>
          <DetailElement>
            <label>Status</label>
            <p>{selectedMcc.status}</p>
          </DetailElement>
          <DetailElement>
            <label>Province</label>
            <p>{selectedMcc.province}</p>
          </DetailElement>
          <DetailElement>
            <label>District</label>
            <p>{selectedMcc.district}</p>
          </DetailElement>
          <DetailElement>
            <label>Sector</label>
            <p>{selectedMcc.sector}</p>
          </DetailElement>
          <DetailElement>
            <label>Registerd on</label>
            <p>{new Date(selectedMcc.registrationdate).toUTCString()}</p>
          </DetailElement>
        </div>

        <div className='right'>
          <div className='register-employee'>
            <AddMCCEmployeeForm />
          </div>
          <div className='employee-table-container'>
            <p>{`List of employees in ${selectedMcc.name}`}</p>
            <MCCEmployeeInDistrictTable data={employeesOfSelectedMcc} />
          </div>
        </div>
      </MccInfoContainer>
    
    </VerticallyFlexGapContainer>
  )
};