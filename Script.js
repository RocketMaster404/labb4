// TID
function updateDateTime() {
    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    const timeString = `${hours}:${minutes}`;

    const options = { day: "numeric", month: "long", year: "numeric" };
    const dateString = now.toLocaleDateString("sv-SE", options);

    const fullString = `${timeString}  ${dateString}`;

    document.getElementById("showDateTime").textContent = fullString;
}

updateDateTime();

setInterval(updateDateTime, 1000);

// HEADLINE

const headLine = document.getElementById("headline");
headLine.contentEditable = "true";

const savedHeadline = localStorage.getItem("headline");

if (savedHeadline) {
    headLine.textContent = savedHeadline;
}

headLine.addEventListener("input", () => {
    localStorage.setItem("headline", headLine.textContent);
});



// Notes

const note = document.getElementById("notes");

const savedNote = localStorage.getItem("notes");
if (savedNote) {
    note.value = savedNote;
}

note.addEventListener("input", () => {
    localStorage.setItem("notes", note.value);
});

console.log(note);


