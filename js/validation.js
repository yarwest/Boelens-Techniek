const emailInput = document.getElementById("contactFormEmailInput"),
    phoneInput = document.getElementById("contactFormPhoneInput"),
    nameInput = document.getElementById("contactFormNameInput"),
    messageInput = document.getElementById("contactFormMessageInput"),
    validationHelper = document.getElementById("contactFormValidationHelper"),
    form = document.getElementById("contactForm");

function validateContactNewInput() {
    let valid = true;
    const nameValue = nameInput.value.trim(),
        messageValue = messageInput.value.trim(),
        emailValue = emailInput.value.trim(),
        phoneValue = phoneInput.value.trim();
    if(nameValue.length === 0) {
        console.log("no name");
        nameInput.classList.add("is-invalid");
        valid = false;
    } else {
        if(!/^([a-z-,.']+)$/i.test(nameValue)) {
            console.log("name invalid");
            nameInput.classList.add("is-invalid");
            valid = false;
        } else {
            nameInput.classList.remove("is-invalid");
            nameInput.classList.add("is-valid");
        }
    }
    if(messageValue.length === 0) {
        console.log("no message");
        messageInput.classList.add("is-invalid");
        valid = false;
    } else {
        messageInput.classList.remove("is-invalid");
        messageInput.classList.add("is-valid");
    }
    if(emailValue.length === 0 && phoneValue.length === 0) {
        console.log("email or phone not present");
        emailInput.classList.add("is-invalid");
        phoneInput.classList.add("is-invalid");
        validationHelper.classList.add("is-invalid");
        valid = false;
    } else {
        validationHelper.classList.remove("is-invalid");
        if(emailValue.length > 0) {
            if(!/^([a-z0-9]+@[a-z0-9]+([.][a-z0-9]+)?)$/i.test(emailValue)) {
                console.log("email invalid");
                emailInput.classList.add("is-invalid");
                valid = false;
            } else {
                emailInput.classList.remove("is-invalid");
                emailInput.classList.add("is-valid");
            }
        }
        if(phoneValue.length > 0) {
            if(!/^([0-9 +]+)$/i.test(phoneValue)) {
                console.log("phone invalid");
                phoneInput.classList.add("is-invalid");
                valid = false;
            } else {
                phoneInput.classList.remove("is-invalid");
                phoneInput.classList.add("is-valid");
            }
        }
    }

    if(valid) {
        setAllInputValid();
    }
    return valid;
}

function setAllInputValid() {
    nameInput.classList.remove("is-invalid");
    nameInput.classList.add("is-valid");
    messageInput.classList.remove("is-invalid");
    messageInput.classList.add("is-valid");
    emailInput.classList.remove("is-invalid");
    emailInput.classList.add("is-valid");
    phoneInput.classList.remove("is-invalid");
    phoneInput.classList.add("is-valid");
    validationHelper.classList.remove("is-invalid");
}

emailInput.addEventListener('input', function() {
    //validateContactNewInput();
});
phoneInput.addEventListener('input', function() {
    //validateContactNewInput();
});

window.addEventListener('load', function() {
    // Prevent submission
    form.addEventListener('submit', function(event) {
        const validationSuccessful = validateContactNewInput();

        if (!form.checkValidity() || !validationSuccessful) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
}, false);
