# Captchas vom deutschen Bundestag lösen
## Daten sammeln
Über den Aufruf von `python3 bundestag_captcha/download_captcha.py` werden Captchas in das Verzeichnis *bundestag_captcha/captchas* geladen. Momentan liegen dort 464 bereits gelabelte Dateien, auf denen das aktuelle Modell `bundestag.keras` trainiert wurde.

## Daten labeln
Über den Aufruf von `python3 bundestag_captcha/relabel_captchas.py` werden alle ungelabelten Captchas der Reihe nach im Image Viewer geöffnet. Ggf. muss hier die Variable `IMAGE_VIEWER` auf das Programm eurer Wahl geändert werden (feh, loupe, gthumb, ...). Im Terminal dann einfach die Lösung des Captchas eingeben und das File wird entsprechend umbenannt. Wenn keine Captchas mehr gelabelt werden müssen, endet das Programm, bzw. startet nicht.

## Trainieren
Das Training des Modells erfolgt über den Aufruf von `python3 bundestag_captcha/train.py`. Da ich wenig Ahnung von Machine Learning habe, habe ich schlicht [diese Anleitung](https://keras.io/examples/vision/captcha_ocr/) befolgt.

## Testen
Um zu testen, kann aus der Datei `solver.py` einfach die Funktion `solve_captcha(file_path: str) -> str` importiert werden.

## TODO:
Die Datei `solver.py` funktioniert, ist aber nicht schön. Könnte man fixen, wenn wer Ahnung hat.