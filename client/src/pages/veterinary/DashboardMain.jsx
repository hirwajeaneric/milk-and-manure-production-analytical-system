import { Link, Outlet, useNavigate, useParams } from "react-router-dom";
import { DashboardInnerContainer, DashboardMainContainer, SideBarMenuItem, SideBarMenueContainer, SideNavigationBar, TopNavigationBar } from "../../components/styles/DashboardStructureStyles"
import { HorizontallyFlexGapContainer, VerticallyFlexGapContainer, VerticallyFlexSpaceBetweenContainer } from "../../components/styles/GenericStyles"
import { MdHome, MdMenu, MdNotifications, MdPropaneTank } from 'react-icons/md';
import { RiUser4Fill } from 'react-icons/ri';
import { GiFarmer } from 'react-icons/gi';
import { HiOfficeBuilding } from 'react-icons/hi';
import Avatar from "@mui/material/Avatar"; 
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Divider, IconButton, ListItemIcon, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { Logout, Settings } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { getManureProductionOnDistrictLevel } from "../../redux/features/manureProductionSlice";
import { getMilkProductionOnDistrictLevel } from "../../redux/features/milkProductionSlice";
import { getmccsForSelectedDistrict } from "../../redux/features/mccSlice";
import { getEmployeesInDistrict } from "../../redux/features/userSlice";

const DashboardMain = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const params = useParams();
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
        var user = JSON.parse(localStorage.getItem('veterinary'));
        setUser(user);


        dispatch(
            getMilkProductionOnDistrictLevel({ 
                district: user.district, 
                periodType: 'year', 
                periodValue: new Date().getFullYear()
            })
        );

        dispatch(
            getManureProductionOnDistrictLevel({ 
                district: user.district, 
                periodType: 'year', 
                periodValue: new Date().getFullYear()
            })
        );

        dispatch(getmccsForSelectedDistrict({ district: user.district }));
        dispatch(getEmployeesInDistrict({ district: params.district }));

    }, [dispatch])

    const signout = () => {
        localStorage.removeItem('vetToken');
        localStorage.removeItem('veterinary');
        navigate(`/vet/${params.district}/auth/signin`)
    }

    return (
        <VerticallyFlexSpaceBetweenContainer style={{ backgroundColor: '#e0ebeb' }}>
            <TopNavigationBar>
                <div className="left">
                    <MdMenu style={{ cursor: 'pointer' }} onClick={() => setFullSize(!fullSize)}/>
                    <Link to={`/vet/${params.district}`}>MMPAS</Link>
                    <h3>{`${params.district.toUpperCase()} District Veterinary`}</h3>
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
                    <SideBarMenueContainer>
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