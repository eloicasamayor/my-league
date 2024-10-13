import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Alert } from "../src/components/Alert";

describe("Alert", () => {
  test("renders", () => {
    const onCloseAlert = vi.fn();
    render(<Alert onCloseAlert={onCloseAlert}>{"text alerta"}</Alert>);
    expect(screen.getByText("text alerta")).toBeDefined();
  });

  test("calls onCloseAlert when clicking the close button", () => {
    const onCloseAlert = vi.fn();
    render(<Alert onCloseAlert={onCloseAlert}>{"text alerta"}</Alert>);

    // Simula el clic al botó de tancar
    fireEvent.click(screen.getByRole("button"));

    expect(onCloseAlert).toHaveBeenCalledWith();
  });

  test("calls onCloseAlert automatically after seconds provided in secondsToAutoClose prop", async () => {
    const onCloseAlert = vi.fn();
    render(
      <Alert onCloseAlert={onCloseAlert} secondsToAutoClose={2}>
        {"text alerta"}
      </Alert>
    );

    // Verifica que l'alerta es mostra
    expect(screen.getByText("text alerta")).toBeDefined();

    // Espera que l'alerta es tanqui
    await waitFor(() => expect(onCloseAlert).toHaveBeenCalledWith(), {
      timeout: 2500,
    });
  });
});
