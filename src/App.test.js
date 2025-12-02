import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

test("renderiza la pantalla de Login al iniciar", () => {
  render(
    <MemoryRouter initialEntries={["/LoginPage"]}>
      <App />
    </MemoryRouter>
  );

  expect(screen.getAllByText(/Iniciar Sesión/i).length).toBeGreaterThan(0);
});

