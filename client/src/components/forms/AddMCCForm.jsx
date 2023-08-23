import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getmccsForSelectedDistrict } from "../../redux/features/mccSlice";
import { findSectors } from "../../utils/LocationManager";

export default function AddMCCForm() {
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ user, setUser ] = useState({})
    const [ sectors, setSectors ] = useState([]);
    const [ sector, setSector ] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('veterinary'));
        setUser(user);

        axios.get(`http://localhost:5050/api/v1/mmpas/locations/sectors?province=${user.province}&district=${user.district}`)
        .then(response => {
            setSectors(response.data.sectors);  
        })
        .catch(error => {
            console.log(error);
        })

    },[])

    const handleSectors = ({ currentTarget: target }) => {
        setSector(target.value);
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.province = user.province;
        data.district = user.district;
        data.sector = sector;

        console.log(data);

        setIsProcessing(true);

        try {
            const response = await axios.post(`${serverUrl}/api/v1/mmpas/mcc/add`, data);
            if (response.status === 201) {
                setIsProcessing(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
                dispatch(getmccsForSelectedDistrict({ district: user.district}));
                setTimeout(() => {
                    window.location.reload();
                }, 2000)
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing(false);
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        }
    };

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Add MCC</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="name">Full name</label>
                        <input 
                            type="text" 
                            id="name"
                            minLength='3'
                            placeholder="name" 
                            {...register("name", 
                            {required: true})} 
                            aria-invalid={errors.name ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                            <p role="alert">MCC name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="sector">Sector</label>
                        <select name='sector' onChange={handleSectors}>
                            <option value="">Select sector</option>
                            {sectors.map((sector, index) => {
                                return (
                                    <option key={index} value={sector}>{sector}</option>
                                )
                            })}
                        </select>
                    </FormElement>
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                    
                    {/* {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">Removing...</Button> 
                    : <Button variant="contained" color="error" size="small" type="submit">Remove</Button>
                    } */}
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}