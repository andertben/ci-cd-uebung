import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import BingImageOfTheDay from "../BingImageOfTheDay";
describe("BingImageOfTheDay", () => {
    // Fetch pro Test mocken
    beforeEach(() => {
        vi.spyOn(globalThis, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({
                images: [
                    {
                        url: "/th?id=OHR.SampleImage_EN-US1234567890.jpg",
                        title: "Sample Title",
                    },
                ],
            }),
        });
    });
    afterEach(() => {
        vi.restoreAllMocks();
    });
    test("renders loading initially", () => {
        render(_jsx(BingImageOfTheDay, {}));
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
    test("renders image and title after fetch", async () => {
        render(_jsx(BingImageOfTheDay, {}));
        const img = await screen.findByRole("img");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "https://www.bing.com/th?id=OHR.SampleImage_EN-US1234567890.jpg");
        expect(screen.getByRole("heading")).toHaveTextContent("Sample Title");
    });
    test("renders error message on fetch failure", async () => {
        // Fetch für diesen Test ablehnen
        globalThis.fetch = vi.fn().mockRejectedValueOnce(new Error("Fetch failed"));
        render(_jsx(BingImageOfTheDay, {}));
        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });
});
