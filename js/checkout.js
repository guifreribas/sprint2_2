// Exercise 6
//Prevent page refresh when save data
const $form = document.getElementById("form");
function preventRefreshForm(e) {
    e.preventDefault();
    validate();
}
if ($form) $form.addEventListener("submit", preventRefreshForm);

function validate() {
    //Get fields
    const fName = document.getElementById("fName");
    const fEmail = document.getElementById("fEmail");
    const fAddress = document.getElementById("fAddress");
    const fLastN = document.getElementById("fLastN");
    const fPassword = document.getElementById("fPassword");
    const fPhone = document.getElementById("fPhone");
    const fields = [fName, fEmail, fAddress, fLastN, fPassword, fPhone];

    const errors = formValidations(fields);
    errors.length > 0 ? addListenerToErrorInputs(errors) : alert("Saved Data!");
}

function formValidations(fields) {
    const errors = [];

    for (const field of fields) {
        const fieldValue = field.value;
        const fieldId = field.id;
        if (!fieldValue || fieldValue.length < 3) {
            printError(field);
            errors.push(field);
            continue;
        }
        if (fieldId === "fName" || fieldId === "fLastN") {
            const isValidField = lettersFieldValidation(fieldValue);
            !isValidField && errors.push(field);
            handleValidation(field, isValidField);
        }
        if (fieldId === "fPhone") {
            const isValidField = numbersFieldValidation(field.value);
            !isValidField && errors.push(field);
            handleValidation(field, isValidField);
        }
        if (fieldId === "fPassword") {
            const isValidField = numbersAndLettersFieldValidation(field.value);
            !isValidField && errors.push(field);
            handleValidation(field, isValidField);
        }
        if (fieldId === fEmail) {
            const isValidField = emailFieldValidation(field.value);
            !isValidField && errors.push(field);
            handleValidation(field, isValidField);
        }
    }
    return errors;
}

function lettersFieldValidation(value) {
    const regexExpressionLettersWithAccent = /^[a-zA-ZàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ]+$/;
    const onlyLettersRgx = new RegExp(regexExpressionLettersWithAccent);
    return onlyLettersRgx.test(value);
}

function numbersFieldValidation(value) {
    const onlyNumbersRgx = new RegExp(/^[0-9]+$/);
    return onlyNumbersRgx.test(value);
}

function numbersAndLettersFieldValidation(value) {
    const numberAndLetters = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/);
    return value.match(numberAndLetters);
}

function emailFieldValidation(value) {
    const emailRgx = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    return value.match(emailRgx);
}

function printError(field) {
    field.classList.add("is-invalid");
}

function deleteErrorClass(field) {
    field.classList.remove("is-invalid");
}

function handleValidation(field, isValid) {
    isValid ? deleteErrorClass(field) : printError(field);
}

function addListenerToErrorInputs(errors) {
    //Add listener
    errors.forEach((value) => {
        value.addEventListener("input", () => {
            value.classList.remove("is-invalid");
        });
    });
}
