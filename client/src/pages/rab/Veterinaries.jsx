import React from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import VeterinaryTable from '../../components/tables/VeterinaryTable'
import { useSelector } from 'react-redux';
import AddVeterinaryForm from '../../components/forms/AddVeterinaryForm';

const Veterinaries = () => {
  const { isLoading, allVeterinaries } = useSelector(state => state.user);


  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Veterinaries</strong></HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <AddVeterinaryForm />
        <VeterinaryTable data={allVeterinaries} />
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Veterinaries