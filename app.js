import { getStudentsAPI, addStudentsAPI } from './api.js';

let localStudent = getStudentsAPI();
const studentForm = document.querySelector('#studentForm');
const studentTableBody = document.querySelector('#studentTableBody');

const renderTable = (dataArray) => {
  studentTableBody.innerHTML = '';

  if (!dataArray || dataArray.length === 0) { //check if dataArray has elements
    studentTableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center;">
        No student records found.</td>
      </tr>
    `;
    return;
  }

  dataArray.forEach((student, index) => { //traverse array
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.firstName || ''}</td>
      <td>${student.lastName || ''}</td>
      <td>${student.email || ''}</td>
    `;
    studentTableBody.appendChild(row);
  });
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const MAX_NAME_LENGTH = 50;
const MAX_EMAIL_LENGTH = 50;

const formFeedback = document.getElementById('formFeedback');

const showFeedback = (message, type) => {
  formFeedback.textContent = message;
  formFeedback.className = 'form-feedback show ' + type;
};

const resetFeedback = () => {
  formFeedback.className = 'form-feedback';
  formFeedback.textContent = '';
};

const sanitizeName = (value) => {
  // Remove HTML tags to prevent XSS
  return value.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
};

const hasSpecialChars = (value) => /[<>{}|\\^~`]/.test(value);

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstNameInput = document.querySelector('#firstName');
  const lastNameInput = document.querySelector('#lastName');
  const emailInput = document.querySelector('#email');

  const firstName = sanitizeName(firstNameInput.value);
  const lastName = sanitizeName(lastNameInput.value);
  const email = emailInput.value.trim();

  if (!firstName || !lastName || !email) {
    showFeedback('Please fill out all input fields.', 'error');
    return;
  }

  if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH){
    showFeedback(`First name and last name must be 
        ${MAX_NAME_LENGTH} characters or fewer.`, 'error');
    firstNameInput.focus();
    return;
  }

  if (hasSpecialChars(firstName) || hasSpecialChars(lastName)) {
    showFeedback(`First name and last name cannot contain special characters
        (<, >, {, }, |, ^, ~, \`).`, 'error');
    firstNameInput.focus();
    return;
  }

  if (email.length > MAX_EMAIL_LENGTH) {
    showFeedback(`Email must be ${MAX_EMAIL_LENGTH} 
        characters or fewer.`, 'error');
    emailInput.focus();
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    showFeedback(`Please enter a valid email address 
        (must include @ and a domain like .com).`, 'error');
    emailInput.focus();
    return;
  }

  const studentData = { firstName, lastName, email };

  try {
    const savedStudent = addStudentsAPI(studentData);
    renderTable(localStudent);
    resetFeedback();
    studentForm.reset();
    showFeedback('Student record added successfully!', 'success');
  } catch (err) {
    showFeedback('Failed to add student record. Please try again.', 'error');
  }
});


const initApp = () => {
  localStudent = getStudentsAPI();
  renderTable(localStudent);
  formatDate();
};

const formatDate = () => {
  const options = { weekday: 'long', year: 'numeric', month: 
    'long', day: 'numeric' };
  const dateSpan = document.getElementById('currentDate');
  if (dateSpan) dateSpan.textContent = 
  new Date().toLocaleDateString('en-US', options);
};

initApp();