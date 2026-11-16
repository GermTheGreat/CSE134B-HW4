const form = document.querySelector('form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const commentsInput = document.querySelector('#comments');
const submitButton = document.querySelector('button[type="submit"]');
const commentsInfo = document.querySelector('#comments-info');
const fields = [nameInput, emailInput, commentsInput];
const errorArea = document.querySelector('#error-area');

const commentsLength = commentsInput.maxLength;
const commentsMinLength = commentsInput.minLength;
const warningThreshold = 50;

function updateCommentInfo() {
    const remaining = commentsLength - commentsInput.value.length;
    commentsInfo.classList.remove('warning', 'limit');

    if (remaining === 0) {
        commentsInfo.classList.add('limit');
        commentsInfo.textContent = 'Character limit reached.';
    } else if (remaining === 1){
        commentsInfo.classList.add('warning');
        commentsInfo.textContent = 'Warning: 1 character remaining.';
    } else if (remaining <= warningThreshold){
        commentsInfo.classList.add('warning');
        commentsInfo.textContent = `Warning: ${remaining} characters remaining.`;
    } else {
        commentsInfo.textContent = `Characters remaining: ${remaining}`;
    }
}

commentsInput.addEventListener('input', updateCommentInfo);
commentsInfo.hidden = false;
updateCommentInfo();

function checkField(input) {
    input.setCustomValidity('');

    let message = '';
    if (input.validity.valueMissing) {
        message = `A value is required here. Please fill in the ${input.name} field.`;
    } else if (input.validity.typeMismatch) {
        message = "Please enter a valid email address.";
    } else if (input.validity.tooShort) {
        message = `Your comment is too short. Minimum ${input.minLength} characters required, please add more.`;
    }

    if (message) input.setCustomValidity(message);
    return message;
}

for (const field of fields) {
    field.addEventListener('blur', () => {
        if (field.value !== '' || edited.has(field)) validateField(field);
    });
    field.addEventListener('input', () => {
        edited.add(field);
        if (document.getElementById(`${field.id}-error`)) validateField(field);
        else checkField(field);
    });
}

const fieldLabels = { name: 'Name', email: 'Email', comments: 'Comments' };

function showError(input, message) {
    const id = `error-${input.id}`;
    let item = document.querySelector(`#${id}`);

    if (!item) {
        item = document.createElement('p');
        item.id = id;
        item.className = 'error-item';
        errorArea.append(item);
    }
    item.textContent = `${fieldLabels[input.id]}: ${message}`;
}
function clearError(input) {
    const id = `error-${input.id}`;
    let item = document.querySelector(`#${id}`);

    if (item) item.remove();
};

function validateAndDisplay(field) {
    const message = checkField(field);
    message ? showError(field, message) : clearError(field);
    return message;
}
