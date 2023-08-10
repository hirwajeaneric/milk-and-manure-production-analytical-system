import { FormElement, HeaderTwo, HorizontallyFlexGapContainer, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm } from "../styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { getmccsForSelectedDistrict } from "../../redux/features/mccSlice";
import { useCookies } from "react-cookie";

export default function AddMCCForm() {
    const dispatch = useDispatch();
    const { setOpen, setResponseMessage } = useContext(GeneralContext);
    const [ isProcessing, setIsProcessing ] = useState(false);
    const [ cookies, setCookie ] = useCookies(null);

    const user = cookies.UserData;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        data.district = user.district;

        console.log(data);

        setIsProcessing(true);

        try {
            const response = await axios.post(`${serverUrl}/api/v1/mmpas/mcc/add`, data);
            if (response.status === 201) {
                setIsProcessing(false);
                dispatch(getmccsForSelectedDistrict({ district: user.district}));
                // window.location.reload();
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
                        <label htmlFor="confirmPassword">Province</label>
                        <select {...register("province", { required: true })}>
                            <option value="">Choose province</option>
                            <option value="Kigali City">Kigali City</option>
                            <option value="Northern province">Northern province</option>
                            <option value="Southern province">Southern province</option>
                            <option value="Eastern province">Eastern province</option>
                            <option value="Western province">Western province</option>
                        </select>
                        {errors.confirmPassword?.type === "required" && (
                            <p role="alert">Required</p>
                        )}
                    </FormElement>
                    <FormElement style={{ color: 'gray' }}>
                        <label htmlFor="sector">Sector</label>
                        <input 
                            type="sector"
                            id="sector"
                            placeholder="sector" 
                            {...register("sector", {required: true})} 
                            aria-invalid={errors.sector ? "true" : "false"}
                        />
                        {errors.sector?.type === "required" && (
                            <p role="alert">Required</p>
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