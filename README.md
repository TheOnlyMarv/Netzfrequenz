# Aktuelle Netzfrequenz
Informationen zu und Visualisierung der Frequenz im europäischen Verbundnetz.

## Überblick

Der Service besteht aus einer mit ASP.NET Core erstellten und in C# geschriebenen Web-App und einem Angular Client. Für das Datenbankmanagement (aktuell SQLite, später PostgreSQL) ist Entity Framework Core zuständig.

Die Web-App erfragt in regelmäßigen Abständen (aktuell alle 5 Sekunden, später jede Sekunde) die aktuelle Netzfrequenz von `https://www.netzfrequenz.info/act/json`. Diese wird in der Datenbank gespeichert und auf Nachfrage des Clients im Frontend dargeboten. 


## Nächste Schritte

1. Design und Ausbau des Angular Frontends

Angedacht ist ein sich fortlaufend mit Frequenzmessungen füllendes Diagramm (Herz/Sekunde). Mithilfe von Hoverstates sollen Informationen zu den aktuell getroffenen Maßnahmen zur Ausbalanzierung des Netzes bereitgestellt werden.

2. Optimierung des Backends

- Die aktuell verwendete Website `https://www.netzfrequenz.info/act/json` stellt nur den aktuellen Messwert der Frequenz, aber nicht den genauen Messzeitpunkt zur Verfügung. Als Zeitpunkt wird stattdessen der Moment des Speicherns in der Datenbank verwendet, was aufgrund von Latency nicht akkurat sein könnte. Stattdessen soll zukünftig sowohl der Messungswert, als auch der Messzeitpunkt von `https://www.netzfrequenzmessung.de/verlauf.html` mithilfe von Webscrapping übernommen werden. 
- Refaktorierung des `Controllers` Ordners: Um den HttpController, der die Endpoints der Web-App beinhaltet, möglichst lesbar zu halten, wurden die Http Anfragen und Datenbankzugriffe in den `FrequencyController` ausgelagert. Hier gibt es vermutlich eine bessere und in C# übliche Weise der Strukturierung.
- Refaktorierung von `Progam.cs`: Aktuell findet der sekündliche Abruf der aktuellen Messwerte der Frequenz direkt in `Program.cs` statt. Diese Funktion sollte ausgelagert werden, kurzfristig innerhalb der Web-API. Längerfristig sollte der regelmäßige Abruf der Daten (wohl) vom Frontend gesteuert werden, indem der interne Endpoint `https://localhost:5001/api/frequency/update` sekündlich aufgerufen wird.
- Wechsel der Datenbank zu PostgreSQL und regelmäßige Löschung der Frequenzdaten, z.B. nach zwei Tagen.

## Starten der API

Stelle sicher, dass `.NET` (version 7.0), inklusive des CLI tools, installiert ist.
Erstelle zunächst die Datenbank mit zugehörigen Migrationen. Navigiere dazu innerhalb des API Orders:
`dotnet ef database update`

Dann starte die API mit:
`dotnet run watch`

Die verschiedenen Endpunkte können im Browser oder mithilfe von Postman unter `https://localhost:5001/api/frequency` erreicht werden.

## Starten des Clients

Stelle sicher, dass [Angular CLI](https://github.com/angular/angular-cli) (version 14.2.11) installiert ist.

Dann starte den Client mit:
`ng serve`

Das Frontend kann jetzt unter `http://localhost:4200/` aufgerufen werden.
