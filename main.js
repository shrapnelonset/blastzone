function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}

// Check if the device is a desktop or not
function isDesktop() {
    // Use a media query to detect if the device is a desktop
    return window.matchMedia("(hover: hover)").matches;
}

// Add hover class for desktop devices
function addHoverClass() {
    if (isDesktop()) {
        document.getElementById("generate-button").classList.add("hover-effect");
    }
}

function generatePassword() {
    var passwordSpan = document.getElementById("generated-password");
    var passwordLength = document.getElementById("length").value;
    var useLetters = document.getElementById("letters").checked;
    var useNumbers = document.getElementById("numbers").checked;
    var useSymbols = document.getElementById("symbols").checked;

    // Define character sets based on checkbox states
    var characters = '';
    if (useLetters) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (useNumbers) characters += '0123456789';
    if (useSymbols) characters += '!@#$%^&*()-_=+';

    // Generate random password
    var newPassword = '';
    for (var i = 0; i < passwordLength; i++) {
        newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Display the random password
    passwordSpan.textContent = newPassword;

    // Apply the rustling effect
    var theLetters = "abcdefghijklmnopqrstuvwxyz#%&^+=-"; // Customize the letters to cycle through
    var ctnt = newPassword;
    var speed = 50; // ms per frame
    var increment = 4; // frames per step. Must be >2
    var clen = ctnt.length;
    var si = 0;
    var stri = 0;
    var block = "";
    var fixed = "";
    // Call self x times, whole function wrapped in setTimeout
    (function rustle(i) {
        setTimeout(function() {
            if (--i) {
                rustle(i);
            }
            nextFrame(i);
            si = si + 1;
        }, speed);
    })(clen * increment + 1);
    
    function nextFrame(pos) {
        for (var i = 0; i < clen - stri; i++) {
            // Random number
            var num = Math.floor(theLetters.length * Math.random());
            // Get random letter
            var letter = theLetters.charAt(num);
            block = block + letter;
        }
        if (si == (increment - 1)) {
            stri++;
        }
        if (si == increment) {
            // Add a letter every speed*10 ms
            fixed = fixed + ctnt.charAt(stri - 1);
            si = 0;
        }
        passwordSpan.innerHTML = fixed + block;
        block = "";
    }
}

function copyPassword() {
    var generatedPassword = document.getElementById("generated-password").textContent;
    var copyButton = document.getElementById("copy-password-button");

    // Create a temporary input element
    var tempInput = document.createElement("textarea");
    tempInput.value = generatedPassword;
    document.body.appendChild(tempInput);

    // Select the text inside the input element
    tempInput.select();
    tempInput.setSelectionRange(0, 99999); /* For mobile devices */

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary input element
    document.body.removeChild(tempInput);

    // Change button text to "Copied!"
    copyButton.textContent = "Copied!";
  
    // Add a class to the button to trigger the animation
    copyButton.classList.add("copied");

    // After a delay, revert the button text and remove the animation class
    setTimeout(function() {
        copyButton.textContent = "Copy Password";
        copyButton.classList.remove("copied");
    }, 650); // Change the delay (in milliseconds) as needed
}
