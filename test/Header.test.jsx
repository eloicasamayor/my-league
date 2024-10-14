import React from "react";
import { describe, expect, test, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Header } from "../src/components/Header";

describe("Header", () => {
  const headerProps = {
    location: { pathname: "/" },
    authData: { user: { email: "string", id: "string" }, session: true },
    navigate: "any",
  };

  test("at home must contain `My League`", () => {
    render(<Header {...headerProps}></Header>);
    expect(screen.getByText("My League")).toBeDefined();
    expect(screen.findAllByTestId("main-title")).toBeDefined();
  });

  test("At /new-league must contain `Creating new league` and the go-back button", () => {
    headerProps.location.pathname = "/new-league";
    render(<Header {...headerProps} />);

    expect(screen.getByText("Creating new league")).toBeDefined();
    expect(screen.findAllByTestId("go-back-btn")).toBeDefined();
  });

  test("At other page there should'nt be a title and there should be the go-home button", () => {
    headerProps.location.pathname = "/other-page";

    const { container } = render(<Header {...headerProps} />);

    expect(container.querySelector("h1")).toBeNull();
    expect(screen.findAllByTestId("go-home-btn")).toBeDefined();
  });

  test("At /account must contain the account-btn button", () => {
    headerProps.location.pathname = "/account";

    render(<Header {...headerProps} />);
    expect(screen.findAllByTestId("account-btn")).toBeDefined();
  });
});
