function updateSliderValue(value) {
    document.getElementById("slider-value").textContent = value;
}

function generatePassword() {
    var passwordContainer = document.getElementById("password-container");
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

    // Show loading effect
    passwordSpan.textContent = "Generating...";
    var newPassword = '';
    var interval = setInterval(function() {
        for (var i = 0; i < passwordLength; i++) {
            newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        passwordSpan.textContent = newPassword;
        newPassword = '';
    }, 50);

    // Simulate generation delay (adjust as needed)
    setTimeout(function() {
        clearInterval(interval);
    }, 1000); // 2 seconds (adjust as needed)
}
