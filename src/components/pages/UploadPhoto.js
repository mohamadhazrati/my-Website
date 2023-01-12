import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { uploadPhoto } from "../../redux/action";
import styl from "../cssStyles/changing.module.css";

const UploadPhoto = ({ token }) => {
  const dispatch = useDispatch();
  const [pic, setPic] = useState(null);
  const { uplPhotoData, uplPhotoError } = useSelector(
    (state) => state.uplPhoto
  );

  useEffect(() => {
    if (uplPhotoData) {
      Swal.fire(uplPhotoData);
      dispatch({
        type: "delUplPhoto",
        payLoad: { uplPhotoData: "", uplPhotoError: "" },
      });
    } else if (uplPhotoError) {
      Swal.fire(uplPhotoError);
      dispatch({
        type: "delUplPhoto",
        payLoad: { uplPhotoData: "", uplPhotoError: "" },
      });
    }
  }, [uplPhotoData, uplPhotoError]);

  return (
    <div>
      <Form noValidate onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formBasicSetImage" className={styl.forForm}>
          <Form.Label>Set Image</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setPic(e.target.files[0])}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => dispatch(uploadPhoto(pic, token))}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(UploadPhoto);
