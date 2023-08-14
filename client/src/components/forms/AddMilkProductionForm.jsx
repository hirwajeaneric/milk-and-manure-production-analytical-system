import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFarmers } from "../../redux/features/userSlice";

export default function AddMilkProductionForm() {
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.role = 'farmer';
        data.district = JSON.parse(localStorage.getItem('mccUser')).district;

        setIsProcessing(true);

        try {
            const response = await axios.post(`${serverUrl}/api/v1/mmpas/otheruser/signup`, data);
            if (response.status === 201) {
                setIsProcessing(false);
                dispatch(getFarmers());
                window.location.reload();
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setIsProcessing(false);
                setResponseMessage({ message: error.response.data.msg, severity: 'error' });
                setOpen(true);
            }
        }
    };

    const { isLoading, farmersForSelectedDistrict } = useSelector(state => state.user);

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Register milk production</HeaderTwo>
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
                        <label htmlFor="quantity">Milk quantity in Litlers</label>
                        <input 
                            type="number" 
                            id="quantity"
                            maxLength='10'
                            placeholder="Milk quantity" 
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
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                    
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">Updating...</Button> 
                    : <Button variant="contained" color="secondary" size="small" type="submit">Update</Button>
                    }
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}