![](bundestag_captcha/captchas/unfug.png)

Viele CDU/CSU Politiker*innen auf einen Schlag anschreiben, ohne viel Geklicke, ohne Captchas lösen zu müssen, halbwegs automatisch? Unfug machts möglich.

# Wie funktioniert's?
Der beigefügte JavaScript Code füllt auf den Kontaktseiten der Abgeordneten des Bundestages die benötigten Felder aus, schickt das Captcha an eine remote/lokale API, welche das Captcha mittels Machine Learning löst und die Lösung zurückgibt. Die Lösung wird in das zugehörige Textfeld geschrieben, und dann der Senden-Knopf automatisch gedrückt.

Es muss also nur die Kontaktseite geöffnet werden, und der Rest passiert von ganz alleine. Leider hat der Bundestag ein Rate-Limiting, ab und an schlägt das Senden fehl. Dann einfach kurz warten (2-3 Minuten), und dann erneut probieren.

Eine Liste aller Abgeordneten (Stand 01.2025), sortiert nach Partei, findet sich in [Abgeordnete.md](Abgeordnete.md), die Links führen direkt zu den Kontaktformularen.

# Wie nutz' ich's?
- Installiere das [javascript](https://addons.mozilla.org/en-US/firefox/addon/javascript/?utm_source=addons.mozilla.org&utm_medium=referral&utm_content=search) Plugin im Firefox (oder einer entsprechenden Alternative für andere Browser).
- Die Captcha API ist nur rudimentär aufgesetzt und hat keine validen Zertifikate. Um diese zu ignorieren, öffne https://195.90.200.158:8080/ und ignoriere die Fehlermeldung. Du solltest ein "It works" sehen wenn alles geklappt hat.
- Gehe auf die Startseite vom Bundestag und füge den Inhalt von *automate.js* in das Popup ein, welches sich öffnet wenn du die Extension startest.
- Update die Variablen *contact*, *my_name*, *subject* und *message* mit den Inhalten, die du verschicken möchtest.
- Wenn nun eine Kontaktseite eines/r Abgeordneten geöffnet wird, füllt sich das Formular nach kurzer Zeit selbst aus.
- Beachte das Rate-Limit, bei zu vielen Anfragen in zu wenig Zeit, wird eine Fehlermeldung beim Senden erscheinen.

## Captcha API selber hosten
- Ersetze die IP in `automate.js` mit `localhost`
- Um das Captcha zu lösen, werden einige Machine Learning Libraries benötigt. Diese installierst so: `pip3 install -r requirements.txt`
- Dann muss die API gestartet werden, an die die Captchas gesendet um gelöst zu werden: `python3 api.py`
- Die API nutzt self-signed Zertifikate, damit keine Fehler aufgrund von Mixed Content auftreten. Nach erstem Start der API bitte einmal https://localhost:8080/ aufrufen und die Warnung wegklicken, danach ist alles eingerichtet, damit das JavaScript Plugin POST requests zur API schicken kann.


# Warum?
Manche Parteien sind sich nicht im Klaren über die Gefahren, die von gesichert rechtsextremen und undemokratischen Parteien ausgeht. Im Zuge der Entscheidung über eine Prüfung des AfD-Verbots vor dem Bundesverfassungsgericht, baten NGOs und Kampagnenplattformen darum, lokale CDU/CSU und FDP Politiker\*innen anzuschreiben, und jenen zu erklären, warum diese Prüfung und ein möglicherweise daraus resultierendes Verbot wichtig sind. Für die Entscheidung im Bundestag braucht es eine einfache Mehrheit. Warum also nicht alle Politiker\*innen kontaktieren, und ihnen zeigen, dass die **Mehrheit gegen rechts** ist, dass die **Mehrheit eine Demokratie will**, in der die Würde jedes Einzelnen geachtet wird, und dass die **Mehrheit die Brandmauer gegen rechts aufrechterhalten** will (im Gegensatz zu Merz, Linneman und Co.).

# Weitere Infos (Technisch)
Entwickelt und getestet wurde auf Linux (Linux --- 6.6.34-1-MANJARO) mit Python 3.12.4. Ob das Modell fürs Lösen der Captchas inkl. API unter Windows läuft, kann ich nicht sagen.

Der Code in `solver.py` funktioniert, ist aber nicht schön. Hier kann gerne bereinigt werden, solange die Funktionalität weiterhin gegeben ist.

Informationen zum Captcha Solver finden sich in der zugehörigen [README](bundestag_captcha/README.md).
