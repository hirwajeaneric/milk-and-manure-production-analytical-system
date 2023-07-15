import React from 'react'
import { DetailsContainer, HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'

const VeterinaryDetails = () => {
  return (
    <VerticallyFlexGapContainer style={{ gap: '20px', background: 'white', padding: '20px', minHeight: '500px' }}>
      <HeaderTwo style={{ width: '100%', textAlign: 'left', borderBottom: '1px solid #a3c2c2', paddingBottom: '10px' }}>Veterinary Info</HeaderTwo>
      <VerticallyFlexGapContainer style={{ gap: '20px', overflowY: 'auto' }}>
        <DetailsContainer>
          <label>Name</label>
          <p>John Doe</p>
        </DetailsContainer>
        <DetailsContainer>
          <label>Phone</label>
          <p>0789434340</p>
        </DetailsContainer>
        <DetailsContainer>
          <label>Email</label>
          <p>john@gmail.com</p>
        </DetailsContainer>
        <DetailsContainer>
          <label>District</label>
          <p>Gatsibo</p>
        </DetailsContainer>
        <DetailsContainer>
          <label>Status</label>
          <p>Active</p>
        </DetailsContainer>        
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default VeterinaryDetails