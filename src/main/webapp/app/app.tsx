import 'react-toastify/dist/ReactToastify.css';
import './app.scss';
import 'app/config/dayjs.ts';

import React, { useEffect, useState } from 'react';
import { Card } from 'reactstrap';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Drawer from '@mui/material/Drawer';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSession } from 'app/shared/reducers/authentication';
import { getProfile } from 'app/shared/reducers/application-profile';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import ErrorBoundary from 'app/shared/error/error-boundary';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';
import Sidebar from 'react-sidebar';
import Collapse from '@mui/material/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const menuList = [
  { name: 'Консалтинговые услуги', id: 1 },
  { name: 'Разрешительные документы', id: 2 },
  { name: 'Проектные услуги', id: 3 },
];

export const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // dispatch(getSession());
    // dispatch(getProfile());
  }, []);

  const isAuthenticated = useAppSelector(state => state.authentication.isAuthenticated);
  const isAdmin = useAppSelector(state => hasAnyAuthority(state.authentication.account.authorities, [AUTHORITIES.ADMIN]));
  const ribbonEnv = useAppSelector(state => state.applicationProfile.ribbonEnv);
  const isInProduction = useAppSelector(state => state.applicationProfile.inProduction);
  const isOpenAPIEnabled = useAppSelector(state => state.applicationProfile.isOpenAPIEnabled);

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  // const [open, setOpen] = useState(false);

  // const onSetSidebarOpen = () => setOpen(true);
  // const onSetSidebarClose = () => setOpen(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const list = () => (
    <Box sx={{ width: 250 }}>
      <List>
        {menuList.map((text, index) => (
          <ListItem key={text.id} disablePadding>
            <ListItemButton onClick={handleClick}>
              <ListItemText primary={text.name} />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>
        ))}
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon></ListItemIcon>
              <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
                asd
              </Link>
            </ListItemButton>
          </List>
        </Collapse>
      </List>
    </Box>
  );

  const toggle = (openToggle: boolean) => {
    setOpenDrawer(openToggle);
  };

  return (
    <Router basename={baseHref}>
      <div className="app-container">
        <ToastContainer position={toast.POSITION.TOP_LEFT} className="toastify-container" toastClassName="toastify-toast" />
        <ErrorBoundary>
          <Drawer anchor={'left'} open={openDrawer} onClose={() => toggle(false)}>
            {list()}
          </Drawer>
          <Header
            toggleDrawerProps={openProps => {
              console.log(openProps);
              toggle(openProps);
              // toggleDrawer(openProps);
            }}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            ribbonEnv={ribbonEnv}
            isInProduction={isInProduction}
            isOpenAPIEnabled={isOpenAPIEnabled}
          />
        </ErrorBoundary>
        <div id="app-view-container">
          <ErrorBoundary>
            <AppRoutes />
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
