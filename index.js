import { getStudentsAPI, addStudentsAPI } from './api.js';

console.log('Initial DB:', getStudentsAPI()); //test case 1: display initial populated database

const newStudent = addStudentsAPI({ //test case 2: create a new student and display returned saved object
  firstNamename: 'Light',
  lastName: 'Yagami',
  email: 'light.yagami@example.com'
});
console.log('Returned Saved Object:', newStudent);

console.log('Updated DB:', getStudentsAPI()); // test case 3: display updated database