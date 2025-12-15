import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useEffect, useState } from "react";
const BingImageOfTheDay = () => {
    const [imageUrl, setImageUrl] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchBingImage = async () => {
            try {
                const response = await fetch("https://cors-anywhere.herokuapp.com/https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US");
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                const image = data.images[0];
                setImageUrl(`https://www.bing.com${image.url}`);
                setTitle(image.title || "Bing Image of the Day");
            }
            catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                }
                else {
                    setError("An unknown error occurred");
                }
            }
            finally {
                setLoading(false);
            }
        };
        fetchBingImage();
    }, []);
    if (loading)
        return _jsx("p", { children: "Loading..." });
    if (error)
        return _jsxs("p", { children: ["Error: ", error] });
    return (_jsxs("div", { children: [_jsx("h1", { children: title }), _jsx("img", { src: imageUrl, alt: title, style: { maxWidth: "100%" } })] }));
};
export default BingImageOfTheDay;
