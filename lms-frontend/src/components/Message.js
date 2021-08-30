import React, { useState } from "react";
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  const [show, setShow] = useState(true);

  return (
    <>
      <Alert
        show={show}
        variant={variant}
        dismissible
        onClose={() => {
          setShow(false);
          children = undefined;
        }}
      >
        {children}
      </Alert>
    </>
  );
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
