import { render, screen, waitFor } from "@testing-library/react";
import BingImageOfTheDay from "./BingImageOfTheDay";

// Mock fetch
global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () =>
            Promise.resolve({
                images: [
                    { url: "/th?id=OHR.SampleImage_EN-US1234567890.jpg", title: "Sample Title" },
                ],
            }),
    })
);

describe("BingImageOfTheDay", () => {
    afterEach(() => {
        fetch.mockClear();
    });

    test("renders loading initially", () => {
        render(<BingImageOfTheDay />);
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test("renders image and title after fetch", async () => {
        render(<BingImageOfTheDay />);
        await waitFor(() => expect(screen.getByRole("img")).toBeInTheDocument());
        expect(screen.getByRole("img")).toHaveAttribute(
            "src",
            "https://www.bing.com/th?id=OHR.SampleImage_EN-US1234567890.jpg"
        );
        expect(screen.getByRole("heading")).toHaveTextContent("Sample Title");
    });

    test("renders error message on fetch failure", async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error("Fetch failed")));
        render(<BingImageOfTheDay />);
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });
});
