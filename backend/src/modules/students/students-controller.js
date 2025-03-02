const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

const handleGetAllStudents = asyncHandler(async (req, res) => {
    const { query: { name = "", className = "", section = "", roll = "" } = {} } = req;
    const filters = {
        name,
        className,
        section,
        roll
    };

    const students = await getAllStudents(filters);
    res.status(200).json(students);
});

const handleAddStudent = asyncHandler(async (req, res) => {
    const { body: payload = {} } = req;
    const result = await addNewStudent(payload);
    res.status(201).json(result);
});

const handleUpdateStudent = asyncHandler(async (req, res) => {
    const { params: { id = "" } = {}, body = {} } = req;
    const payload = {
        ...body,
        id
    };
    
    const result = await updateStudent(payload);
    res.status(200).json(result);
});

const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const { params: { id = "" } = {} } = req;
    const student = await getStudentDetail(id);
    res.status(200).json(student);
});

const handleStudentStatus = asyncHandler(async (req, res) => {
    const { params: { id: userId = "" } = {}, body: { status = "" } = {}, user: { id: reviewerId = "" } = {} } = req;
    const payload = {
        userId,
        reviewerId,
        status
    };

    const result = await setStudentStatus(payload);
    res.status(200).json(result);
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
