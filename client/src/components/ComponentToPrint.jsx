import React, { useEffect, useState } from 'react'
import { ReportHeader, TopBar, TableList, ReportBody, ReportFooter, InstitutionDetails, ReportPaperContainer } from './styles/ReportStyledComponents';
import { useParams } from 'react-router-dom';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    // FORM PROCESSING AND RESPONSE PROVISION
    const params =  useParams();

    return (
        <ReportPaperContainer ref={ref}>
            <TopBar>
                <img src='/RAB_Logo2.png' alt='' />
                <InstitutionDetails>
                    <h1>RAB</h1>
                    <p>Location: Kigali, Rwanda</p>
                    <p>Email: info@rab.gov.rw</p>
                    <p>Phone: 0780599839</p>
                </InstitutionDetails>
            </TopBar>
            <ReportHeader>
                <h2>Milk and Manure Production Analytical System</h2>
                <h3>General Milk Production Report</h3>
                
                <div className='report-period'>
                    <div className='left'>
                        <p>Report period: Year 2023</p>
                    </div>
                    <div right='right'>
                        <p>Generated on: {new Date().toDateString()}</p>
                        <p>By: Impuhwe Stella</p>
                    </div>
                </div>
            </ReportHeader>

            <ReportBody>
                <p>The table bellow contains milk production data from all provinces in Rwanda</p>

                <TableList>
                    <thead>
                        <tr>
                            <th>Province</th>
                            <th>Quantity in Litres</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Kigali City</td>
                            <td>100000</td>
                        </tr>
                        <tr>
                            <td>Northern province</td>
                            <td>470000</td>
                        </tr>
                        <tr>
                            <td>Southern province</td>
                            <td>500000</td>
                        </tr>
                        <tr>
                            <td>Eastern province</td>
                            <td>600000</td>
                        </tr>
                        <tr>
                            <td>Western province</td>
                            <td>440000</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td>2110000</td>
                        </tr>
                    </tbody>
                </TableList>

            </ReportBody>

            <ReportFooter>
                <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
            </ReportFooter>
        </ReportPaperContainer>
   
    //         <ReportPaperContainer ref={ref}>
    //     <TopBar>
    //         <img src='/RAB_Logo2.png' alt='' />
    //         <InstitutionDetails>
    //             <h1>RAB</h1>
    //             <p>Location: Kigali, Rwanda</p>
    //             <p>Email: info@rab.gov.rw</p>
    //             <p>Phone: 0780599839</p>
    //         </InstitutionDetails>
    //     </TopBar>
    //     <ReportHeader>
    //         <h2>Milk and Manure Production Analytical System</h2>
    //         <h3>General Manure Production Report</h3>
            
    //         <div className='report-period'>
    //             <div className='left'>
    //                 <p>Report period: Year 2023</p>
    //             </div>
    //             <div right='right'>
    //                 <p>Generated on: {new Date().toDateString()}</p>
    //                 <p>By: Impuhwe Stella</p>
    //             </div>
    //         </div>
    //     </ReportHeader>

    //     <ReportBody>
    //         <p>The table bellow contains manure production data from all provinces in Rwanda</p>

    //         <TableList>
    //             <thead>
    //                 <tr>
    //                     <th>Province</th>
    //                     <th>Quantity in tones</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td>Kigali City</td>
    //                     <td>50000</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Northern province</td>
    //                     <td>60000</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Southern province</td>
    //                     <td>65000</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Eastern province</td>
    //                     <td>64000</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Western province</td>
    //                     <td>60000</td>
    //                 </tr>
    //                 <tr>
    //                     <td>Total</td>
    //                     <td>251000</td>
    //                 </tr>
    //             </tbody>
    //         </TableList>

    //     </ReportBody>

    //     <ReportFooter>
    //         <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
    //     </ReportFooter>
    // </ReportPaperContainer>


    // <ReportPaperContainer ref={ref}>
    //     <TopBar>
    //         <img src='/RAB_Logo2.png' alt='' />
    //         <InstitutionDetails>
    //             <h1>RAB</h1>
    //             <p>Location: Kigali, Rwanda</p>
    //             <p>Email: info@rab.gov.rw</p>
    //             <p>Phone: 0780599839</p>
    //         </InstitutionDetails>
    //     </TopBar>
    //     <ReportHeader>
    //         <h2>Milk and Manure Production Analytical System</h2>
    //         <h3>Milk Collection Centers</h3>
            
    //         <div className='report-period'>
    //             <div className='left'>
    //                 <p>Report period: Year 2023</p>
    //                 <p>District: Gasabo</p>
    //             </div>
    //             <div right='right'>
    //                 <p>Generated on: {new Date().toDateString()}</p>
    //                 <p>By: Muyango Bailly</p>
    //             </div>
    //         </div>
    //     </ReportHeader>

    //     <ReportBody>
    //         <p>The table bellow contains a list of all milk collection centers operating in Gasabo district</p>

    //         <TableList>
    //             <thead>
    //                 <tr>
    //                     <th>MCC Code</th>
    //                     <th>MCC Name</th>
    //                     {/* <th>Quantity in tones</th> */}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td>gasabo01</td>
    //                     <td>Kagugu Milk Collection Center</td>
    //                 </tr>
    //                 <tr>
    //                     <td>gasabo02</td>
    //                     <td>Giramata</td>
    //                 </tr>
    //                 <tr>
    //                     <td>gasabo03</td>
    //                     <td>Ndera MCC Cooperative</td>
    //                 </tr>
    //             </tbody>
    //         </TableList>

    //     </ReportBody>

    //     <ReportFooter>
    //         <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
    //     </ReportFooter>
    // </ReportPaperContainer>
    )
})