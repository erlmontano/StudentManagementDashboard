import { getStudentsAPI, addStudentsAPI } from './api.js';

console.log('Initial DB:', getStudentsAPI()); // Test Case 1: Display initial populated database

const newStudent = addStudentsAPI({ // Test Case 2: Create a new student and display returned saved object
  firstNamename: 'Light',
  lastName: 'Yagami',
  email: 'light.yagami@example.com'
});
console.log('Returned Saved Object:', newStudent);

console.log('Updated DB State:', getStudentsAPI()); // Test Case 3: Display updated database