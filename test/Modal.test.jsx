import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "../src/components/Modal";

describe("Modal", () => {
  test("renders", () => {
    const onCloseModal = vi.fn();
    render(
      <Modal title="titol de probaa" onCloseModal={onCloseModal}>
        <h2>{"subtitol"}</h2>
      </Modal>
    );
    expect(screen.getByText("titol de probaa")).toBeDefined();
  });

  test("calls onCloseModal when clicking the close button", () => {
    const onCloseModal = vi.fn();
    render(
      <Modal title="Test Title" onCloseModal={onCloseModal}>
        <h2>{"Subtitol"}</h2>
      </Modal>
    );

    // Simula el clic al botó de tancar
    fireEvent.click(screen.getByRole("button", { name: /close modal/i }));

    expect(onCloseModal).toHaveBeenCalledWith();
  });

  test("calls onCloseModal when clicking outside the modal", () => {
    const onCloseModal = vi.fn();
    const { container } = render(
      <Modal title="Test Title" onCloseModal={onCloseModal}>
        <h2>{"Subtitol"}</h2>
      </Modal>
    );

    // Simula el clic fora del modal
    fireEvent.click(container.querySelector("#modal-bg"));

    expect(onCloseModal).toHaveBeenCalledWith();
  });
});
