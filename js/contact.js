var contactMethodsContainer = document.getElementById("contactMethodsContainer");
selectInput("email");

function selectInput(method) {
    switch (method) {
        case "email":
            contactMethodsContainer.innerHTML = "";
            contactMethodsContainer.appendChild(createEmailInput());
            contactMethodsContainer.appendChild(document.createElement("br"));
            break;
        case "phone":
            contactMethodsContainer.innerHTML = "";
            contactMethodsContainer.appendChild(createPhoneInput());
            contactMethodsContainer.appendChild(document.createElement("br"));
            break;
        default:
            contactMethodsContainer.innerHTML = "";
            contactMethodsContainer.appendChild(createEmailInput());
            contactMethodsContainer.appendChild(document.createElement("br"));
            contactMethodsContainer.appendChild(createPhoneInput());
            contactMethodsContainer.appendChild(document.createElement("br"));
            break;
    }
}

function createEmailInput() {
    var inputElement = document.createElement("input");
    inputElement.name = "email";
    inputElement.type = "email";
    inputElement.placeholder = "E-mailadres";
    inputElement.classList.add("form-control");
    return inputElement;
}

function createPhoneInput() {
    var inputElement = document.createElement("input");
    inputElement.name = "phone";
    inputElement.type = "tel";
    inputElement.placeholder = "Telefoon";
    inputElement.classList.add("form-control");
    return inputElement;
}
