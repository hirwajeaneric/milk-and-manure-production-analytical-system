import { Link, Outlet, useNavigate } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import { MdHome, MdMenu, MdNotifications, MdPropaneTank } from 'react-icons/md';
import { RiPlantFill, RiUser2Fill, RiUser3Fill, RiUser4Fill } from 'react-icons/ri';
import { TiUser } from 'react-icons/ti';
import { GiFarmer } from 'react-icons/gi';
import { HiOfficeBuilding } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getSimpleCapitalizedChars } from "../../utils/HelperFunctions";
import { getManureProductionOnCountryLevel } from "../../redux/features/manureProductionSlice";
import { getMilkProductionOnCountryLevel } from "../../redux/features/milkProductionSlice";
import { getAllmccs } from "../../redux/features/mccSlice";
import { getAllMccEmployees, getVeterinaries } from "../../redux/features/userSlice";

const DashboardMain = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [fullSize, setFullSize] = useState(false);
    const open = Boolean(anchorEl);
    const [user, setUser] = useState({});

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('rabUser'));
        console.log(user);
        setUser(user);

        dispatch(getManureProductionOnCountryLevel({ periodType: 'Year', periodValue: new Date().getFullYear()}));
        dispatch(getMilkProductionOnCountryLevel({ periodType: 'Year', periodValue: new Date().getFullYear()}));
        dispatch(getAllmccs());
        dispatch(getAllMccEmployees());
        dispatch(getVeterinaries());
    }, [])

    const signout = () => {
        localStorage.removeItem('rabToken');
        localStorage.removeItem('rabUser');
        navigate('/rab/auth/signin');
    }

    return (
        <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#e0ebeb' }}>
            <TopNavigationBar>
                <div className="left">
                    <MdMenu style={{ cursor: 'pointer' }} onClick={() => setFullSize(!fullSize)}/>
                    <Link to={`/rab}`} style={{ color: '#339966' }}>MMPAs</Link>
                    <h3>RAB Official</h3>
                </div>    
                <div className="right">
                    <MdNotifications style={{ fontSize: '150%', color: 'gray'}} />
                    <Tooltip title="Account settings">
                        <IconButton
                            onClick={handleClick}
                            size="small"
                            sx={{ ml: 2, background: 'white' }}
                            aria-controls={open ? 'account-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                        >
                            <Avatar sx={{ width: 32, height: 32, background: 'black' }}></Avatar>
                                {/* {getSimpleCapitalizedChars(user.fullName)} */}
                                {/* {user.fullName} */}
                            {/* </Avatar> */}
                        </IconButton>
                    </Tooltip>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                        },
                        '&:before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                        },
                    },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem onClick={handleClose} style={{ display:'flex', flexDirection:'row', alignItems:'flex-start' }}>
                    <Avatar sx={{ width: 32, height: 32 }}></Avatar>
                        {/* {getSimpleCapitalizedChars(user.fullName)}
                        {user.fullName} */}
                        {/* </Avatar> */}
                        <VerticallyFlexGapContainer style={{ justifyContent:'flex-start', alignItems:'flex-start', gap: '5px' }}>
                            <p>{user.fullName}</p>
                            <p style={{ color: '#26734d', fontWeight:'700', fontSize:'90%' }}>{user.role}</p>
                            <p style={{ color: 'gray', fontSize:'90%' }}>{user.email}</p>
                        </VerticallyFlexGapContainer>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {navigate('/rab/settings'); handleClose();}}>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>Settings
                    </MenuItem>
                    <MenuItem onClick={() => {handleClose(); signout()}}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>Logout
                    </MenuItem>
                </Menu>
            </TopNavigationBar> 


            <HorizontallyFlexGapContainer style={{ position: 'relative' }}>                
                <SideNavigationBar style={{ width: fullSize ? '5%' : '20%' }}>
                    <SideBarMenueContainer style={{ background: '#339966' }}>
                        <SideBarMenuItem to={'dashboard'}>
                            <MdHome style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                                {!fullSize && <span className="text">Dashboard</span>}
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'production/milk'}>
                            <MdPropaneTank style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <>
                                <span className="text">Production</span>
                                {/* <span className="number">{numberOfProjects}</span> */}
                                </>
                            }
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'mccs'}>
                            <HiOfficeBuilding style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">MCCs</span></>}
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'employees'}>
                            <RiUser2Fill style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">MCC Registers</span></>}
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'veterinaries'}>
                            <RiUser3Fill style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">Veterinaries</span></>}
                            </div>
                        </SideBarMenuItem>
                        {/* <SideBarMenuItem to={'farmers'}>
                            <GiFarmer style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">Farmers</span></>}
                            </div>
                        </SideBarMenuItem> */}
                        <SideBarMenuItem to={'settings'}>
                            <RiUser4Fill style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <span className="text">My account</span>}
                            </div>
                        </SideBarMenuItem>                    
                    </SideBarMenueContainer>
                </SideNavigationBar>
                


                <DashboardMainContainer  style={{ width: fullSize ? '95%' : '80%' }}>
                    <DashboardInnerContainer>
                        <Outlet />
                    </DashboardInnerContainer>
                </DashboardMainContainer>

            </HorizontallyFlexGapContainer>
        </VerticallyFlexSpaceBetweenContainer>
    )
}

export default DashboardMain