class FormObject {
    constructor(inputId, feedbackId, formatRegex, formattingFeedbackId, optional) {
        this.input = document.getElementById(inputId);
        let ref = this;
        this.input.addEventListener('input', function() {
            if(!submitAttempt) {
                ref.validate();
            } else {
                validateContactInputs();
            }
        });
        if(feedbackId !== undefined) {
            this.feedbackElement = document.getElementById(feedbackId);
        }
        if(formatRegex !== undefined) {
            this.formatRegex = formatRegex;
        }
        if(formattingFeedbackId !== undefined) {
            this.formattingFeedbackElement = document.getElementById(formattingFeedbackId);
        }
        if(optional !== undefined) {
            this.optional = optional;
        } else {
            this.optional = false;
        }
    }
    get value() {
        return this.input.value.trim();
    }

    get empty() {
        return this.value.length === 0;
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
    resetFeedback() {
        if(this.feedbackElement) {
            this.feedbackElement.style.display = "none";
        }
        if(this.formattingFeedbackElement) {
            this.formattingFeedbackElement.style.display = "none";
        }
    }

    /**
     * Validate the current value
     * @returns boolean, true if valid, false if not
     */
    validate() {
        this.resetFeedback();
        if(!this.empty) {
            if(this.formatRegex) {
                if(!this.formatRegex.test(this.value)) {
                    this.setInvalid();
                    if(this.formattingFeedbackElement) {
                        this.formattingFeedbackElement.style.display = "block";
                    }
                    return false;
                }
            }
            this.setValid();
            return true;
        } else if(!this.optional) {
          this.setInvalid();
          if(this.feedbackElement) {
              this.feedbackElement.style.display = "block";
          }
          return false;
        }
        this.setNeutral();
        this.resetFeedback();
        return true;
    }
}

const nameObject = new FormObject("contactFormNameInput", "contactFormMissingName", /^([a-z-,.' ]+)$/i, "contactFormInvalidName"),
    emailObject = new FormObject("contactFormEmailInput", undefined, /^([a-z0-9]+@[a-z0-9]+([.][a-z0-9]+)?)$/i, "contactFormInvalidEmail", true),
    phoneObject = new FormObject("contactFormPhoneInput", undefined, /^([0-9 +]+)$/i, "contactFormInvalidPhone", true),
    messageObject = new FormObject("contactFormMessageInput", "contactFormInvalidMessage"),
    contactOptionsFeedback = document.getElementById("contactFormInvalidContactOptions");

function validateContactInputs() {
    let valid = true;

    const nameValidated = nameObject.validate(),
        messageValidated = messageObject.validate(),
        emailValidated = emailObject.validate(),
        phoneValidated = phoneObject.validate();

    if(!nameValidated || !messageValidated || !emailValidated || !phoneValidated) {
        valid = false;
    }

    if(emailObject.empty && phoneObject.empty) {
        emailObject.setInvalid();
        phoneObject.setInvalid();
        contactOptionsFeedback.style.display = "block";
        valid = false;
    } else {
        contactOptionsFeedback.style.display = "none";
    }

    return valid;
}

const form = document.getElementById("contactForm");
let submitAttempt = false;
window.addEventListener('load', function() {
    // Prevent submission
    form.addEventListener('submit', function(event) {
        submitAttempt = true;
        const validationSuccessful = validateContactInputs();

        if (!form.checkValidity() || !validationSuccessful) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            form.classList.add('was-validated');
        }
    }, false);
}, false);
