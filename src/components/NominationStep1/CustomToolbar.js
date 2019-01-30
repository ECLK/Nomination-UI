import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import Modal from "react-responsive-modal";
import CandidateTabContainer from '../CandidateTabContainer';




const defaultToolbarStyles = {
  iconButton: {
  },
};
const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class CustomToolbar extends React.Component {
 
  state = {
    open: false
  };
  onOpenModal = () => {
    this.setState({ open: true });
  
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, customProps } = this.props;
    const { open } = this.state;

    return (
      <React.Fragment>
        <Tooltip title={"custom icon"}>
          <IconButton className={classes.iconButton} onClick={this.onOpenModal} >
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
        <div style={styles}>
        <Modal open={open} onClose={this.onCloseModal} center>
          <h2>Add Candidate</h2>
          <p>
          <CandidateTabContainer onCloseModal={this.onCloseModal} customProps={customProps} />
          </p>
        </Modal>
      </div>
      </React.Fragment>
      
    );
    

  }

}

export default withStyles(defaultToolbarStyles, { name: "CustomToolbar" })(CustomToolbar);
