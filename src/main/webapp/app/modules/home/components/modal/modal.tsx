import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './modal.scss';
import Button from '@mui/material/Button';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PreviewIcon from '@mui/icons-material/Preview';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '16px',
  width: '698px',
};

const ModalPermitDocs = props => {
  const { open, handleClose, title, description, image } = props;
  return (
    <div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div className="container">
            <div className="row">
              <img className="permit-docs-modal-image" src={image} />
            </div>
            <div className="row">
              <p className="permit-docs-modal-main-title">{title}</p>
              <p>{description}</p>
            </div>
            <div className="row justify-content-end">
              <div className="col-sm-9">
                <Button variant="outlined" startIcon={<PreviewIcon />}>
                  Просмотреть образец
                </Button>
                <Button variant="contained" style={{ marginLeft: 10 }} startIcon={<MailOutlineIcon />}>
                  Оставить заявку
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ModalPermitDocs;
