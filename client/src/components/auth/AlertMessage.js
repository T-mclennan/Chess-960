import React, { useState } from "react";
import { Alert } from "reactstrap";

const AlertMessage = props => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => setVisible(false);

  return (
    <Alert color="info" isOpen={visible} toggle={onDismiss}>
      Alert!
    </Alert>
  );
};

export default AlertMessage;
