import React from 'react';
import PropTypes from 'prop-types';
import Debug from 'debug';
import ReactModal from 'react-modal';

import {
  ModalFrame,
  StyledProjectName,
  InterfaceFrame
} from '../../../../stylesheets/application/ProjectIndex/StyledDeleteModal';
import { DeleteButton, Button } from '../../../../stylesheets/application/interface/StyledButton';

const debug = Debug('fabnavi:VisualizeSearch:PopupModal');

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-20%',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    backgroundColor: 'rgba(19,19,19,0.8)'
  }
};

class PopupModal extends React.Component {
  constructor(props) {
    super(props);
    this.closeConfirmation = () => {
      debug('close');
      this.props.stateChange();
    };
    this.showProject = () => {
      debug('show and modal close');
      this.props.stateChange();
    };
  }

  componentWillMount() {
    ReactModal.setAppElement('body');
  }

  render() {
    debug('node: ', this.props.node);
    return (
      <ReactModal
        isOpen={this.props.popup}
        style={modalStyles}
        onRequestClose={this.closeConfirmation}
        contentLabel="popup project"
      >
        <ModalFrame>
          {/* <StyledThumbnail src={thumb} /> */}
          <StyledProjectName>{this.props.node.data.name}</StyledProjectName>
          <InterfaceFrame>
            <Button cancel onClick={this.closeConfirmation}>
              Cancel
            </Button>
            <DeleteButton
              onClick={() => {
                this.showProject();
              }}
            >
              Show Contents !
            </DeleteButton>
          </InterfaceFrame>
        </ModalFrame>
      </ReactModal>
    );
  }
}

export default PopupModal;
