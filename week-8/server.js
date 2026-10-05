const express = require("express");
const app = express();
const PORT = 3000;
// Middleware
app.use(express.json());
// Student data
let students = [
{
id: 1,
name: "Rahul Sharma",
rollNo: "160124748121",
gpa: 8.21,
semester: 5,
mobileNo: "9876543210"
},
{
id: 2,
name: "Priya Reddy",
rollNo: "160124748122",
gpa: 9.12,
semester: 5,
mobileNo: "9123456780"
},
{
id: 3,
name: "Arjun Kumar",
rollNo: "160124748123",
gpa: 7.85,
semester: 3,
mobileNo: "9988776655"
},
{
id: 4,
name: "Sneha Patel",
rollNo: "160124748124",
gpa: 8.67,
semester: 3,
mobileNo: "9012345678"
},
{
id: 5,
name: "Kiran Reddy",
rollNo: "160124748125",
gpa: 8.45,
semester: 4,
mobileNo: "9345678901"
}
];
// Home route
app.get("/", (req, res) => {
res.send("Student Management REST API is running");});
// GET - All students
app.get("/api/students", (req, res) => {
res.json(students);
});
// GET - Student by Roll Number
app.get("/api/students/:rollNo", (req, res) => {
const student = students.find(
student => student.rollNo === req.params.rollNo);
if (!student) {
return res.status(404).json({
message: "Student not found"});
}
res.json(student);
});
// POST - Add new student
app.post("/api/students", (req, res) => {
const { name, rollNo, gpa, semester, mobileNo } = req.body;
if (!name || !rollNo || !gpa || !semester || !mobileNo) {
return res.status(400).json({
message: "All student details are required"});
}
const newStudent = {
id: students.length + 1,
name: name,
rollNo: rollNo,
gpa: gpa,
semester: semester,
mobileNo: mobileNo
};
students.push(newStudent);
res.status(201).json({
message: "Student added successfully",
student: newStudent
});
});
// PUT - Update student
app.put("/api/students/:rollNo", (req, res) => {
const student = students.find(
student => student.rollNo === req.params.rollNo);
if (!student) {
return res.status(404).json({
message: "Student not found"
});}
const { name, gpa, semester, mobileNo } = req.body;
student.name = name || student.name;
student.gpa = gpa || student.gpa;
student.semester = semester || student.semester;
student.mobileNo = mobileNo || student.mobileNo;
res.json({
message: "Student updated successfully",
student: student});
});
// DELETE - Delete student
app.delete("/api/students/:rollNo", (req, res) => {
const index = students.findIndex(
student => student.rollNo === req.params.rollNo
);
Laboratory Record Roll No.: _____160124748098___
of _FSD LAB__ Experiment No.: __________08________
 Sheet No.: _____________________
 Date: _______26/09/26______
if (index === -1) {
return res.status(404).json({
message: "Student not found"});
}
const deletedStudent = students.splice(index, 1);
res.json({
message: "Student deleted successfully",
student: deletedStudent[0]});
});
// PUT - Promote student to next semester
app.put("/api/students/:rollNo/promote", (req, res) => {
const student = students.find(
student => student.rollNo === req.params.rollNo);
if (!student) {
return res.status(404).json({
message: "Student not found"});}
if (student.semester >= 8) {
return res.status(400).json({
message: "Student is already in the final semester"});}
student.semester = student.semester + 1;
res.json({
message: "Student promoted successfully",
student: student });
});
// Start server
app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});