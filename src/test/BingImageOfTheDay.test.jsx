import { render, screen, waitFor } from "@testing-library/react"
import { vi } from "vitest"
import BingImageOfTheDay from "../BingImageOfTheDay.jsx"

describe("BingImageOfTheDay", () => {
    beforeEach(() => {
        vi.spyOn(global, "fetch").mockResolvedValue({
            ok: true,
            json: async () => ({
                images: [
                    {
                        url: "/th?id=OHR.SampleImage_EN-US1234567890.jpg",
                        title: "Sample Title",
                    },
                ],
            }),
        })
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })

    test("renders loading initially", () => {
        render(<BingImageOfTheDay />)
        expect(screen.getByText(/loading/i)).toBeInTheDocument()
    })

    test("renders image and title after fetch", async () => {
        render(<BingImageOfTheDay />)

        const img = await screen.findByRole("img")

        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute(
            "src",
            "https://www.bing.com/th?id=OHR.SampleImage_EN-US1234567890.jpg"
        )
        expect(screen.getByRole("heading")).toHaveTextContent("Sample Title")
    })

    test("renders error message on fetch failure", async () => {
        global.fetch.mockRejectedValueOnce(new Error("Fetch failed"))

        render(<BingImageOfTheDay />)

        await waitFor(() =>
            expect(screen.getByText(/error/i)).toBeInTheDocument()
        )
    })
})
