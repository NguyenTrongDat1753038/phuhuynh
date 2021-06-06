import React, { useState, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
import ChangePasswordDialog from "./ChangePasswordDialog";
import ModalBackdrop from "../../components/shared/ModalBackdrop";

function DialogSelector(props) {
  const {
    dialogOpen,
    openChangePasswordDialog,
    onClose,
  } = props;
  const [loginStatus, setLoginStatus] = useState(null);
  const [registerStatus, setRegisterStatus] = useState(null);

  const _onClose = useCallback(() => {
    setLoginStatus(null);
    setRegisterStatus(null);
    onClose();
  }, [onClose, setLoginStatus, setRegisterStatus]);

  const printDialog = useCallback(() => {
    switch (dialogOpen) {

      case "changePassword":
        return (
          <ChangePasswordDialog
            setLoginStatus={setLoginStatus}
          />
        );
      default:
    }
  }, [
    dialogOpen,
    openChangePasswordDialog,
    _onClose,
    loginStatus,
    setLoginStatus,
  ]);

  return (
    <Fragment>
      {dialogOpen && <ModalBackdrop open />}
      {printDialog()}
    </Fragment>
  );
}

DialogSelector.propTypes = {
  dialogOpen: PropTypes.string,
  openLoginDialog: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  openRegisterDialog: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
};

export default DialogSelector;
