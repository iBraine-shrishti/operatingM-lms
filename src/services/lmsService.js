import { INITIAL_COURSES, COURSE_THUMBNAILS, INITIAL_UNITS, INITIAL_QUIZZES, INITIAL_ASSIGNMENTS, INITIAL_STUDENTS, INITIAL_QUESTIONS, INITIAL_DISCUSSIONS, INITIAL_ACTIVITIES, INITIAL_ACHIEVEMENTS, INITIAL_NOTES, INITIAL_REVIEWS } from '../data/mockData';
// Helper for persistent local storage mock service
const STORAGE_PREFIX = 'om_lms_v10_';
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
    // Courses (Total 7 active courses)
    getCourses: () => {
        const stored = getStored('courses', INITIAL_COURSES);
        return stored
            .filter(c => c.id !== 'course-2' && !c.title.toLowerCase().includes('counseling'))
            .map(course => {
                if (COURSE_THUMBNAILS && COURSE_THUMBNAILS[course.id] && (!course.thumbnail || course.thumbnail.includes('unsplash.com'))) {
                    return { ...course, thumbnail: COURSE_THUMBNAILS[course.id] };
                }
                return course;
            });
    },
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
    getUnits: () => {
        const stored = getStored('units', INITIAL_UNITS);
        return stored.filter(u => u.courseId !== 'course-2');
    },
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
    getQuizzes: () => {
        const stored = getStored('quizzes', INITIAL_QUIZZES);
        let filtered = (stored || []).filter(q => q.courseId !== 'course-2');
        if (!filtered || filtered.length === 0 || !filtered[0].category) {
            setStored('quizzes', INITIAL_QUIZZES);
            return INITIAL_QUIZZES;
        }
        if (!filtered.some(q => q.id === 'q-1')) {
            filtered = [INITIAL_QUIZZES[0], ...filtered];
            setStored('quizzes', filtered);
        }
        return filtered;
    },
    addQuiz: (quiz) => {
        const quizzes = lmsService.getQuizzes();
        const newQuiz = { 
            ...quiz, 
            id: `q-${Date.now()}`, 
            attemptsCount: 0, 
            averageScore: 0,
            studentStatus: 'pending',
            studentScore: null,
            completedDate: null,
            timeSpent: null,
            deadline: 'Available Anytime',
            status: 'active'
        };
        setStored('quizzes', [newQuiz, ...quizzes]);
        return newQuiz;
    },
    submitQuizAttempt: (quizId, score = 90) => {
        const quizzes = lmsService.getQuizzes();
        const index = quizzes.findIndex(q => q.id === quizId);
        if (index === -1) return undefined;
        quizzes[index] = {
            ...quizzes[index],
            studentStatus: 'passed',
            studentScore: score,
            completedDate: new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' }),
            timeSpent: `${Math.max(8, (quizzes[index].durationMinutes || 20) - 5)} mins`,
            attemptsCount: (quizzes[index].attemptsCount || 0) + 1
        };
        setStored('quizzes', quizzes);
        return quizzes[index];
    },
    getQuizById: (quizId) => {
        const quizzes = lmsService.getQuizzes();
        return quizzes.find(q => q.id === quizId);
    },
    updateQuiz: (quizId, updatedData) => {
        const quizzes = lmsService.getQuizzes();
        const index = quizzes.findIndex(q => q.id === quizId);
        if (index === -1) return undefined;
        quizzes[index] = {
            ...quizzes[index],
            ...updatedData,
            id: quizId
        };
        setStored('quizzes', quizzes);
        return quizzes[index];
    },
    deleteQuiz: (quizId) => {
        const quizzes = lmsService.getQuizzes();
        const filtered = quizzes.filter(q => q.id !== quizId);
        setStored('quizzes', filtered);
        return true;
    },
    // Assignments
    getAssignments: () => {
        const stored = getStored('assignments', INITIAL_ASSIGNMENTS);
        const filtered = (stored || []).filter(a => a.courseId !== 'course-2');
        if (!filtered || filtered.length < 18 || !filtered.some(a => a.status)) {
            setStored('assignments', INITIAL_ASSIGNMENTS);
            return INITIAL_ASSIGNMENTS;
        }
        return filtered.map(a => ({
            ...a,
            status: a.status || 'pending'
        }));
    },
    submitAssignment: (id, submission = {}) => {
        const items = lmsService.getAssignments();
        const index = items.findIndex(a => a.id === id);
        if (index === -1) return undefined;
        items[index] = {
            ...items[index],
            status: 'submitted',
            submittedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            ...submission
        };
        setStored('assignments', items);
        return items[index];
    },
    getAssignmentById: (id) => {
        const items = lmsService.getAssignments();
        return items.find(a => a.id === id);
    },
    addAssignment: (assign) => {
        const items = lmsService.getAssignments();
        const newItem = { 
            ...assign, 
            id: `a-${Date.now()}`, 
            totalSubmissions: 0, 
            pendingGrading: 0, 
            status: assign.status || 'pending',
            attachments: assign.attachments || [],
            allowAnyFormat: assign.allowAnyFormat !== undefined ? assign.allowAnyFormat : true,
            allowedFormats: assign.allowedFormats || ['ANY', 'PDF', 'DOC', 'DOCX', 'PPT', 'PPTX', 'ZIP', 'MP4', 'FIGMA', 'PNG', 'XLSX'],
            rubric: assign.rubric || [
                { id: 1, title: 'Strategic Approach & Planning', maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.3) },
                { id: 2, title: 'Execution Quality & Practical Output', maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.4) },
                { id: 3, title: 'Analysis, Data & Documentation', maxPoints: Math.round((Number(assign.maxScore) || 100) * 0.3) }
            ]
        };
        setStored('assignments', [newItem, ...items]);
        return newItem;
    },
    updateAssignment: (id, updates) => {
        const items = lmsService.getAssignments();
        const index = items.findIndex(a => a.id === id);
        if (index === -1) return undefined;
        items[index] = { 
            ...items[index], 
            ...updates, 
            id 
        };
        setStored('assignments', items);
        return items[index];
    },
    deleteAssignment: (id) => {
        const items = lmsService.getAssignments();
        const filtered = items.filter(a => a.id !== id);
        setStored('assignments', filtered);
        return true;
    },
    // Students
    getStudents: () => {
        const stored = getStored('students', INITIAL_STUDENTS);
        if (!stored || stored.length === 0 || !stored[0].courseId) {
            setStored('students', INITIAL_STUDENTS);
            return INITIAL_STUDENTS;
        }
        return stored;
    },
    getStudentsByCourse: (courseId) => {
        const students = lmsService.getStudents();
        if (!courseId || courseId === 'all') return students;
        return students.filter(s => s.courseId === courseId);
    },
    updateStudent: (id, updates) => {
        const students = lmsService.getStudents();
        const index = students.findIndex(s => s.id === id);
        if (index === -1) return undefined;
        students[index] = { ...students[index], ...updates };
        setStored('students', students);
        return students[index];
    },
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
    getDiscussions: () => {
        const stored = getStored('discussions', INITIAL_DISCUSSIONS);
        const disc1 = stored?.find(d => d.id === 'disc-1');
        const disc1HasDeepNesting = disc1?.replies?.[0]?.replies?.[0]?.replies?.[0]?.replies;
        if (!stored || !disc1HasDeepNesting) {
            setStored('discussions', INITIAL_DISCUSSIONS);
            return INITIAL_DISCUSSIONS;
        }
        return stored;
    },
    addDiscussion: (disc) => {
        const items = lmsService.getDiscussions();
        const newItem = {
            ...disc,
            id: `disc-${Date.now()}`,
            repliesCount: 0,
            replies: [],
            createdAt: 'Just now'
        };
        setStored('discussions', [newItem, ...items]);
        return newItem;
    },
    addDiscussionReply: (discussionId, reply, parentReplyId = null) => {
        const items = lmsService.getDiscussions();
        const index = items.findIndex(d => d.id === discussionId);
        if (index === -1) return undefined;
        const newReply = {
            ...reply,
            id: `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
            createdAt: 'Just now',
            replies: []
        };

        if (!parentReplyId) {
            const currentReplies = items[index].replies || [];
            items[index].replies = [...currentReplies, newReply];
        } else {
            const insertIntoParent = (list) => {
                for (let i = 0; i < list.length; i++) {
                    if (list[i].id === parentReplyId) {
                        list[i].replies = [...(list[i].replies || []), newReply];
                        return true;
                    }
                    if (list[i].replies && list[i].replies.length > 0) {
                        const found = insertIntoParent(list[i].replies);
                        if (found) return true;
                    }
                }
                return false;
            };

            const currentReplies = items[index].replies || [];
            const inserted = insertIntoParent(currentReplies);
            if (!inserted) {
                items[index].replies = [...currentReplies, newReply];
            }
        }

        const countReplies = (list = []) => {
            let count = 0;
            for (const r of list) {
                count += 1;
                if (r.replies && r.replies.length > 0) {
                    count += countReplies(r.replies);
                }
            }
            return count;
        };

        items[index].repliesCount = countReplies(items[index].replies);
        setStored('discussions', items);
        return newReply;
    },
    // Activities
    getActivities: () => getStored('activities', INITIAL_ACTIVITIES),
    // Achievements
    getAchievements: () => getStored('achievements', INITIAL_ACHIEVEMENTS),
    // Notes
    getNotes: () => {
        const stored = getStored('notes', INITIAL_NOTES);
        if (!stored || stored.length < INITIAL_NOTES.length) {
            setStored('notes', INITIAL_NOTES);
            return INITIAL_NOTES;
        }
        return stored;
    },
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
    deleteNote: (id) => {
        const notes = lmsService.getNotes();
        const filtered = notes.filter(n => n.id !== id);
        setStored('notes', filtered);
        return filtered;
    },
    // Reviews
    getReviews: () => getStored('reviews', INITIAL_REVIEWS)
};
