const defaultLinks = [
    {
        title: "Google",
        url: "https://www.google.com/",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNqj_BACxuoGE7co2RFznug8f_xcjNR0Lng&s",
    },
    {
        title: "Notion",
        url: "https://www.notion.com/",
        img: "https://images-eds-ssl.xboxlive.com/image?url=4rt9.lXDC4H_93laV1_eHM0OYfiFeMI2p9MWie0CvL99U4GA1gf6_kayTt_kBblFwHwo8BW8JXlqfnYxKPmmBUDu2rz06EjlN1L8I9rDKxNCFqtaMlSGUP7HME_3NO_IV_oo65qEDMhG0OONQl3Eh46hPAOwBr6X4jEKqiCHFgo-&format=source",
    },
    {
        title: "Google",
        url: "https://www.google.com/",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBNqj_BACxuoGE7co2RFznug8f_xcjNR0Lng&s",
    },
    {
        title: "ChatGpt",
        url: "https://www.chatgpt.com/",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdM9MEQ0ExL1PmInT3U5I8v63YXBEdoIT0Q&s",
    },
];

const container = document.getElementById("links-boxes");
const addButton = document.getElementById("add-link");

const popUp = document.getElementById("pop-up");
const linkButton = document.getElementById("link-added");
const linkHeadline = document.getElementById("input-link-headline");
const linkInput = document.getElementById("input-link");

let links = JSON.parse(localStorage.getItem("links"));

if (!links) {
    links = defaultLinks;
    localStorage.setItem("links", JSON.stringify(links));
}

function renderLinks() {
    container.querySelectorAll(".boxInBox").forEach((el) => el.remove());

    links.forEach((link, index) => {
        createLinkElement(link, index);
    });
}

function createLinkElement(linkData, index) {
    const linkbox = document.createElement("div");
    linkbox.classList.add("boxInBox");

    linkbox.innerHTML = `
        <img src="${linkData.img || "https://static.thenounproject.com/png/1077596-200.png"}" />
        <a href="${linkData.url}" target="_blank">${linkData.title}</a>
        <button class="delete-btn">x</button>
    `;

    linkbox.querySelector(".delete-btn").addEventListener("click", () => {
        deleteLink(index);
    });

    container.insertBefore(linkbox, addButton);
}

function deleteLink(index) {
    links.splice(index, 1);
    localStorage.setItem("links", JSON.stringify(links));
    renderLinks();
}

addButton.addEventListener("click", () => {
    popUp.classList.add("pop-up-vis");
});

linkButton.addEventListener("click", () => {
    const newLink = {
        url: linkInput.value,
        title: linkHeadline.value,
    };

    links.push(newLink);
    localStorage.setItem("links", JSON.stringify(links));

    renderLinks();

    linkInput.value = "";
    linkHeadline.value = "";

    popUp.classList.remove("pop-up-vis");
});

renderLinks();
const clearBtn = document.getElementById("clear-storage");

clearBtn.addEventListener("click", () => {
    localStorage.clear();
    location.reload(); // 🔥 uppdaterar sidan direkt
});
