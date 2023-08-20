import { FormElement, HeaderTwo, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AddManureProductionForm() {
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState({add: false, update: false, delete: false});
    const params = useParams();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { farmersForSelectedDistrict } = useSelector(state => state.user);

    const onSubmit = (data) => {
        data.farmerId = data.farmer.split('--')[1];
        data.farmerName = data.farmer.split('--')[0];
        data.farmerPhone = data.phone;
        data.mccId = JSON.parse(localStorage.getItem('mccUser')).mccId;
        data.mccName = JSON.parse(localStorage.getItem('mccUser')).mccName;
        data.district = JSON.parse(localStorage.getItem('mccUser')).district;
        
        setIsProcessing({...isProcessing, add: true });

        axios.post(`${serverUrl}/api/v1/mmpas/manure/add`, data)
        .then(response => {
            if (response.status === 201) {
                setIsProcessing({...isProcessing, add: false});
                setResponseMessage({ message: response.data.message, severity: 'success'});
                setOpen(true);
                window.location.replace(`/mcc/${params.code}/production/manure`);
            }
        })
        .catch(error => {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing({...isProcessing, add: false});
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        })
    };

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Register manure production</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <VerticallyFlexGapContainer style={{ gap: '15px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="confirmPassword">Farmer</label>
                        <select {...register("farmer", { required: true })}>
                            <option value="">Select Farmer</option>
                            {farmersForSelectedDistrict.length !== 0 && 
                                farmersForSelectedDistrict.map((element, index) => {
                                    return (
                                        <option key={index} value={element.fullname+"--"+element.id}>{element.fullname}</option>
                                    )
                                })}
                        </select>
                        {errors.farmer?.type === "required" && (
                            <p role="alert">Required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="phone">Phone number</label>
                        <input 
                            type="phone" 
                            id="phone"
                            maxLength='10'
                            placeholder="Phone number" 
                            {...register("phone", 
                            {required: true})} 
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone?.type === "required" && (
                            <p role="alert">Phone</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="quantity">Manure quantity in Kilograms</label>
                        <input 
                            type="number" 
                            id="quantity"
                            maxLength='10'
                            placeholder="Manure quantity" 
                            {...register("quantity", 
                            {required: true})} 
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.quantity?.type === "required" && (
                            <p role="alert">Quantity</p>
                        )}
                    </FormElement>
                </VerticallyFlexGapContainer>

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    {isProcessing.add
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                    
                    {isProcessing.update 
                    ? <Button disabled variant="contained" color="primary" size="small">Updating...</Button> 
                    : <Button variant="contained" color="secondary" size="small" type="submit">Update</Button>
                    }
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}