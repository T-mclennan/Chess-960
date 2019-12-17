import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Card,
  CardBody
} from "reactstrap";

class NameInputForm extends Component {
  state = {
    userName: ""
  };

  onChange = e => {
    this.setState({ userName: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.setUsername(this.state.userName);
  };

  render() {
    return (
      <div style={{ justifyContent: "center" }}>
        <Card body style={cardStyle}>
          <CardBody>
            <Form onSubmit={this.onSubmit}>
              <Label for="item">
                <h4>Please Enter a Username:</h4>
              </Label>
              <FormGroup>
                <Input
                  className="border border-info"
                  autoFocus={true}
                  type="text"
                  name="name"
                  id="item"
                  placeholder=""
                  onChange={this.onChange}
                  style={{ height: "3rem", fontSize: "1rem" }}
                />
                <Button outline color="info" style={buttonStyle} block>
                  <h5 style={{ marginTop: "0.3rem", fontWeight: "bold" }}>
                    Play Chess!
                  </h5>
                </Button>
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const cardStyle = {
  backgroundColor: "#fafafa",
  marginTop: "6rem",
  float: "none",
  marginBottom: "10px",
  padding: "10px 10px 10px 10px",
  boxShadow: "0 19px 18px",
  justifyContent: "center",
  fontSize: "1.3rem",
  width: "30rem"
};

const buttonStyle = {
  marginTop: "2rem",
  padding: "0.5rem",
  fontSize: "1.3rem",
  borderWidth: "2px",
  boxShadow: "0 1px 0.5px"
};

export default NameInputForm;
