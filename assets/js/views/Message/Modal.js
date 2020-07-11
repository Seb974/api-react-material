import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

// @material-ui/icons
import Close from "@material-ui/icons/Close";
// core components
import Button from "../../components/CustomButtons/Button.js";

import styles from "../../../jss/material-kit-react/views/componentsSections/javascriptStyles.js";

const useStyles = makeStyles(styles);

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

Transition.displayName = "Transition";

export default function Modal(props) {
  const classes = useStyles();
  const [classicModal, setClassicModal] = React.useState(false);

  function onValidate(validate) {
    setClassicModal(false);
    props.onClick(validate)
  }

  return (
      <span>
          <Button
              color="danger"
              // block
              onClick={() => setClassicModal(true)}
          >
              <i className={ "fa fa-trash " + classes.icon } aria-hidden="true"></i>
              {"  Supprimer"}
          </Button>
          <Dialog
              classes={{
                root: classes.center,
                paper: classes.modal
              }}
              open={classicModal}
              TransitionComponent={Transition}
              keepMounted
              onClose={() => setClassicModal(false)}
              aria-labelledby="classic-modal-slide-title"
              aria-describedby="classic-modal-slide-description"
          >
                <DialogTitle
                  id="classic-modal-slide-title"
                  disableTypography
                  className={classes.modalHeader}
                >
                    <IconButton
                        className={classes.modalCloseButton}
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        onClick={() => setClassicModal(false)}
                    >
                        <Close className={classes.modalClose} />
                    </IconButton>
                    <h4 className={classes.modalTitle}>Etes-vous sûr de vouloir supprimer cette réservation ?</h4>
                </DialogTitle>
                <DialogContent
                  id="classic-modal-slide-description"
                  className={classes.modalBody}
                >
                  <p>
                      La suppression de la réservation est définitive. Une fois validée, toute récupération sera impossible.
                  </p>
              </DialogContent>
              <DialogActions className={classes.modalFooter}>
                  <Button 
                      onClick={() => onValidate(false)}
                      color="transparent" 
                      simple
                  >
                      Fermer
                  </Button>
                  <Button
                      onClick={() => onValidate(true)}
                      color="danger"
                      simple
                  >
                    Valider
                  </Button>
              </DialogActions>
          </Dialog>
      </span>
  );
}
