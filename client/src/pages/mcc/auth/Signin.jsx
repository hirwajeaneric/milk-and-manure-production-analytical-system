import { Link, useParams } from "react-router-dom"
import { FormElement, HeaderOne, HorizontallyFlexSpaceBetweenContainer, VerticallyFlexGapContainer, VerticallyFlexGapForm, VerticallyFlexSpaceBetweenContainer } from "../../../components/styles/GenericStyles"
import { useForm } from 'react-hook-form';
import axios from 'axios';
const serverUrl = import.meta.env.VITE_REACT_APP_SERVERURL;
import { GeneralContext } from "../../../App";
import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { AuthenticationFormContainer } from "../../../components/styles/AuthenticationPagesStyles";
import { Helmet } from "react-helmet-async";

const Signin = () => {
  const params = useParams();
  const { setResponseMessage, setOpen } = useContext(GeneralContext);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    data.mccCode = params.code;
    data.role = 'mcc';

    setIsProcessing(true);
    
    axios.post(`${serverUrl}/api/v1/mmpas/mccuser/signin`, data)
    .then(response => {
      if (response.status === 201) {
        setIsProcessing(false);
        localStorage.setItem('mccToken', response.data.user.token);
        localStorage.setItem('mccUser', JSON.stringify(response.data.user));
        window.location.replace(`/mcc/${params.code}`);
      }
    })
    .catch(error => {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setIsProcessing(false);
        setResponseMessage({ message: error.response.data.msg, severity:'error'})
        setOpen(true);
      }
    })
  };

  return (
    <HorizontallyFlexSpaceBetweenContainer style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Helmet>
        <title>{`MCC Login`}</title>
        <meta name="description" content={`Login for MCC.`} /> 
      </Helmet>

      <AuthenticationFormContainer style={{ position: 'relative', boxShadow: 'rgba(0, 0, 0, 0.05) 0 6px 24px,   rgba(0, 0, 0, 0.08) 0 5px 12px 1px' }}>
        <VerticallyFlexSpaceBetweenContainer className="left" style={{ position: 'absolute', left: '0', top: '0', bottom: '0', background: "#0055ff", height: '100%', gap: '50px', color: 'white' }}>
          <VerticallyFlexGapContainer style={{ gap: '30px', textAlign:'center', color:'white' }}>
            <img src="/RAB_Logo2.png" alt="RAB Rwanda logo" style={{ width: '40%', border: '2px solid white', borderRadius: '50%', background:'white' }}/>
            <h1 style={{ fontWeight: '900' }}>Welcome to MMPAS</h1>
          </VerticallyFlexGapContainer>
          <VerticallyFlexGapContainer style={{ gap: '30px',color:'white' }}>
            <div style={{ textAlign:'center' }}>
            </div>
            <p>&copy; All rights reserved. MMPAS 2023</p>
          </VerticallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>

        <VerticallyFlexGapForm className="right" style={{ position: 'absolute', right: '0', top: '0', bottom: '0' }} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span>Milk Collection Center</span>
            <HeaderOne>Sign In</HeaderOne>
          </div>
          <FormElement style={{ color: 'gray' }}>
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email"
              placeholder="email" 
              {...register("email", 
              {required: true})} 
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email?.type === "required" && (
              <p role="alert">Email is required</p>
            )}
          </FormElement>  
          <FormElement style={{ color: 'gray' }}>
            <label htmlFor="password">Password</label>
            <input 
              type="password"
              id="password" 
              placeholder="password" 
              {...register("password", {required: true})} 
              aria-invalid={errors.password ? "true" : "false"}
            />
            {errors.password?.type === "required" && (
              <p role="alert">Password is required</p>
            )}
          </FormElement>
          <Link style={{ color: 'blue' }} to={`/mcc/${params.code}/auth/forgot-password`}>Forgot Password?</Link>
          <FormElement>
            {isProcessing 
              ? <Button disabled variant="contained" color="primary" size="small">PROCESSING...</Button> 
              : <Button variant="contained" color="primary" size="small" type="submit">Log in</Button>
            }
          </FormElement>
        </VerticallyFlexGapForm>
        
      </AuthenticationFormContainer>
    </HorizontallyFlexSpaceBetweenContainer>
  )
}

export default Signin