//Task 02

function createStudent(name, age, mark) {
  return { sname: name, sage: age, smark: mark };
}
let s1 = createStudent("x", 19, 98);
let s2 = createStudent("y", 8, 90);
let s3 = createStudent("z", 16, 50);
let s4 = createStudent("n", 18, 49);
let s5 = createStudent("m", 18, 37);
let students = [s1, s2, s3, s4, s5];
let successstudents = [];
let faildstudents = [];
for (i = 0; i < 5; i++) {
  if (students[i].smark >= 50) successstudents.push(students[i].sname);
  else faildstudents.push(students[i].sname);
}
console.log("Success Students:");
console.log(successstudents);
console.log("Failed Students:");
console.log(faildstudents);
