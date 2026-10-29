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

studentForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const firstNameInput = document.querySelector('#firstName');
  const lastNameInput = document.querySelector('#lastName');
  const emailInput = document.querySelector('#email');

  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();

  if (!firstName || !lastName || !email) {
    alert('Please fill out all input fields!');
    return;
  }

  const studentData = { firstName, lastName, email };

  const savedStudent = addStudentsAPI(studentData); //pass data to addStudentsAPI() and push to local array

  renderTable(localStudent);

  studentForm.reset();
});

const initApp = () => {
  localStudent = getStudentsAPI();
  
  renderTable(localStudent);
};

initApp();