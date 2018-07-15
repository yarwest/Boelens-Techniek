const emailInput = document.getElementById("contactFormEmailInput"),
    phoneInput = document.getElementById("contactFormPhoneInput"),
    validationHelper = document.getElementById("contactFormValidationHelper"),
    contactFormId = "contactForm";

function validateContactNewInput(elem, submission) {
    if(emailInput.value.trim().length === 0 && phoneInput.value.trim().length === 0) {
        if(validationHelper.classList.contains("is-valid") || submission) {
            emailInput.required = true;
            phoneInput.required = true;
            validationHelper.classList.remove("is-valid");
            validationHelper.classList.add("is-invalid");
            return false;
        }
    } else {
        emailInput.required = false;
        phoneInput.required = false;
        if(validationHelper.classList.contains("is-invalid")) {
            validationHelper.classList.remove("is-invalid");
            validationHelper.classList.add("is-valid");
        }
        return true;
    }
}

emailInput.addEventListener('input', function() {
    validateContactNewInput(this, false);
});
phoneInput.addEventListener('input', function() {
    validateContactNewInput(this, false);
});

window.addEventListener('load', function() {
    // Prevent submission
    const form = document.getElementById(contactFormId);
    form.addEventListener('submit', function(event) {
        let validationSuccessful = validateContactNewInput(emailInput, true);

        if (!form.checkValidity() || !validationSuccessful) {
            event.preventDefault();
            event.stopPropagation();
        }
        form.classList.add('was-validated');
    }, false);
}, false);
