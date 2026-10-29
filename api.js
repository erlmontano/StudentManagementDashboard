export function getStudentsAPI() { //access student db
  return mockStudentDb;
}

export function addStudentsAPI(newStudentData) {
  const savedStudent = {
    id: Date.now(), ...newStudentData,
  };

  mockStudentDb.push(savedStudent);
  return savedStudent; //return the newly created student object
}

let mockStudentDb = [
  {
    id: Date.now(), //prepoluted data of students' information
    firstName: "Leslie",
    lastName: "Andrews",
    email: "leslie.andrews@example.com",
  },
  {
    id: Date.now(), //prepoluted data of students' information
    firstName: "Emma",
    lastName: "Baumgarten",
    email: "emma.baumgarten@example.com",
  },
];


