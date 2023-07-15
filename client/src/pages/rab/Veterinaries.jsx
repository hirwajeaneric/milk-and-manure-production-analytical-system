import React from 'react'
import { Outlet } from 'react-router-dom'
import { HeaderTwo, HorizontallyFlexGapContainer, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import VeterinaryTable from '../../components/tables/VeterinaryTable'

const listOfVeterinaries = [
  {
    id: '1',
    fullName: 'Mugaba Karoli',
    phone: '0780432332',
    email: 'karoli@gmail.com',
    district: 'Gasabo',
    status: 'active',
  },
  {
    id: '2',
    fullName: 'John Doe',
    phone: '0780432332',
    email: 'john@gmail.com',
    district: 'Gatsibo',
    status: 'active',
  },
  {
    id: '3',
    fullName: 'Kirenga Bryan',
    phone: '07804323221',
    email: 'kirengabryan@gmail.com',
    district: 'Gasabo',
    status: 'active',
  },
  {
    id: '4',
    fullName: 'Kalinganire Ishimwe Alpha Michelange',
    phone: '0790332332',
    email: 'mikelange@gmail.com',
    district: 'Gasabo',
    status: 'active',
  },
  {
    id: '5',
    fullName: 'Hirwa Jean Eric',
    phone: '0780432332',
    email: 'hirwa@gmail.com',
    district: 'Gasabo',
    status: 'active',
  },
];

const Veterinaries = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Veterinaries</strong></HeaderTwo>
      <HorizontallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <VerticallyFlexGapContainer style={{ }}>
          <VeterinaryTable data={listOfVeterinaries} />
        </VerticallyFlexGapContainer>
        <VerticallyFlexGapContainer style={{ width: '40%' }}>
          <Outlet />
        </VerticallyFlexGapContainer>
      </HorizontallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default Veterinaries