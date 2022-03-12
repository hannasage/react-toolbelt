import { act, render, screen, waitFor } from "@testing-library/react";
import NetworkDemo from "./NetworkDemo";
import { BrowserRouter } from "react-router-dom";
import { sampleServer } from "../MockServer";

describe("Rendering", () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <NetworkDemo />
            </BrowserRouter>
        );
    });

    test("Renders without fail", () => {
        const container = screen.getByTitle("container");
        expect(container).toBeInTheDocument();
    });
});

describe("Network interfacing", () => {
    beforeAll(() => sampleServer.listen());
    beforeEach(() => {
        sampleServer.resetHandlers();
        render(
            <BrowserRouter>
                <NetworkDemo />
            </BrowserRouter>
        );
    });
    afterAll(() => sampleServer.close());

    test("Network call can succeed", async () => {
        const element = await screen.findByText(123);
        expect(element).toBeInTheDocument();
    });

    test("Network recalls on id change", async () => {
        const button = screen.getByTitle("update-button");
        button.click();

        /* This throws the following error, yet still passes:
         * Can't perform a React state update on an unmounted component.
         * Has something to do with `handleError()` in UseEndpoint. */
        const failedElement = await screen.findByText(/status: 404/i);
        expect(failedElement).toBeInTheDocument();
    });
});
