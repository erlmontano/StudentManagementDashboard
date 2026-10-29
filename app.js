import { getStudentsAPI, addStudentsAPI } from './api.js';

let localStudent = getStudentsAPI();
const studentForm = document.querySelector('#studentForm');
const studentTableBody = document.querySelector('#studentTableBody');

const renderTable = (dataArray) => {
  studentTableBody.innerHTML = '';

  if (!dataArray || dataArray.length === 0) { //check if dataArray has elements
    studentTableBody.innerHTML = `
      <tr>
        <td colspan="4" style="text-align: center;">No student records found.</td>
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

const formFeedback = document.getElementById('formFeedback');

const showFeedback = (message, type) => {
  formFeedback.textContent = message;
  formFeedback.className = 'form-feedback show ' + type;
};

const resetFeedback = () => {
  formFeedback.className = 'form-feedback';
  formFeedback.textContent = '';
};

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstNameInput = document.querySelector('#firstName');
  const lastNameInput = document.querySelector('#lastName');
  const emailInput = document.querySelector('#email');

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();

  if (!firstName || !lastName || !email) {
    showFeedback('Please fill out all input fields.', 'error');
    return;
  }

  if (!EMAIL_REGEX.test(email)) {
    showFeedback('Please enter a valid email address (must include @ and a domain like .com).', 'error');
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
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateSpan = document.getElementById('currentDate');
  if (dateSpan) dateSpan.textContent = new Date().toLocaleDateString('en-US', options);
};

initApp();