import React, { useEffect, useState } from "react";

// Typdefinition für die Bing API Response
interface BingImage {
    url: string;
    title?: string;
}

interface BingApiResponse {
    images: BingImage[];
}

const BingImageOfTheDay: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>("");
    const [title, setTitle] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchBingImage = async () => {
            try {
                const response = await fetch(
                    "https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }

                const data: BingApiResponse = await response.json();
                const image = data.images[0];
                setImageUrl(`https://www.bing.com${image.url}`);
                setTitle(image.title || "Bing Image of the Day");
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError("An unknown error occurred");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBingImage();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>{title}</h1>
            <img src={imageUrl} alt={title} style={{ maxWidth: "100%" }} />
        </div>
    );
};

export default BingImageOfTheDay;
