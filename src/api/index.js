import axios from 'axios'

const local = ''
const heroku = ''

const API = axios.create({ baseURL: local})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

export const fetchTeachers = () => API.get('/teachers');
export const createTeacher = (newTeacher) => API.post('/teachers', newTeacher)
export const updateTeacher = (id, updatedTeacher) => API.patch(`/teachers/${id}`, updatedTeacher)
export const deleteTeacher = (id) => API.delete(`/teachers/${id}`)

export const signIn = (formData) => API.post('/users/signin', formData)
export const updateCredentials = (update) => API.post('/users/update', update)
export const checkPassword = (formData) => API.post('/users/checkPassword', formData)

export const fetchAdmins = () => API.get('/admins');
export const createAdmins = (newAdmin) => API.post('/admins', newAdmin)
export const updateAdmin = (id, updatedAdmin) => API.patch(`/admins/${id}`, updatedAdmin)
export const deleteAdmin = (id) => API.delete(`/admins/${id}`)

export const fetchStudents = () => API.get('/students');
export const fetchStudentsByTeacher = (teacherId) => API.get(`/students/by?teacher=${teacherId}`);
export const createStudent = (newAdmin) => API.post('/students', newAdmin)
export const updateStudent = (id, updatedAdmin) => API.patch(`/students/${id}`, updatedAdmin)
export const deleteStudent = (id) => API.delete(`/students/${id}`)

export const fetchClasses = () => API.get(`/classes`);
export const fetchClassesBySearch = (url) => API.get(`/classes/${url}`);
export const createClass = (newClass) => API.post('/classes', newClass)
export const updateClass = (id, updatedClass) => API.patch(`/classes/${id}`, updatedClass)
export const deleteClass = (id) => API.delete(`/classes/${id}`)

export const fetchSessions = () => API.get(`/sessions`);
export const fetchSessionsByPage = (page, id) => API.get(`/sessions/pages?page=${page}&acc=${id}`);
export const fetchSessionsBySearch = (url) => API.get(`/sessions/${url}`)
export const fetchSessionsForCalendar = (url) => API.get(`/sessions/calendar?${url}`)
export const updateSession = (id, updatedSession) => API.patch(`/sessions/${id}`, updatedSession)

export const fetchGrades = () => API.get(`/grades`);
export const fetchGradesByStudent = (studentId) => API.get(`/grades/${studentId}`);
export const createGrades = (newGrade) => API.post('/grades', newGrade)
export const updateGrades = (id, updatedGrades) => API.patch(`/grades/${id}`, updatedGrades)
export const deleteGrades = (id) => API.delete(`/grades/${id}`)

export const fetchHomework = () => API.get(`/homework`);
export const fetchHomeworkByStudent = (studentId) => API.get(`/homework/${studentId}`);
export const createHomework = (newHomework) => API.post('/homework', newHomework)
export const updateHomework = (id, updatedHomework) => API.patch(`/homework/${id}`, updatedHomework)
export const deleteHomework = (id) => API.delete(`/homework/${id}`)

export const fetchPayrollBySearch = (url) => API.get(`/payroll/${url}`)

export const fetchFinancialsByDate = (url) => API.get(`/financials/${url}`)
export const fetchAdminTodayOverview = (url) => API.get(`/financials/${url}`)
export const fetchTeacherTodayOverview = (url) => API.get(`/financials/${url}`)




