const backgroundButton = document.getElementById("new-bg");

backgroundButton.addEventListener("click", fetchBackgroundData);


async function fetchBackgroundData() {
    try {
        const bgDiv = document.querySelector(".bg-image");

        const key = "hHS_huYDnwhhZadZPB7IkqXWWHY72ZTk6aovvwW4a1M";

        const response = await fetch(
            `https://api.unsplash.com/photos/random?client_id=${key}`,
        );

        if (!response.ok) {
            throw new Error("Fel vid hämtning av bild");
        }

        const data = await response.json();

        console.log(data);

        const imageUrl = data.urls.regular;

        setBackgroundImage(bgDiv, imageUrl);
    } catch (error) {
        console.log("Error:", error);
    }
}

function setBackgroundImage(element, url) {
    element.style.backgroundImage = `url(${url})`;
    element.style.backgroundSize = "cover";
    element.style.backgroundPosition = "center";
}
fetchBackgroundData();

