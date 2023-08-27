import { FormElement, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function FilterForm(props) {
    const { handleCloseModal } = props;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ filterData, setProductionType ] = useState({});

    const handleFilterData = ({ currentTarget: target }) => {
        setProductionType({...filterData, [target.name]:target.value});
    }

    const submitReport = (e) => {
        e.preventDefault();

        dispatch({type: 'report/setReport', payload: filterData});
        handleCloseModal();
        navigate(`/rab/report-preview`);
    };

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Choose filter period</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={submitReport}>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="type">Report type</label>
                    <select name="type" onChange={handleFilterData}>
                        <option value="">Choose production type</option>
                        <option value="milk">Milk</option>
                        <option value="manure">Manure</option>
                    </select>
                </FormElement>
                <FormElement style={{ color: 'gray' }}>
                    <label htmlFor="location">Location</label>
                    <select name="location" onChange={handleFilterData}>
                        <option value="">Choose location</option>
                        <option value="country">Country</option>
                        <option value="district">District</option>
                    </select>
                </FormElement>

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    <Button variant="contained" color="primary" size="small" type="submit">Generate</Button>
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}