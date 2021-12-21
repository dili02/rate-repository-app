import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import Signin from "../src/components/Signin.jsx";

describe("<SigninForm/>", () => {
  it("calls function provided by onSubmit prop after pressing the submit button", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = render(
      <Signin onSubmit={onSubmit} />
    );

    const usernameField = getByPlaceholderText("Username");
    const passwordField = getByPlaceholderText("Password");

    fireEvent.changeText(usernameField, "kalle");
    fireEvent.changeText(passwordField, "password");
    fireEvent.press(getByText("LOGIN"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1);
      expect(onSubmit.mock.calls[0][0]).toEqual({
        username: "kalle",
        password: "password",
      });
    });
  });
});
