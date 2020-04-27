import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, FormGroup, Label, Spinner } from "reactstrap";

import axios, { setToken } from "../utils/axios";
import "./LoginForm.scss";

function LoginForm(props) {
  const { history } = props;
  const [loading, setLoading] = useState(false);
  const { handleSubmit, register, errors, setError } = useForm();
  const isRegistering = history.location.pathname === "/register";

  const onSubmit = (values) => {
    setLoading(true);
    const url = isRegistering ? "/api/auth/register" : "/api/auth/login";
    axios()
      .post(url, values)
      .then(({ data }) => {
        if (data.token) setToken(data.token);
        history.push("/jokes");
      })
      .catch((err) => {
        console.dir(err);
        setLoading(false);
        setError("response", "responseError", err.response.data.message);
      });
  };

  return (
    <>
      <form className="form auth-form" onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="username">Username</Label>
          <input
            className="form-control"
            name="username"
            type="text"
            id="username"
            ref={register({
              required: "Required",
            })}
          />
          <span className="error">
            {errors.username && errors.username.message}
          </span>
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <input
            className="form-control"
            type="password"
            name="password"
            id="password"
            ref={register({
              required: "Required",
            })}
          />
          <span className="error">
            {errors.password && errors.password.message}
          </span>
        </FormGroup>

        {!loading && (
          <>
            <Button type="submit" color="primary" size="lg" block>
              {isRegistering ? "Register" : "Login"}
            </Button>
            {!isRegistering && (
              <Button
                color="info"
                size="lg"
                block
                onClick={() => history.push("/register")}
              >
                Sign Up
              </Button>
            )}
          </>
        )}
        <span className="response error">
          {errors.response && errors.response.message}
        </span>
      </form>
      {loading && <Spinner color="primary" />}
    </>
  );
}

export default LoginForm;
