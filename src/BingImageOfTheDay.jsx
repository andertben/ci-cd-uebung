import React, { useEffect, useState } from "react";

const BingImageOfTheDay = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBingImage = async () => {
            try {
                const response = await fetch(
                    "https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US"
                );

                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const image = data.images[0];
                setImageUrl(`https://www.bing.com${image.url}`);
                setTitle(image.title || "Bing Image of the Day");
            } catch (err) {
                setError(err.message);
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
