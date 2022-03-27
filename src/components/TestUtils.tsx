import { render, RenderOptions } from "@testing-library/react";
import { FC, ReactElement } from "react";
import { BrowserRouter } from "react-router-dom";

const RouterWrapper: FC = ({ children }) => {
    return <BrowserRouter>{children}</BrowserRouter>;
};

const renderWithRouter = (
    ui: ReactElement,
    options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: RouterWrapper, ...options });

export * from "@testing-library/react";
export { renderWithRouter };
