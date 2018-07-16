class FormObject {
    constructor(input) {
        this.input = input;
    }
    get value() {
        return this.input.value.trim();
    }
    setValid() {
        this.input.classList.remove("is-invalid");
        this.input.classList.add("is-valid");
    }
    setInvalid() {
        this.input.classList.add("is-invalid");
        this.input.classList.remove("is-valid");
    }
    setNeutral() {
        this.input.classList.remove("is-invalid");
        this.input.classList.remove("is-valid");
    }
}

const validationHelper = document.getElementById("contactFormValidationHelper"),
    form = document.getElementById("contactForm");

const emailObject = new FormObject(document.getElementById("contactFormNameInput")),
    phoneObject = new FormObject(document.getElementById("contactFormPhoneInput")),
    nameObject = new FormObject(document.getElementById("contactFormNameInput")),
    messageObject = new FormObject(document.getElementById("contactFormMessageInput"));

function validateContactNewInput() {
    let valid = true;

    if(nameObject.value.length === 0) {
        console.log("no name");
        nameObject.setInvalid();
        valid = false;
    } else {
        if(!/^([a-z-,.']+)$/i.test(nameObject.value)) {
            console.log("name invalid");
            nameObject.setInvalid();
            valid = false;
        } else {
            nameObject.setValid();
        }
    }
    if(messageObject.value.length === 0) {
        console.log("no message");
        messageObject.setInvalid();
        valid = false;
    } else {
        messageObject.setValid();
    }
    if(emailObject.value.length === 0 && phoneObject.value.length === 0) {
        console.log("email or phone not present");
        emailObject.setInvalid();
        phoneObject.setInvalid();
        setInvalid(validationHelper);
        valid = false;
    } else {
        setValid(validationHelper);
        if(emailObject.value.length > 0) {
            if(!/^([a-z0-9]+@[a-z0-9]+([.][a-z0-9]+)?)$/i.test(emailObject.value)) {
                console.log("email invalid");
                emailObject.setInvalid();
                valid = false;
            } else {
                emailObject.setValid();
                if(phoneObject.value.length === 0) {
                    phoneObject.setNeutral();
                }
            }
        }
        if(phoneObject.value.length > 0) {
            if(!/^([0-9 +]+)$/i.test(phoneObject.value)) {
                console.log("phone invalid");
                phoneObject.setInvalid();
                valid = false;
            } else {
                phoneObject.setValid();
                if(emailObject.value.length === 0) {
                    emailObject.setNeutral();
                }
            }
        }
    }

    if(valid) {
        setAllInputValid();
    }
    return valid;
}

function setAllInputValid() {
    nameObject.setValid();
    messageObject.setValid();
    emailObject.setValid();
    phoneObject.setValid();
    validationHelper.classList.remove("is-invalid");
}

function setValid() {
    
}

function setInvalid() {

}

function removeValidation() {

}

//emailInput.addEventListener('input', function() {
    //validateContactNewInput();
//});
//phoneInput.addEventListener('input', function() {
    //validateContactNewInput();
//});

window.addEventListener('load', function() {
    // Prevent submission
    form.addEventListener('submit', function(event) {
        const validationSuccessful = validateContactNewInput();

        if (!form.checkValidity() || !validationSuccessful) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            form.classList.add('was-validated');
        }
    }, false);
}, false);
