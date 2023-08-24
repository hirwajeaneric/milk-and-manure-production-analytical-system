import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { getVeterinaries } from "../../redux/features/userSlice";

export default function AddVeterinaryForm() {
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ province, setProvince ] = useState();
    const [ district, setDistrict ] = useState()
    const [ districts, setDistricts ] = useState();

    const handleProvince = ({ currentTarget: target }) => {
        setProvince(target.value);

        axios.get(`${serverUrl}/api/v1/mmpas/locations/districts?province=${target.value}`)
        .then(response => {
            setDistricts(response.data.districts)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const handleDistrict = ({ currentTarget: target }) => {
        setDistrict(target.value);

        axios.get(`${serverUrl}/api/v1/mmpas/locations/sectors?province=${province}&district=${target.value}`)
        .then(response => {
            setSectors(response.data.sectors)
        })
        .catch(error => {
            console.log(error);
        })
    }

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.role = 'veterinary';
        data.province = province;
        data.district = district;

        setIsProcessing(true);

        try {
            const response = await axios.post(`${serverUrl}/api/v1/mmpas/otheruser/signup`, data);
            if (response.status === 201) {
                setIsProcessing(false);
                dispatch(getVeterinaries());
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

    return (
        <VerticallyFlexGapContainer style={{ gap: '10px', padding: '15px', borderRadius: '5px', background: 'white' }}>
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Register</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Full name</label>
                        <input 
                            type="text" 
                            id="fullName"
                            minLength='3'
                            placeholder="name" 
                            {...register("fullName", 
                            {required: true})} 
                            aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                            <p role="alert">Full name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="email">Email address</label>
                        <input 
                            type="email" 
                            id="email"
                            minLength='8'
                            placeholder="Email" 
                            {...register("email", 
                            {required: true})} 
                            aria-invalid={errors.email ? "true" : "false"}
                        />
                        {errors.email?.type === "required" && (
                            <p role="alert">Email is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="phone">Phone number</label>
                        <input 
                            type="phone" 
                            id="phone"
                            maxLength='10'
                            placeholder="Phone" 
                            {...register("phone", 
                            {required: true})} 
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone?.type === "required" && (
                            <p role="alert">Phone</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="nationalId">National ID</label>
                        <input 
                            type="nationalId" 
                            id="nationalId"
                            maxLength='16'
                            minLength='16'
                            placeholder="National ID" 
                            {...register("nationalId", 
                            {required: true})} 
                            aria-invalid={errors.nationalId ? "true" : "false"}
                        />
                        {errors.nationalId?.type === "required" && (
                            <p role="alert">National id is required</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>  
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="password">Password</label>
                        <input 
                            type="text"
                            id="password" 
                            minLength='8'
                            placeholder="Password" 
                            {...register("password", {required: true})} 
                            aria-invalid={errors.password ? "true" : "false"}
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert">Password is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="province">Province</label>
                        <select name='province' onChange={handleProvince}>
                            <option value="">Choose province</option>
                            <option value="Kigali City">Kigali City</option>
                            <option value="East">East</option>
                            <option value="West">West</option>
                            <option value="North">North</option>
                            <option value="South">South</option>
                        </select>
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="district">District</label>
                        <select name='district' onChange={handleDistrict}>
                            <option value="">Choose district</option>
                            {districts && districts.map((district, index) => {
                                return (
                                    <option key={index} value={district}>{district}</option>
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