import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changeProfile } from "../../redux/action";
import styl from "../cssStyles/changing.module.css";

const ChangeProfile = ({ token }) => {
  const dispatch = useDispatch();
  const { chngProfData, chngProfError } = useSelector(
    (state) => state.chngProfile
  );
  const [firstName, setFirstName] = useState({
    value: "",
    error: "firstName is Not valid",
    isTouched: false,
  });
  const [lastName, setLastName] = useState({
    value: "",
    error: "lastName is Not valid",
    isTouched: false,
  });
  const [gender, setGender] = useState({
    value: "",
    error: "gender is Not valid",
    isTouched: false,
  });
  const [age, setAge] = useState({
    value: "",
    error: "age is Not valid",
    isTouched: false,
  });
  const [city, setCity] = useState({
    value: "",
    error: "city is Not valid",
    isTouched: false,
  });

  useEffect(() => {
    if (chngProfData) {
      Swal.fire(chngProfData);
      dispatch({
        type: "delChngProf",
        payLoad: { chngProfData: "", chngProfError: "" },
      });
    } else if (Object.keys(chngProfError).length) {
      const error = chngProfError?.response?.data?.message;
      if (error.length === 4) {
        Swal.fire(`${error[0]} , ${error[1]} , ${error[2]} , ${error[3]}`);
      } else if (error.length === 3) {
        Swal.fire(`${error[0]} , ${error[1]} , ${error[2]}`);
      } else if (error.length === 2) {
        Swal.fire(`${error[0]} , ${error[1]}`);
      } else {
        Swal.fire(error[0]);
      }
      dispatch({
        type: "delChngProf",
        payLoad: { chngProfData: "", chngProfError: "" },
      });
    }
  }, [chngProfData, chngProfError]);

  return (
    <div>
      <Form noValidate onSubmit={(e) => e.preventDefault()}>
        <Form.Group controlId="formBasicFirstName" className={styl.forForm}>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            onChange={(e) =>
              setFirstName((last) => {
                const help = { ...last };
                help.value = e.target.value;
                help.value = help.value.trim();
                return { ...help };
              })
            }
            onBlur={() => {
              setFirstName((last) => {
                const help = { ...last };
                help.isTouched = true;
                return { ...help };
              });
            }}
            onFocus={() =>
              setFirstName((last) => {
                const help = { ...last };
                help.isTouched = false;
                return { ...help };
              })
            }
          />
          <Form.Text>
            {!/^([a-zA-Z0-9\s])([\w\-\s]{2,15})$/.test(firstName.value) &&
              firstName.isTouched && (
                <span className={styl.redIt}>{firstName.error}</span>
              )}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicLastName" className={styl.forForm}>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            onChange={(e) =>
              setLastName((last) => {
                const help = { ...last };
                help.value = e.target.value;
                help.value = help.value.trim();
                return { ...help };
              })
            }
            onBlur={() => {
              setLastName((last) => {
                const help = { ...last };
                help.isTouched = true;
                return { ...help };
              });
            }}
            onFocus={() =>
              setLastName((last) => {
                const help = { ...last };
                help.isTouched = false;
                return { ...help };
              })
            }
          />
          <Form.Text>
            {!/^([a-zA-Z0-9\s])([\w\-\s]{2,15})$/.test(lastName.value) &&
              lastName.isTouched && (
                <span className={styl.redIt}>{lastName.error}</span>
              )}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicGender" className={styl.forForm}>
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your gender"
            onChange={(e) =>
              setGender((last) => {
                const help = { ...last };
                help.value = e.target.value;
                help.value = help.value.trim();
                return { ...help };
              })
            }
            onBlur={() => {
              setGender((last) => {
                const help = { ...last };
                help.isTouched = true;
                return { ...help };
              });
            }}
            onFocus={() =>
              setGender((last) => {
                const help = { ...last };
                help.isTouched = false;
                return { ...help };
              })
            }
          />
          <Form.Text>
            {!/^([a-zA-Z0-9\s])([\w\-\s]{3,15})$/.test(gender.value) &&
              gender.isTouched && (
                <span className={styl.redIt}>{gender.error}</span>
              )}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicAge" className={styl.forForm}>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            onChange={(e) =>
              setAge((last) => {
                const help = { ...last };
                help.value = e.target.value;
                help.value = help.value.trim();
                return { ...help };
              })
            }
            onBlur={() => {
              setAge((last) => {
                const help = { ...last };
                help.isTouched = true;
                return { ...help };
              });
            }}
            onFocus={() =>
              setAge((last) => {
                const help = { ...last };
                help.isTouched = false;
                return { ...help };
              })
            }
          />
          <Form.Text>
            {age.value <= 14 && age.isTouched && (
              <span className={styl.redIt}>{age.error}</span>
            )}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicCity" className={styl.forForm}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            onChange={(e) =>
              setCity((last) => {
                const help = { ...last };
                help.value = e.target.value;
                help.value = help.value.trim();
                return { ...help };
              })
            }
            onBlur={() => {
              setCity((last) => {
                const help = { ...last };
                help.isTouched = true;
                return { ...help };
              });
            }}
            onFocus={() =>
              setCity((last) => {
                const help = { ...last };
                help.isTouched = false;
                return { ...help };
              })
            }
          />
          <Form.Text>
            {!/^([a-zA-Z0-9\s])([\w\-\s]{2,20})$/.test(city.value) &&
              city.isTouched && (
                <span className={styl.redIt}>{city.error}</span>
              )}
          </Form.Text>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            if (
              firstName.value &&
              lastName.value &&
              gender.value &&
              age.value &&
              city.value
            ) {
              dispatch(
                changeProfile(
                  firstName.value,
                  lastName.value,
                  gender.value,
                  age.value,
                  city.value,
                  token
                )
              );
            }
          }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default React.memo(ChangeProfile);
