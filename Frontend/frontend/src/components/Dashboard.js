import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { SearchBox } from './SmallComponents/Search';
import Navbar from './Navbar';

const drawerWidth = 240;


export default function Dashboard(props) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const navigate = useNavigate();

    const drawer = (
        <div>
            
            <Divider />
            
            <List>
                {['Products', 'Users', 'Orders', 'CRM','Suppliers','Feedbacks','Finance','Marketng','E-commerce Sync','Teams','Partners','Customer Assistance Portal','Loyality Management','Trends','Events','Staff Development','Temp'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                            if (index == 0) {
                                navigate('/admin/products')
                            }
                            else if(index == 1){
                                navigate('/admin/users')
                            }
                            else if(index == 2){
                                navigate('/admin/orders')
                            }
                            else if(index == 3){
                                navigate('/admin/crm')
                            }
                            else if (index == 4)
                            {
                                navigate('/admin/suppliers')
                            }
                            else if (index == 5){
                                navigate('/admin/feedbacks')
                            }
                            else if(index == 6)
                            {
                                navigate('/admin/finance')
                            }
                            else if(index == 7)
                            {
                                navigate('/admin/marketing')
                            }
                            else if (index == 8)
                            {
                                navigate('/admin/e-commerce-sync')
                            }
                            else if (index == 9)
                            {
                                navigate('/admin/teams')
                            }
                            else if (index == 10)
                            {
                                navigate('/admin/partners')
                            }
                            else if(index == 11)
                            {
                                navigate('/admin/customer-assistance')
                            }
                            else if(index == 12)
                            {
                                navigate('/admin/loyality-management')
                            }
                            else if(index == 13){
                                navigate('/admin/trends')
                            }
                            else if(index == 14){
                                navigate('/admin/events')
                            }
                            else if(index == 15)
                            {
                                navigate('/admin/staff-development')
                            }
                            else if(index == 16)
                            {
                                navigate('/admin/temp')
                            }


                        }} >
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => {
                                if (index == 0)
                                {
                                    navigate('/admin/mail/all-mails')
                                }
                                else if(index == 1)
                                {
                                    navigate('/admin/mail/trash')
                                }
                                else if(index == 2)
                                {
                                    navigate('/admin/mail/spam')
                                }
                        }}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    // Remove this const when copying and pasting into your project.
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
            >
                <Navbar />
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <div>
                    {props.LeftIfi}
                </div>
            </Box>
        </Box>
    );
}