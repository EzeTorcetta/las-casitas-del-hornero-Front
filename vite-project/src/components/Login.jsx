import React from "react";
import { Form, Button } from "react-bootstrap";
import "./Login.css";

export default function Login() {
  return (
    <div className="container d-flex flex-column flex-md-row align-items-center">
      <div className="flex-grow-1">
        <h1 className="text-center mb-4">Login</h1>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>

          <div className="d-flex justify-content-center">
            <Button variant="primary" type="submit" className="custom-button">
              Submit
            </Button>
          </div>
        </Form>
      </div>
      <div className="flex-grow-1">
        <img
          src="https://a0.muscache.com/im/pictures/miso/Hosting-642474359942471549/original/0a66edfa-5166-47d3-b0f7-16d4eb271871.jpeg?im_w=1200"
          alt=""
          className="img-fluid"
        />
      </div>
    </div>
  );
}
