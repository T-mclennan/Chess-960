import React from 'react';
import { Modal, ModalHeader } from 'reactstrap';
import { connect } from 'react-redux';

class StatusModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      message: '',
    };
  }

  componentDidMount() {

    this.setState({
      modal: this.props.game.modal,
      message: this.props.game.modalMessage,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.game !== prevProps.game) {

      this.setState({
        modal: this.props.game.modal,
        message: this.props.game.modalMessage,
      });
    }
    // console.log(this.state.message);
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal,
    });
  };

  render() {
    return (
      <div className='statusModal'>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.message}</ModalHeader>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  game: state.game,
});

export default connect(mapStateToProps, {})(StatusModal);
