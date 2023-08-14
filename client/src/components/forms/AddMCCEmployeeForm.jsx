import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEmployeesForMcc } from "../../redux/features/userSlice";

export default function AddMCCEmployeeForm() {
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { loading, selectedMcc } = useSelector(state => state.mcc)

    const onSubmit = async (data) => {
        data.province = selectedMcc.province;
        data.district = selectedMcc.district;
        data.sector = selectedMcc.sector;
        data.mccId = selectedMcc.id;
        data.mccName = selectedMcc.name;
        data.role = 'mcc';

        console.log(data);

        setIsProcessing(true);

        try {
            const response = await axios.post(`${serverUrl}/api/v1/mmpas/mccuser/add`, data);
            if (response.status === 201) {
                setIsProcessing(false);
                setResponseMessage({ message: response.data.message, severity: 'success' });
                setOpen(true);
                dispatch(getEmployeesForMcc({ mccId: response.data.user.mccId }));
                setTimeout(() => {
                    window.location.reload();
                },2000)
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
            <HeaderTwo style={{ width: '100%', fontSize: '100%', textAlign: 'left' }}>Add MCC Employee</HeaderTwo>
            <VerticallyFlexGapForm className="right" style={{ gap: '10px' }} onSubmit={handleSubmit(onSubmit)}>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="fullName">Full name</label>
                        <input 
                            type="text" 
                            id="fullName"
                            minLength='4'
                            placeholder="Name" 
                            {...register("fullName", 
                            {required: true})} 
                            aria-invalid={errors.fullName ? "true" : "false"}
                        />
                        {errors.fullName?.type === "required" && (
                            <p role="alert">Full name is required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="email">Email</label>
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
                        <label htmlFor="phone">Phone</label>
                        <input 
                            type="text" 
                            id="phone"
                            minLength='8'
                            placeholder="Phone" 
                            {...register("phone", 
                            {required: true})} 
                            aria-invalid={errors.phone ? "true" : "false"}
                        />
                        {errors.phone?.type === "required" && (
                            <p role="alert">Phone number is required</p>
                        )}
                    </FormElement>
                </HorizontallyFlexGapContainer>
                <HorizontallyFlexGapContainer style={{ gap: '10px' }}>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="nationalId">National Id</label>
                        <input 
                            type="text" 
                            id="nationalId"
                            minLength='16'
                            maxLength='16'
                            placeholder="National id" 
                            {...register("nationalId", 
                            {required: true})} 
                            aria-invalid={errors.nationalId ? "true" : "false"}
                        />
                        {errors.nationalId?.type === "required" && (
                            <p role="alert">National id is required</p>
                        )}
                    </FormElement>
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
                </HorizontallyFlexGapContainer>

                <HorizontallyFlexSpaceBetweenContainer style={{ gap: '10px' }}>  
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
                    : <Button variant="contained" color="primary" size="small" type="submit">Register</Button>
                    }
                    
                    {isProcessing 
                    ? <Button disabled variant="contained" color="primary" size="small">Removing...</Button> 
                    : <Button variant="contained" color="error" size="small" type="submit">Remove</Button>
                    }
                </HorizontallyFlexSpaceBetweenContainer>
            </VerticallyFlexGapForm>
        </VerticallyFlexGapContainer>
    )
}