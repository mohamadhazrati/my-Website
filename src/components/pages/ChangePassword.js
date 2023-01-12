import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changePass } from "../../redux/action";
import styl from "../cssStyles/changing.module.css";

const ChangePassword = ({ token }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const { chngPassData, chngPassError } = useSelector(
    (state) => state.chngPass
  );

  useEffect(() => {
    if (chngPassData) {
      Swal.fire(chngPassData);
      dispatch({
        type: "delChngPass",
        payLoad: { chngPassData: "", chngPassError: "" },
      });
    } else if (chngPassError) {
      Swal.fire(chngPassError);
      dispatch({
        type: "delChngPass",
        payLoad: { chngPassData: "", chngPassError: "" },
      });
    }
  }, [chngPassData, chngPassError]);

  return (
    <div>
      <Form noValidate onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formBasicPassword" className={styl.forForm}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </Form.Group>

        <Form.Group controlId="formBasicNewPassword" className={styl.forForm}>
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="New Password"
            onChange={(e) => setNewPass(e.target.value.trim())}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            if (password && newPass) {
              dispatch(changePass(password, newPass, token));
            }
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(ChangePassword);
