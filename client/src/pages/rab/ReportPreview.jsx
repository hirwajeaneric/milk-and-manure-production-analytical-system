import React, { useRef } from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { Helmet } from 'react-helmet-async';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../components/ComponentToPrint';
import { Button } from "@mui/material";

const ReportPreview = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
      content: () => componentRef.current
  });

  return (
    <VerticallyFlexGapContainer style={{ gap: '20px' }}>
      <Helmet>
        <title>Report preview</title>
        <meta name="description" content={`Report preview`} /> 
      </Helmet>
    
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Report preview </strong></HeaderTwo>
      <Button variant='contained' size='small' color='secondary' onClick={handlePrint}>Print</Button>

      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
        <ComponentToPrint ref={componentRef} />      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ReportPreview