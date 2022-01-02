import React from "react";
import ReactDOM from "react-dom";
import Login from "./Login";

it("Login renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
});

/* ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        <QueProvider>
          <UIProvider>
            <App />
          </UIProvider>
        </QueProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
 */
