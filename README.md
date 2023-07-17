# Aktuelle Netzfrequenz
Informationen zu und Visualisierung der Stromfrequenz im europäischen Verbundnetz.

## Überblick

Der Service besteht aus einer mit ASP.NET Core erstellten und in C# geschriebenen Web-App und einem Angular Client. Für das Datenbankmanagement (aktuell SQLite, später PostgreSQL) ist Entity Framework Core zuständig.

Die Web-App erfragt in regelmäßigen Abständen (aktuell alle 5 Sekunden, später jede Sekunde) die aktuelle Netzfrequenz von `https://www.netzfrequenz.info/act/json`. Diese wird in der Datenbank gespeichert und auf Nachfrage des Clients im Frontend dargeboten. Angedacht ist ein sich fortlaufend mit Frequenzmessungen füllendes Diagramm (Herz/Sekunde). Mithilfe von Hoverstates sollen Informationen zu den aktuell getroffenen Maßnahmen zur Ausbalanzierung des Netzes bereitgestellt werden.

## Starten der API

Stelle sicher, dass `.NET` (version 7.0), inklusive des CLI tools, installiert sind.
Erstelle zunächst die Datenbank mit zugehörigen Migrationen. Navigiere dazu innerhalb des API Orders:

```
dotnet ef database update
```

Dann starte die API mit:

```
dotnet run watch
```

Die verschiedenen Endpunkte können im Browser oder mithilfe von Postman unter `https://localhost:5001/api/frequency` abgefragt werden.


## Starten des Clients

Stelle sicher, dass [Angular CLI](https://github.com/angular/angular-cli) (version 14.2.11) und Node (version 16.6.0) installiert sind.

Navigiere in den `client` Ordner und installiere die Dependencies mit npm:
```
npm install
```

Dann starte den Client mit:

```
ng serve
```

Das Frontend kann jetzt unter `https://localhost:4200/` aufgerufen werden.


## Nächste Schritte

1. Design und Ausbau des Angular Frontends

- ~~Button zur Aktualisierung~~
- ~~Design des Headers, des Navigationsmenüs und des Hintergrunds~~
- ~~Erstellen eines frequency-charts mit aktuellen Frequenzmesswerten~~
- ~~Sichtbarmachen des 50Hz Richtwertes:~~
    - ~~Linie bei 50Hz~~
    - ~~Linie bei Totband~~
    - ~~Linie bei Einsatz Regelenergie~~
    - ~~50Hz mittig setzen: Chart mit festgelegter Reichweite auf y-Achse~~
- ~~Bessere Darstellung des Timestamps im Chart~~
- ~~Routing~~
- ~~Charts innerhalb der Seitengrenzen~~
- Neue Startseite nur für aktuelle Frequenz mit Informationen zu eventuellen Maßnahmen
    - ~~Design neue Startseite "Aktuell"~~
    - ~~Service der /update Endpunkt abfragt~~
    - Erstellen der Maßnahmekategorien und Beschreibungen
    - Bei Klick auf Frequenzwert: Öffnet Textfeld mit Informationen zu aktuellen Frequenz
- ~~Hintergrundfarbe bis Seitenende~~
- ~~Benutzen von DTO für Datenabfrage vom Backend~~
- Bessere Animation bei Reload des Charts
- Nav-Bar: Helle Farbe bei Hover und Klick
- Chart an der oberen Grenze um 0.05Hz nach letzter Linie weiterführen
- Evtl. blaues Design mit anderem Headerbild
- Optimierung des Line-Charts: 
    - Ausweitung mit mehr Maßnahmekategorien
    - Verbesserung der Darstellung der Maßnahmen
        - Klarer machen, in welchem Bereich, welche Maßnahmen getroffen werden
        - z.B. Einfärben des Charts oder der Chartpunkte entsprechen den getroffenen Maßnahmen mit Legende unter/neben Chart
    - Anzeigen der aktuellen Balancemaßnahmen durch Hoverstates oder Klick
    - Durch Klick auf Messpunkt im Graph öffnet sich Textfeld mit Informationen zur jeweiligen Frequenz
    - Option, historische Daten abzurufen (z.B. vor einer Minute, vor fünf Minuten)
    - Option, die Frequenz der Datenpunkte zu erhöhen oder vermindern (z.B. jede Sekunde, jede 30 Sekunden, jede Minute)
- Erstellung eines neuen, dynamischen Charts: 
    - Dynamisches Auffüllen und Animation: von links nach rechts laufende Linie 
- Optional: 
    - Hinzufügen einer dritten Seite `Informationen` mit ausführlicheren Informationen zu den Balancemaßnahmen
    - Längerfristig könnte die regelmäßige Speicherung der Daten vom Frontend aus gesteuert werden, indem der interne Endpoint `https://localhost:5001/api/frequency/update` sekündlich aufgerufen wird. Alternativ ist auch der Einsatz von Websockets denkbar. 
    - Veröffentlichung auf Github

2. Optimierung des Backends

- ~~Refaktorierung von `Progam.cs`: Aktuell findet der sekündliche Abruf der aktuellen Messwerte der Frequenz direkt in `Program.cs` statt. Diese Funktion sollte ausgelagert werden, kurzfristig innerhalb der Web-API.~~
- ~~Refaktorierung des ProjektAufbaus:~~
    - ~~Aufspalten in einzelne Projects~~
    - ~~Verwenden von Services, Repositories, DTOs, Automapper~~
- Refaktorierung der Backgroundtask: 
    - Sekündliche Speicherung der Daten
    - Die aktuell verwendete Website `https://www.netzfrequenz.info/act/json` stellt nur den aktuellen Messwert der Frequenz, aber nicht den genauen Messzeitpunkt zur Verfügung. Als Zeitpunkt wird stattdessen der Moment des Speicherns in der Datenbank verwendet, was aufgrund von Latency nicht akkurat sein könnte. Stattdessen soll zukünftig sowohl der Messwert, als auch der Messzeitpunkt von `https://www.netzfrequenzmessung.de/verlauf` mithilfe von Webscrapping übernommen werden. 
    - ~~Nach dieser Änderung soll der /update Endpunkt Zeitpunkt und Messwert bereitstellen (aktuell nur Messwert). ~~
    - Optional: In einem letzten Schritt übernimmt das Frontend den sekündlichen Aufruf des /update Endpunkts, dessen Ergebnisse in einem dynamisch erzeugten Line Chart dargestellt werden.
- Refaktorierung des /frequency Endpunkts:
    - Erst möglich nach sekündlicher Datenspeicherung
    - Neuer Parameter 'granularity': Je nach Auswahl im Frontend werden Daten pro Sekunde, pro 5 Sekunden, pro 10 Sekunden, pro Minute etc abgerufen
    - Umgang mit fehlenden Daten
- Refaktorierung Möglichkeit Granularität der Daten zu verändern
- Refaktorierung des `Controllers` Ordners: Um den HttpController, der die Endpoints der Web-App beinhaltet, möglichst lesbar zu halten, wurden die Http Anfragen und Datenbankzugriffe in den `FrequencyController` ausgelagert. Hier gibt es vermutlich eine bessere und in C# übliche Weise der Strukturierung.
- Wechsel der Datenbank zu PostgreSQL und regelmäßige Löschung der Frequenzdaten, z.B. nach zwei Tagen.
