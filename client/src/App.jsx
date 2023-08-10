import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createContext, useEffect, useState } from 'react';
import ResponseComponent from './components/ResponseComponent';

// PAGES 
// RAB //////////////////////////////////////////////////////////////////////////////////////////////
import RabAuth from './pages/rab/auth/Auth';
import RabSignin from './pages/rab/auth/Signin';
import RabSignup from './pages/rab/auth/Signup';
import RabForgotPassword from './pages/rab/auth/ForgotPassword';
import RabResetPassword from './pages/rab/auth/ResetPassword';
import RabDashboardMain from './pages/rab/DashboardMain';
import RabStats from './pages/rab/Stats';
import RabSettings from './pages/rab/Settings';

import RabManureProduction from './pages/rab/ManureProduction';
import RabMilkProduction from './pages/rab/MilkProduction';
import RabMCCEmployeeInfo from './pages/rab/MCCEmployeeInfo';
import RabMCCEmployees from './pages/rab/MCCEmployees';
import RabMCCInfo from './pages/rab/MCCInfo';
import RabMCCs from './pages/rab/MCCs';
import RabProduction from './pages/rab/Production';
import RabProductionDetails from './pages/rab/ProductionDetails';
import RabReportPreview from './pages/rab/ReportPreview';
import Veterinaries from './pages/rab/Veterinaries';
import VeterinaryDetails from './pages/rab/VeterinaryDetails';


// VETERINARIES //////////////////////////////////////////////////////////////////////////////////////////////
import VetAuth from './pages/veterinary/auth/Auth';
import VetSignin from './pages/veterinary/auth/Signin';
import VetSignup from './pages/veterinary/auth/Signup';
import VetForgotPassword from './pages/veterinary/auth/ForgotPassword';
import VetResetPassword from './pages/veterinary/auth/ResetPassword';
import VetDashboardMain from './pages/veterinary/DashboardMain';
import VetStats from './pages/veterinary/Stats';
import VetSettings from './pages/veterinary/Settings';

import VetManureProduction from './pages/veterinary/ManureProduction';
import VetMilkProduction from './pages/veterinary/MilkProduction';
import VetMCCEmployeeInfo from './pages/veterinary/MCCEmployeeInfo';
import VetMCCEmployees from './pages/veterinary/MCCEmployees';
import VetMCCInfo from './pages/veterinary/MCCInfo';
import VetMCCs from './pages/veterinary/MCCs';
import VetProduction from './pages/veterinary/Production';
import VetProductionDetails from './pages/veterinary/ProductionDetails';
import VetReportPreview from './pages/veterinary/ReportPreview';


// MCC //////////////////////////////////////////////////////////////////////////////////////////////
import MCCAuth from './pages/mcc/auth/Auth';
import MCCSignin from './pages/mcc/auth/Signin';
import MCCSignup from './pages/mcc/auth/Signup';
import MCCForgotPassword from './pages/mcc/auth/ForgotPassword';
import MCCResetPassword from './pages/mcc/auth/ResetPassword';
import MCCDashboardMain from './pages/mcc/DashboardMain';
import MCCStats from './pages/mcc/Stats';
import MCCSettings from './pages/mcc/Settings';

import MCCManureProduction from './pages/mcc/ManureProduction';
import MCCMilkProduction from './pages/mcc/MilkProduction';
import MCCEmployeeInfo from './pages/mcc/MCCEmployeeInfo';
import MCCEmployees from './pages/mcc/MCCEmployees';
import MCCInfo from './pages/mcc/MCCInfo';
import MCCProduction from './pages/mcc/Production';
import MCCProductionDetails from './pages/mcc/ProductionDetails';
import MCCReportPreview from './pages/mcc/ReportPreview';
import MCCFarmers from './pages/mcc/Farmers';
import AddMilkProduction from './pages/mcc/AddMilkProduction';
import AddManureProduction from './pages/mcc/AddManureProduction';


// FARMER //////////////////////////////////////////////////////////////////////////////////////////////
import FarmerAuth from './pages/farmer/auth/Auth';
import FarmerSignin from './pages/farmer/auth/Signin';
import FarmerSignup from './pages/farmer/auth/Signup';
import FarmerForgotPassword from './pages/farmer/auth/ForgotPassword';
import FarmerResetPassword from './pages/farmer/auth/ResetPassword';
import FarmerDashboardMain from './pages/farmer/DashboardMain';
import FarmerStats from './pages/farmer/Stats';
import FarmerSettings from './pages/farmer/Settings';

import FarmerManureProduction from './pages/farmer/ManureProduction';
import FarmerMilkProduction from './pages/farmer/MilkProduction';
import FarmerProduction from './pages/farmer/Production';
import FarmerProductionDetails from './pages/farmer/ProductionDetails';

export const GeneralContext = createContext();

function App() {
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false);
  const [ responseMessage, setResponseMessage ] = useState({ message: '', severity: ''});

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  
  useEffect(() => {   
    // dispatch(getManureProductionOnMCCLevel({ mccId: user.mccId, periodType: 'Year', periodValue: new Date().getFullYear()}));
    // dispatch(getMilkProductionOnMCCLevel({ mccId: user.mccId, periodType: 'Year', periodValue: new Date().getFullYear()}));
    // dispatch(getEmployeesForMcc({ mccId: user.mccId }))
  
    // dispatch(getManureProductionForFarmer({ farmerId: user.id, periodType: 'Year', periodValue: new Date().getFullYear()}));
    // dispatch(getMilkProductionForFarmer({ farmerId: user.id, periodType: 'Year', periodValue: new Date().getFullYear()}));
  },[dispatch]);

  return (
    <GeneralContext.Provider 
      value={{
        responseMessage, 
        setResponseMessage,
        setOpen 
      }}>
      <BrowserRouter>
        <Routes>
          
          {/* RAB pages ////////////////////////////////////////////////////////////////////////////////////////////////////////  */}
          <Route path='/rab/auth/' element={<RabAuth />}>
            <Route path='signin' element={<RabSignin />} />
            <Route path='signup' element={<RabSignup />} />
            <Route path='forgot-password' element={<RabForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<RabResetPassword />} />
          </Route>
          <Route path='/rab/' element={localStorage.getItem('rabToken') ? <RabDashboardMain /> : <Navigate replace to={'/rab/auth/signin'} />}>
            <Route path='dashboard' element={<RabStats />} />
            <Route path='production' element={<RabProduction />} >
              <Route path='' element={<RabMilkProduction />}>
                <Route path=':productionId' element={<RabProductionDetails />} />
              </Route>
              <Route path='milk' element={<RabMilkProduction />}>
                <Route path=':productionId' element={<RabProductionDetails />} />
              </Route>
              <Route path='manure' element={<RabManureProduction />}>
                <Route path=':productionId' element={<RabProductionDetails />} />
              </Route>
            </Route>
            <Route path='mccs' element={<RabMCCs />}>
              <Route path=':mccId' element={<RabMCCInfo />} />
            </Route>
            <Route path='employees' element={<RabMCCEmployees />}>
              <Route path=':employeeId' element={<RabMCCEmployeeInfo />} />
            </Route>
            <Route path='veterinaries' element={<Veterinaries />}>
              <Route path=':veterinaryId' element={<VeterinaryDetails />} />
            </Route>
            <Route path='report-preview' element={<RabReportPreview />} />
            <Route path='settings' element={<RabSettings />} />
          </Route>




          {/* VETERINARY pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/vet/:district/auth/' element={<VetAuth />}>
            <Route path='signin' element={<VetSignin />} />
            <Route path='signup' element={<VetSignup />} />
            <Route path='forgot-password' element={<VetForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<VetResetPassword />} />
          </Route>

          <Route path='/vet/:district/' element={localStorage.getItem('vetToken') ? <VetDashboardMain /> : <Navigate replace to={'/vet/:district/auth/signin'} />}>
            <Route path='dashboard' element={<VetStats />} />
            <Route path='production' element={<VetProduction />} >
              <Route path='milk' element={<VetMilkProduction />}>
                <Route path=':productionId' element={<VetProductionDetails />} />
              </Route>
              <Route path='manure' element={<VetManureProduction />}>
                <Route path=':productionId' element={<VetProductionDetails />} />
              </Route>
            </Route>
            <Route path='mccs' element={<VetMCCs />}>
              <Route path=':mccId' element={<VetMCCInfo />} />
            </Route>
            <Route path='employees' element={<VetMCCEmployees />}>
              <Route path=':employeeId' element={<VetMCCEmployeeInfo />} />
            </Route>
            <Route path='report-preview' element={<VetReportPreview />} />
            <Route path='settings' element={<VetSettings />} />
          </Route>



          {/* MCC Pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/mcc/:code/auth/' element={<MCCAuth />}>
            <Route path='signin' element={<MCCSignin />} />
            <Route path='signup' element={<MCCSignup />} />
            <Route path='forgot-password' element={<MCCForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<MCCResetPassword />} />
          </Route>
          <Route path='/mcc/:code/' element={localStorage.getItem('mccToken') ? <MCCDashboardMain /> : <Navigate replace to={'/mcc/auth/signin'} />}>
          {/* <Route path='/mcc/:code/' element={<MCCDashboardMain />}> */}
            <Route path='dashboard' element={<MCCStats />} />
            <Route path='production' element={<MCCProduction />} >
              <Route path='milk' element={<MCCMilkProduction />}>
                <Route path=':productionId' element={<MCCProductionDetails />} />
                <Route path='add' element={<AddMilkProduction />} />
              </Route>
              <Route path='manure' element={<MCCManureProduction />}>
                <Route path=':productionId' element={<MCCProductionDetails />} />
                <Route path='add' element={<AddManureProduction />} />
              </Route>
            </Route>
            <Route path='employees' element={<MCCEmployees />}>
              <Route path=':employeeId' element={<MCCEmployeeInfo />} />
            </Route>
            <Route path='my-mcc' element={<MCCInfo />} />
            <Route path='farmers' element={<MCCFarmers />} />
            <Route path='report' element={<MCCReportPreview />} />
            <Route path='settings' element={<MCCSettings />} />
          </Route>



          {/* Farmer Pages //////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <Route path='/auth/' element={<FarmerAuth />}>
            <Route path='signin' element={<FarmerSignin />} />
            <Route path='signup' element={<FarmerSignup />} />
            <Route path='forgot-password' element={<FarmerForgotPassword />} />
            <Route path='reset-password/:token/:userId' element={<FarmerResetPassword />} />
          </Route>
          <Route path='/' element={localStorage.getItem('farToken') ? <FarmerDashboardMain /> : <Navigate replace to={'/auth/signin'} />}>
            <Route path='dashboard' element={<FarmerStats />} />
            <Route path='production' element={<FarmerProduction />} >
              <Route path='milk' element={<FarmerMilkProduction />}>
                <Route path=':productionId' element={<FarmerProductionDetails />} />
              </Route>
              <Route path='manure' element={<FarmerManureProduction />}>
                <Route path=':productionId' element={<FarmerProductionDetails />} />
              </Route>
            </Route>
            <Route path='settings' element={<FarmerSettings />} />
          </Route>

        </Routes>
      </BrowserRouter>

      {/* RESPONSE MESSAGE DISPLAYER ****************************************************************************************************************************** */}
      <ResponseComponent 
        message={responseMessage.message} 
        severity={responseMessage.severity}
        open={open} 
        handleClose={handleClose} 
      />
    </GeneralContext.Provider>
  )
}

export default App
