import { INITIAL_COURSES, INITIAL_UNITS, INITIAL_QUIZZES, INITIAL_ASSIGNMENTS, INITIAL_STUDENTS, INITIAL_QUESTIONS, INITIAL_DISCUSSIONS, INITIAL_ACTIVITIES, INITIAL_ACHIEVEMENTS, INITIAL_NOTES, INITIAL_REVIEWS } from '../data/mockData';
// Helper for persistent local storage mock service
const STORAGE_PREFIX = 'om_lms_v6_';
const getStored = (key, initial) => {
    try {
        const item = localStorage.getItem(`${STORAGE_PREFIX}${key}`);
        return item ? JSON.parse(item) : initial;
    }
    catch {
        return initial;
    }
};
const setStored = (key, value) => {
    try {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    }
    catch (err) {
        console.error('Storage save error:', err);
    }
};
export const lmsService = {
    // Courses
    getCourses: () => getStored('courses', INITIAL_COURSES),
    getCourseById: (id) => {
        return lmsService.getCourses().find(c => c.id === id);
    },
    addCourse: (courseData) => {
        const courses = lmsService.getCourses();
        const newCourse = {
            ...courseData,
            id: `course-${Date.now()}`,
            studentsCount: 0,
            completedCount: 0,
            rating: 5.0,
            reviewsCount: 0
        };
        const updated = [newCourse, ...courses];
        setStored('courses', updated);
        return newCourse;
    },
    updateCourse: (id, updates) => {
        const courses = lmsService.getCourses();
        const index = courses.findIndex(c => c.id === id);
        if (index === -1)
            return undefined;
        courses[index] = { ...courses[index], ...updates };
        setStored('courses', courses);
        return courses[index];
    },
    deleteCourse: (id) => {
        const courses = lmsService.getCourses();
        const filtered = courses.filter(c => c.id !== id);
        setStored('courses', filtered);
        return true;
    },
    // Units
    getUnits: () => getStored('units', INITIAL_UNITS),
    getUnitsByCourse: (courseId) => {
        return lmsService.getUnits().filter(u => u.courseId === courseId);
    },
    addUnit: (unit) => {
        const units = lmsService.getUnits();
        const newUnit = { ...unit, id: `u-${Date.now()}` };
        const updated = [...units, newUnit];
        setStored('units', updated);
        return newUnit;
    },
    // Quizzes
    getQuizzes: () => getStored('quizzes', INITIAL_QUIZZES),
    addQuiz: (quiz) => {
        const quizzes = lmsService.getQuizzes();
        const newQuiz = { ...quiz, id: `q-${Date.now()}`, attemptsCount: 0, averageScore: 0 };
        setStored('quizzes', [newQuiz, ...quizzes]);
        return newQuiz;
    },
    // Assignments
    getAssignments: () => getStored('assignments', INITIAL_ASSIGNMENTS),
    addAssignment: (assign) => {
        const items = lmsService.getAssignments();
        const newItem = { ...assign, id: `a-${Date.now()}`, totalSubmissions: 0, pendingGrading: 0 };
        setStored('assignments', [newItem, ...items]);
        return newItem;
    },
    // Students
    getStudents: () => getStored('students', INITIAL_STUDENTS),
    addStudent: (student) => {
        const students = lmsService.getStudents();
        const newStd = {
            ...student,
            id: `std-${Date.now()}`,
            joinedDate: new Date().toISOString().split('T')[0]
        };
        setStored('students', [newStd, ...students]);
        return newStd;
    },
    // Questions
    getQuestions: () => getStored('questions', INITIAL_QUESTIONS),
    addQuestion: (q) => {
        const questions = lmsService.getQuestions();
        const newQ = { ...q, id: `quest-${Date.now()}` };
        setStored('questions', [newQ, ...questions]);
        return newQ;
    },
    // Discussions
    getDiscussions: () => getStored('discussions', INITIAL_DISCUSSIONS),
    addDiscussion: (disc) => {
        const items = lmsService.getDiscussions();
        const newItem = {
            ...disc,
            id: `disc-${Date.now()}`,
            repliesCount: 0,
            createdAt: 'Just now'
        };
        setStored('discussions', [newItem, ...items]);
        return newItem;
    },
    // Activities
    getActivities: () => getStored('activities', INITIAL_ACTIVITIES),
    // Achievements
    getAchievements: () => getStored('achievements', INITIAL_ACHIEVEMENTS),
    // Notes
    getNotes: () => getStored('notes', INITIAL_NOTES),
    addNote: (note) => {
        const notes = lmsService.getNotes();
        const newNote = {
            ...note,
            id: `note-${Date.now()}`,
            createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        setStored('notes', [newNote, ...notes]);
        return newNote;
    },
    // Reviews
    getReviews: () => getStored('reviews', INITIAL_REVIEWS)
};
