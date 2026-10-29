export function getStudentsAPI() { //access student db
  return mockStudentDb;
}

export function addStudentsAPI(newStudentData) {
  const savedStudent = {
     id: Date.now(), ...newStudentData, //gives students id
  };

  mockStudentDb.push(savedStudent);
  return savedStudent; //add the new student db
}
let mockStudentDb = [];


