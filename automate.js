// enter some javascript here and it will run
// on every page on this domain (location.host)
// TODO: Please change accordingly!
let contact = "Valide E-Mail Addresse";
let my_name = "Nachname, Vorname";
let subject = "Kurzer und prägnanter Betreff";
// USER wird durch den Namen des/der Abgeordneten ersetzt
let message = `Sehr geehrte/r Abgeordnete/r USER,
Nachricht hier einfügen
`;
let mdb_name = document.getElementById("formelement-444040").value;
message = message.replace("USER", mdb_name);

// Only run on contact pages on the bundestag domain
setTimeout(() => {
    if (window.location.href.indexOf("contactform?mdbId=") != -1) {
        document.getElementById("formelement-444044").value = subject;
        document.getElementById("formelement-444048").value = message;
        document.getElementById("formelement-444112").value = my_name;
        document.getElementById("formelement-444108").value = contact;

        // Check DSGVO
        document.getElementById("formelement-558174").click();

        // Allow sending copy to user
        document.getElementById("formelement-444122").click();


        // Captcha Stuff
        // Get image from HTML, draw to canvas, extract byte data, convert to base64
        const img = document.getElementsByClassName("e-captcha__image")[0].getElementsByTagName("img")[0]
        const image = new Image();
        image.src = img.src;
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const base64Image = canvas.toDataURL('image/jpeg');
        const base64String = base64Image.split(',')[1];
        const payload = { src: base64String, name: mdb_name };

        // Send payload to remote API server to get captcha solution back
        fetch('https://195.90.200.158:8080/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                console.log('Success:', data);
                let captcha = data["captcha"];
                document.getElementById("formelement-901100").value = captcha;
                setTimeout(() => {
                    document.getElementsByClassName("bt-button")[0].click();
                }, 2000);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        // Handle image loading errors
        image.onerror = () => {
            console.error('Error loading image');
        };
    }
}, 2000);