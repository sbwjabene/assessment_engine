# Fachliches Datenmodell - Assessment-Engined

# Grundstruktur

Index.html      -->     Assessments          -->     danke.html
(Startseite)            (logik_a.html/              (Ergebnisse)
                        mathematik_a.html)
                                |
                                |
                                v
                            script.js
                            (Logik)
                                |
                                |
                                v
                        LocalStorage
                        (Datenspeicher)

# Assessments (HTML-Seite)

Die Assessments sind:
    datei: "logik_a.html" und "mathematik_a.html"
    titel: z.B. "Prototype eines Logik Tests"
    fragen: [frage_div_1, frage_div_2, ...]

#    Frage (HTML-Element)

    Eine Frage ist immer in einem Container, der ggf. gezeigt oder versteckt ist. Diese bestehen aus:
        Container: div id= "frage_div_X"        
        typ: "freifeld" | "single_choice" | "multiple_choice"
        Frage: p id="frage_x"
        eingabe_element: <textarea> | <input radio> | <input checkbox>
        button: button id="button_X"
        Validierung: submitFreifeldAntwort() | submitSingleAntwort() | submitMultipleAntwort() // z.B. mindestlänge/maximallänge bei Freifeld


#   LocalStorage-Struktur

    Der LocalStorage ist folgendermaßen aufgebaut: 
        "localFrageCounter": "1", "2", "3", ...
        "frage_1":      Fragetext
        "antwort_1":    Benutzerantwort
        "frage_2":      Fragetext
        "antwort_2":    Benutzerantwort
        ...
    Wenn auf der Startseite kein localFrageCounter im localStorage vorhanden ist, wird einer initialisiert und auf "1" gesetzt.
    Sobald auf die Dankesseite aufgerufen wird, wird der localStorage gecleart. Auf der Startseite wird dann sofort wieder einer auf 1 gesetzt.


# Datenfluss


1. Benutzer startet Assessment
   
    1.1. initialisiereFrageCounter() --> localStorage("localFrageCounter") = "1"
   
    1.2. initialeSichtbarkeit() --> zeigt frage_div_1

2. Benutzer beantwortet Frage

    2.1 submit*Antwort() --> Validierung & localStorage.setItem()

    2.1 nächsteFrage() --> frageCounter += 1 im localStorage, nächste Frage wird angezeigt

3. Wiederholung bis alle Fragen beantwortet

4. Weiterleitung zu danke.html

    4.1 zeigeAntworten() --> Anzeige & localStorage.clear()


# Fragetypen

### Freifeld-Frage
<div id="frage_div_x">
    <h2>Fragetyp</h2>
    <p>Beschreibungstext des Fragetyps</p>
    <h3> Überschrift der Frage x</h3>
    <p id="frage_x">Fragetext</p>
    <textarea class="textarea" id="antwort_x" placeholder="Geben Sie Ihre Antwort hier ein... Sie müssen zwischen y und z Zeichen eingeben."></textarea>
    <button id="button_x" onclick="submitFreifeldAntwort(y,z,'frage_1', document.getElementById('antwort_x').value, 'frage_div_x')">Weiter</button>
</div>

### Single-Choice Frage
<div id="frage_div_3" class="hidden">
    <h2>Fragetyp</h2>
    <p>Beschreibungstext des Fragetyps</p>
    <h3>Überschrift der Frage x</h3>
    <p id="frage_x">Fragetext</p>
    <input type="radio" name="frage_x" value="a"> a <br>
    <input type="radio" name="frage_x" value="b"> b <br>
    <input type="radio" name="frage_x" value="c"> c <br>
    <input type="radio" name="frage_x" value="d"> d <br>
    <br>
    <button id="button_x" onclick="submitSingleAntwort('frage_x', 'frage_div_x', document.querySelector('input[name=\'frage_x\']:checked').value)">Weiter</button>
</div>

### Multiple-Choice Frage
<div id="frage_div_x" class="hidden">
    <h2>Fragetyp</h2>
    <p>Beschreibungstext des Fragetyps</p>
    <h3>Frage x</h3>
    <p id="frage_x">Fragetext</p>
    <input type="checkbox" name="frage_x" value="a"> a <br>
    <input type="checkbox" name="frage_x" value="b"> b <br>
    <input type="checkbox" name="frage_x" value="c"> c <br>
    <input type="checkbox" name="frage_x" value="d"> d <br>
    <input type="checkbox" name="frage_x" value="e"> e <br>
    <input type="checkbox" name="frage_x" value="f"> f <br>
    <br>
    <button id="button_x" onclick="submitMultipleAntwort('frage_x', 'frage_div_x')">Weiter</button>
</div>

## Einschränkungen des aktuellen Systems

    Was funktioniert:
1. Validierung von Eingaben
2. Speicherung im LocalStorage
3. 3 verschiedene Fragetypen
4. Anzeige der Ergebnisse

❌ **Was nicht vorhanden ist:**
1. Keine automatisierte Bewertung
2. Kein  Login
3. Keine Zeiterfassung
4. Keine benutzerfreundliche Importierung von Fragen per z.B. csv Datei
5. Keine Dauerhafte Datenspeicherung auf externen Server

## Sprachen
Frontend: HTML, CSS, JavaScript
Datenhaltung: Browser LocalStorage
Navigation: DOM-Manipulation mit CSS-Klasse (.hidden)