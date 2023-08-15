import React, { useEffect, useState } from 'react'
import { ReportPaperContainer } from './styles/ReportStyledComponents';
import { useParams } from 'react-router-dom';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    // FORM PROCESSING AND RESPONSE PROVISION
    const params =  useParams();

    return (
        <ReportPaperContainer ref={ref}>
            <h1>Hello world!</h1>
            <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})