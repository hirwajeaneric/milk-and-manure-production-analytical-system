import React from 'react'
import { HeaderTwo, VerticallyFlexGapContainer } from '../../components/styles/GenericStyles'
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { useReactToPrint } from 'react-to-print';
import { ComponentToPrint } from '../../components/ComponentToPrint';

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
      
      <HeaderTwo style={{ width: '100%', textAlign: 'left' }}><strong>Veterinaries</strong></HeaderTwo>

      <VerticallyFlexGapContainer style={{ gap: '20px', alignItems: 'flex-start' }}>
      <ComponentToPrint ref={componentRef} />

      <Button variant='contained' size='small' color='secondary' onClick={handlePrint}>Print</Button>      
      </VerticallyFlexGapContainer>
    </VerticallyFlexGapContainer>
  )
}

export default ReportPreview