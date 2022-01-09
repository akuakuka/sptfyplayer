import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "./Login";

// TODO: React testing library with VITE and JEST
/**
 * @jest-environment jsdom
 */
// TODO: eri filiin localstoragemocktest?

it("Localstorage mock is working", () => {
  // TODO: uuid?
  const as = "asdadssa";

  localStorage.setItem("key", as);
  expect(localStorage.getItem("key")).toBe(as);
});

it("Renders login button ", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    div
  );
  const button = div.querySelector("#loginButton");

  expect(button?.innerHTML).toEqual("Login with spotify");
});

it("Renders login button without access_token", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
    div
  );
});

it("Redirects to /app with access_token", () => {
  const as = "asdadssa";

  localStorage.setItem("key", as);
  console.log(localStorage.getItem("key"));
  expect(localStorage.getItem("key")).toBe(as);
});

it("Redirects to /login without access_token", () => {});

it("Redirects to loginpath when button pressed", () => {
  const div = document.createElement("div");
  render(
    <BrowserRouter>
      <Login />
    </BrowserRouter>,
    div
  );

  const button = div.querySelector("#loginButton");
  /*  */
  /*  expect(document.location.href).toBe("You clicked 1 times"); */
});
