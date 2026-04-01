// TID
function updateDateTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    }

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    const timeString = hours + ":" + minutes;

    

    const dateString = now.toLocaleDateString("sv-SE", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    document.getElementById("time").textContent = timeString;
    document.getElementById("date").textContent = dateString;
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
