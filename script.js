// Functions

function initialisiereFrageCounter() { // Erstellt den Frage Counter, falls er noch nicht existiert
    if (localStorage.getItem("localFrageCounter")) 
        return;
    else 
        localStorage.setItem("localFrageCounter", JSON.stringify(1)); // Speichert den initialen Counter im local storage
}

function nächsteFrage() {
    frageCounter = JSON.parse(localStorage.getItem("localFrageCounter"));
    frageCounter += 1;
    localStorage.setItem("localFrageCounter", JSON.stringify(frageCounter)); // Update den Frage Counter im local storage

    const frageDiv = document.getElementById(`frage_div_${frageCounter}`); // Hole den div der nächsten Frage
    if (frageDiv) { // Checke ob die nächste Frage Div existiert
        frageDiv.classList.remove("hidden"); // Remove die hidden class um die Frage anzuzeigen
        // checke ob die nächste Frage die letzte ist, um die Button-Beschreibung zu ändern
        nächste_frageDiv = document.getElementById(`frage_div_${frageCounter+1}`);
        if (nächste_frageDiv) {
            return;
        } else {
            document.getElementById(`button_${frageCounter}`).innerText = "Absenden"; // Ändere den Button Text zu "Absenden" für die letzte Frage
        }
    }
    else {
        window.location.href = "danke.html"; // Wenn keine weiteren Fragen vorhanden sind, weiterleiten zur Danke-Seite
    }
}


function submitFreifeldAntwort(minLength, maxLength, frageId, inputAnswer, frageDivId) { //min/max Length zum Validieren, frageId/inputAnswer für local storage, frageDivId für hide/show
    frageCounter = JSON.parse(localStorage.getItem("localFrageCounter"));
    if (inputAnswer.length >= minLength && inputAnswer.length <= maxLength) { // Checke ob die Antwort valide ist
        localStorage.setItem("antwort_" + frageCounter, JSON.stringify(document.getElementById(frageId).innerText)); // Speicher die Frage in local storage
        localStorage.setItem(frageId, JSON.stringify(inputAnswer)); // Speicher die Antwort in local storage
        document.getElementById(frageDivId).classList.add("hidden"); // Füge die vorherige Frage zur hidden class hinzu
        nächsteFrage()
    } else {
        alert(`Deine Antwort muss zwischen ${minLength} und ${maxLength} Zeichen liegen.`); // Show error Nachricht
    }
}

function submitSingleAntwort(frageId, frageDivId, inputAnswer) { // Funktion zum Absenden von Single-Choice Antworten
    frageCounter = JSON.parse(localStorage.getItem("localFrageCounter"));
    if (inputAnswer) {
        localStorage.setItem("antwort_" + frageCounter, JSON.stringify(document.getElementById(frageId).innerText)); // Speicher die Frage im local storage
        localStorage.setItem(`${frageId}`, JSON.stringify(inputAnswer));
        document.getElementById(frageDivId).classList.add("hidden");
        nächsteFrage();
    } else {
        alert("Bitte wähle eine Antwort aus.");
    }
}

initialisiereFrageCounter(); // Initialisiere den Frage Counter beim Laden der Seite