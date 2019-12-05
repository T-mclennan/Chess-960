import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form, 
  FormGroup,
  Label,
  Input 
} from 'reactstrap';

class PlayerModal extends Component {
    state = {
      name: ''
    }
  
    onChange = (e) => {
      this.setState({[e.target.name]: e.target.value})
    }
  
    onSubmit = (e) => {
      e.preventDefault();
      const newName = {
        name: this.state.name
      }
  
      //add item via addItem action:
      this.props.addName(newName);
    }
  
    render() {
      return(
        <div>
          <Modal>
            <ModalHeader>Please enter a Player Name:</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Input
                    type="text"
                    name="name"
                    id="item"
                    placeholder="Username goes here.."
                    onChange={this.onChange}
                  />
                  <Button
                    color="dark"
                    style={{marginTop: "2rem"}}
                    block
                  >Play Chess!</Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
  
  export default PlayerModal;