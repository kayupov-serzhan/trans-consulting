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
import { Toolbar, Typography } from '@mui/material';

const baseHref = document.querySelector('base').getAttribute('href').replace(/\/$/, '');

const menuList = [
  { name: 'Консалтинговые услуги', id: 1 },
  { name: 'Разрешительные документы', id: 2 },
  { name: 'Проектные услуги', id: 3 },
];

const menuChildList = [
  { name: 'Предрейсовая проверка', id: 1, parentId: 1 },
  { name: 'Консультация по НПА', id: 2, parentId: 1 },
  { name: 'Консультация по ОГ', id: 3, parentId: 1 },
  { name: 'Расчет суммы сбора', id: 4, parentId: 1 },
  { name: 'Подбор автомобиля и правильное размещение груза', id: 5, parentId: 1 },
  { name: 'Консультация по тахографу', id: 6, parentId: 1 },
  { name: 'Оформление перевозочных документов', id: 7, parentId: 1 },
];

const data = {
  documents: [
    {
      Id: 1,
      Name: 'Консалтинговые услуги',
      Sheets: [
        {
          Id: 1,
          Title: 'Предрейсовая проверка ',
        },
        {
          Id: 2,
          Title: 'Консультация по НПА',
        },
        {
          Id: 3,
          Title: 'Консультация по ОГ',
        },
        {
          Id: 4,
          Title: 'Расчет суммы сбора',
        },
        {
          Id: 5,
          Title: 'Подбор автомобиля и правильное размещение груза',
        },
        {
          Id: 6,
          Title: 'Консультация по тахографу',
        },
        {
          Id: 7,
          Title: 'Оформление перевозочных документов',
        },
      ],
    },
    {
      Id: 2,
      Name: 'Category 2',
      Sheets: [
        {
          Id: 1,
          Title: 'Title1 ',
        },
        {
          Id: 2,
          Title: 'Title 2',
        },
        {
          Id: 3,
          Title: 'Title 3',
        },
      ],
    },
  ],
};

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
    setOpen(prevState => {
      console.log(prevState);
      return !open;
    });
  };
  // const [open, setOpen] = useState(false);

  // const onSetSidebarOpen = () => setOpen(true);
  // const onSetSidebarClose = () => setOpen(false);

  const [openDrawer, setOpenDrawer] = React.useState(false);

  const list = () => {
    const docs = data.documents;
    return (
      <div>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            TransConsulting111
          </Typography>
        </Toolbar>
        <Divider />
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }} component="nav" aria-labelledby="nested-list-subheader">
          {docs.map(doc => {
            return <CustomizedListItem handleClick={handleClick} open={open} key={doc.Id} doc={doc} />;
          })}
        </List>
      </div>
    );
    // <Box sx={{ width: 250 }}>
    //   <List>
    //     {menuList.map((text, index) => (
    //       <>
    //         <ListItem key={text.id} disablePadding>
    //           <ListItemButton onClick={() => handleClick(text.id)}>
    //             <ListItemText primary={text.name} />
    //             {open ? <ExpandLess /> : <ExpandMore />}
    //           </ListItemButton>
    //         </ListItem>
    //       </>
    //     ))}
    //     <Collapse in={open} timeout="auto" unmountOnExit>
    //       <List component="div" disablePadding>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Предрейсовая проверка
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Консультация по НПА
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Консультация по О
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Расчет суммы сбора
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Подбор автомобиля и правильное размещение груза
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Консультация по тахографу
    //           </Link>
    //         </ListItemButton>
    //         <ListItemButton sx={{ pl: 4 }}>
    //           <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //             Оформление перевозочных документов
    //           </Link>
    //         </ListItemButton>
    //         {/* {menuChildList.map(obj => {
    //               if (obj.parentId === text.id) {
    //                 <ListItemButton key={obj.id} sx={{ pl: 4 }}>
    //                   <ListItemIcon></ListItemIcon>
    //                   <Link style={{ textDecoration: 'none' }} to={'/weighing-car'}>
    //                     asd
    //                   </Link>
    //                 </ListItemButton>;
    //               }
    //             })} */}
    //       </List>
    //     </Collapse>
    //   </List>
    // </Box>
  };

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

const CustomizedListItem = (props: any) => {
  const { doc } = props;
  return (
    <div>
      <ListItem button key={doc.Id} onClick={props.handleClick}>
        <ListItemText primary={doc.Name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse key={doc.Sheets.Id} in={doc.Id === 1 ? props.open : false} timeout="auto" unmountOnExit>
        <List component="li" disablePadding key={doc.Id}>
          {doc.Sheets.map(sheet => {
            return (
              <ListItem button key={sheet.Id}>
                <ListItemIcon>{/* <InsertDriveFileTwoToneIcon /> */}</ListItemIcon>
                <ListItemText key={sheet.Id} primary={sheet.Title} />
              </ListItem>
            );
          })}
        </List>
      </Collapse>
      <Divider />
    </div>
  );
};

export default App;
