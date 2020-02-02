import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import { connect } from "react-redux";

class StatusModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: ""
    };
  }

  componentDidMount() {
    console.log("modal:");
    console.log(this.props.game);

    this.setState({
      modal: this.props.game.modal,
      message: this.props.game.modalMessage
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {
      console.log("modal update:");
      console.log(this.props.game);

      this.setState({
        modal: this.props.game.modal,
        message: this.props.game.modalMessage
      });
    }
    console.log(this.state.message);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  render() {
    return (
      <div className="statusModal">
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.message}</ModalHeader>
          {/* <ModalBody>{this.state.message}</ModalBody> */}
          {/* <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Do Something
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Cancel
            </Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game
});

export default connect(mapStateToProps, {})(StatusModal);
