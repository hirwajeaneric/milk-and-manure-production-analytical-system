import React, { useEffect, useState } from 'react'
import { ReportPaperContainer } from '../styled-components/ReportStyledComponents';
import { useParams } from 'react-router-dom';
import { HeaderThree, LeftContainer, RightContainer, TenantCard, TwoSidedContainer } from '../styled-components/generalComponents';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    // FORM PROCESSING AND RESPONSE PROVISION
    const params =  useParams();

    return (
        <ReportPaperContainer ref={ref}>
            
            <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
        </ReportPaperContainer>
    )
})