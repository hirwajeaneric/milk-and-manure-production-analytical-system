import React, { useEffect } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { DetailElement, MccInfoContainer } from '../../components/styles/PagesStyles';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { getEmployeesForMcc } from '../../redux/features/userSlice';
import { getMccDetails } from '../../redux/features/mccSlice';
import { useDispatch } from 'react-redux';
import MCCEmployeeInDistrictLongTable from '../../components/tables/MCCEmployeeInDistrictLongTable';

export default function MCCInfo() {
  const params = useParams();
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getEmployeesForMcc({mccId: params.mccId}));
    dispatch(getMccDetails({id: params.mccId}));
  }, [])

  const { employeesOfSelectedMcc } = useSelector(state => state.user);
  const { isLoading, selectedMcc } = useSelector(state => state.mcc);

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>{`MCC Info`}</title>
        <meta name="description" content={`MCC Info and employees`} /> 
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
          <div className='employee-table-container'>
            <p>{`List of employees in ${selectedMcc.name}`}</p>
            <MCCEmployeeInDistrictLongTable data={employeesOfSelectedMcc} />
          </div>
        </div>
      </MccInfoContainer>
    
    </VerticallyFlexGapContainer>
  )
};