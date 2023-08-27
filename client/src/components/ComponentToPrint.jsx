import React, { useEffect, useState } from 'react'
import { ReportHeader, TopBar, TableList, ReportBody, ReportFooter, InstitutionDetails, ReportPaperContainer } from './styles/ReportStyledComponents';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const ComponentToPrint = React.forwardRef((props, ref) => {
    // FORM PROCESSING AND RESPONSE PROVISION
    const params =  useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('rabUser')));
    },[])

    const { type, location } = useSelector(state => state.report);
    const { milkProductionOnCountryLevel } = useSelector(state => state.milk);
    const { manureProductionOnCountryLevel } = useSelector(state => state.manure);
    const { allmccs } = useSelector(state => state.mcc);

    return (
        <>
            {/* MILK REPORT  */}
            {type === 'milk' && location === 'country' && 
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
                                <p>Report period: Year {new Date().getFullYear()}</p>
                            </div>
                            <div right='right'>
                                <p>Generated on: {new Date().toDateString()}</p>
                                <p>By: {user.fullName}</p>
                            </div>
                        </div>
                    </ReportHeader>

                    <ReportBody>
                        <p>The table bellow contains milk production data from all districts in Rwanda</p>

                        <TableList>
                            <thead>
                                <tr>
                                    <th>District</th>
                                    <th>Quantity in Litres</th>
                                </tr>
                            </thead>
                            <tbody>
                                {milkProductionOnCountryLevel && 
                                    milkProductionOnCountryLevel.map((production, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{production.district}</td>
                                                <td>{production.totalMilkProduction}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableList>

                    </ReportBody>

                    <ReportFooter>
                        <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
                    </ReportFooter>
                </ReportPaperContainer>
            }
   
            {/* MANURE REPORT  */}
            {type === 'manure' && location === 'country' && 
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
                        <h3>General Manure Production Report</h3>
                        
                        <div className='report-period'>
                            <div className='left'>
                                <p>Report period: Year 2023</p>
                            </div>
                            <div right='right'>
                                <p>Generated on: {new Date().toDateString()}</p>
                                <p>By: {user.fullName}</p>
                            </div>
                        </div>
                    </ReportHeader>

                    <ReportBody>
                        <p>The table bellow contains manure production data from all districts in Rwanda</p>

                        <TableList>
                            <thead>
                                <tr>
                                    <th>District</th>
                                    <th>Quantity in Kilograms</th>
                                </tr>
                            </thead>
                            <tbody>
                                {manureProductionOnCountryLevel && 
                                    manureProductionOnCountryLevel.map((production, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{production.district}</td>
                                                <td>{production.totalManureProduction}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableList>
                    </ReportBody>

                    <ReportFooter>
                        <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
                    </ReportFooter>
                </ReportPaperContainer>
            }

            {/* MCCS  */}
            {type === 'mccs' && 
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
                        <h3>Milk Collection Centers</h3>
                        
                        <div className='report-period'>
                            <div className='left'>
                                <p>Report period: Year [new Date().getFullYear()]</p>
                                {/* <p>District: Gasabo</p> */}
                            </div>
                            <div right='right'>
                                <p>Generated on: {new Date().toDateString()}</p>
                                <p>By: {user.fullName}</p>
                            </div>
                        </div>
                    </ReportHeader>

                    <ReportBody>
                        <p>The table bellow contains a list of all Milk Collection Centers operating in Rwanda</p>

                        <TableList>
                            <thead>
                                <tr>
                                    <th>MCC Code</th>
                                    <th>MCC Name</th>
                                    {/* <th>Quantity in tones</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {allmccs && 
                                    allmccs.map((mcc, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{mcc.district}</td>
                                                <td>{mcc.name}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </TableList>

                    </ReportBody>

                    <ReportFooter>
                        <p>Copyright {new Date().getFullYear()} &copy; MMPAS. All Rights Reserved. </p>
                    </ReportFooter>
                </ReportPaperContainer>
            }
        </>
    )
})