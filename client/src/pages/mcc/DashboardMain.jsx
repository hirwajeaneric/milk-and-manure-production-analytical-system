import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import { MdHome, MdMenu, MdNotifications, MdPropaneTank } from 'react-icons/md';
import { RiPlantFill, RiUser2Fill, RiUser3Fill, RiUser4Fill } from 'react-icons/ri';
import { TiUser } from 'react-icons/ti';
import { GiFarmer } from 'react-icons/gi';
import { HiOfficeBuilding } from 'react-icons/hi';
import { FaHatCowboy, FaUserAlt } from 'react-icons/fa';
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout, PersonAdd, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getManureProductionOnMCCLevel } from "../../redux/features/manureProductionSlice";
import { getMilkProductionOnMCCLevel } from "../../redux/features/milkProductionSlice";
import { getEmployeesForMcc, getFarmersInDistrict } from "../../redux/features/userSlice";

const DashboardMain = () => {
    const params = useParams();
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
        var user = JSON.parse(localStorage.getItem('mccUser'));
        setUser(user);

        // dispatch(getManureProductionOnMCCLevel({ mccId: ,periodType: 'Year', periodValue: new Date().getFullYear()}));
        // dispatch(getMilkProductionOnMCCLevel({ periodType: 'Year', periodValue: new Date().getFullYear()}));
        dispatch(getEmployeesForMcc({ mccId: user.mccId }));
        dispatch(getFarmersInDistrict({ district: user.district }))
    }, [])

    const signout = () => {
        localStorage.removeItem('mccToken');
        localStorage.removeItem('nccUser');
        window.location.replace(`/mcc/${params.code}/auth/signin`);
    }

    return (
        <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#e0ebeb' }}>
            <TopNavigationBar>
                <div className="left">
                    <MdMenu style={{ cursor: 'pointer' }} onClick={() => setFullSize(!fullSize)}/>
                    <Link to={`/mcc/${params.code}`} style={{ color: '#0055ff' }}>MMPAs</Link>
                    <h3>{`${user.mccName}   `}</h3>
                </div>    
                <div className="right">
                    <MdNotifications style={{ fontSize: '150%', color: 'gray'}} />
                    <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2, background: 'white' }} aria-controls={open ? 'account-menu' : undefined} aria-haspopup="true" aria-expanded={open ? 'true' : undefined}>
                            <Avatar sx={{ width: 32, height: 32, background: 'black' }}></Avatar>
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
                        <VerticallyFlexGapContainer style={{ justifyContent:'flex-start', alignItems:'flex-start', gap: '5px' }}>
                            <p>{user.fullName}</p>
                            <p style={{ color: '#26734d', fontWeight:'700', fontSize:'90%' }}>{user.role}</p>
                            <p style={{ color: 'gray', fontSize:'90%' }}>{user.email}</p>
                        </VerticallyFlexGapContainer>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={() => {navigate(`/mcc/${params.code}/settings`); handleClose();}}>
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
                    <SideBarMenueContainer style={{ background: '#0055ff' }}>
                        <SideBarMenuItem to={'dashboard'}>
                            <MdHome style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                                {!fullSize && <span className="text">Dashboard</span>}
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'record'}>
                            <MdPropaneTank style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <>
                                <span className="text">Record production</span>
                                </>
                            }
                            </div>
                        </SideBarMenuItem>
                        <SideBarMenuItem to={'production/milk'}>
                            <MdPropaneTank style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <>
                                <span className="text">Metrics/Data</span>
                                </>
                            }
                            </div>
                        </SideBarMenuItem>
                        {/* <SideBarMenuItem to={'employees'}>
                            <RiUser2Fill style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">MCC Registers</span></>}
                            </div>
                        </SideBarMenuItem> */}
                        <SideBarMenuItem to={'farmers'}>
                            <FaHatCowboy style={{ width: fullSize ? '100%' : '20%'}}/>
                            <div style={{ width: fullSize ? '0%' : '80%'}} className="nav-data">
                            {!fullSize && <><span className="text">Farmers</span></>}
                            </div>
                        </SideBarMenuItem>
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