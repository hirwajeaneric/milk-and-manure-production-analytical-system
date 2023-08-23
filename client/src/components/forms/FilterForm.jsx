import { FormElement, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function FilterForm() {
    const dispatch = useDispatch();
    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ filterPeriodType, setFilterPeriodType ] = useState('');
    const [ filterPeriodValue, setFilterPeriodValue ] = useState('');

    const handleFilterPeriodType = ({ currentTarget: target }) => {
        setFilterPeriodType(target.value);
    }

    const handleFilterPeriodValue = ({ currentTarget: target }) => {
        setFilterPeriodValue(target.value);

        if (target.name === 'periodType') {

        }
    }

    const submitFilterValues = (e) => {
        e.preventDefault();

        console.log(filterPeriodType);
        console.log(filterPeriodValue);
    };

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Choose filter period</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={submitFilterValues}>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="periodType">Period type</label>
                    <select onChange={handleFilterPeriodType}>
                        <option value="">Choose period</option>
                        <option value="year">Year</option>
                        <option value="month">Month</option>
                    </select>
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="periodValue">Year</label>
                    <select onChange={handleFilterPeriodValue}>
                        <option value="">Choose year</option>
                        <option value="2021">2021</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                    </select>
                </FormElement>

                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="periodValue">Month</label>
                    <select onChange={handleFilterPeriodValue}>
                        <option value="">Choose month</option>
                        <option value="1">January</option>
                        <option value="2">February</option>
                        <option value="3">March</option>
                        <option value="4">April</option>
                        <option value="5">May</option>
                        <option value="6">June</option>
                        <option value="7">July</option>
                        <option value="8">August</option>
                        <option value="9">September</option>
                        <option value="10">October</option>
                        <option value="11">November</option>
                        <option value="12">December</option>
                    </select>
                </FormElement>

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}