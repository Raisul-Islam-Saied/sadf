const gradingSystem = {
    'A+': { gradePoint: 5.00 },
    'A': { gradePoint: 4.00 },
    'A-': { gradePoint: 3.50 },
    'B': { gradePoint: 3.25 },
    'C': { gradePoint: 2.00 },
    'D': { gradePoint: 1.00 },
    'F': { gradePoint: 0.00 }
};

const calculateTotalGrade = (gpa) => {
    if (gpa >= 5.00) return 'A+';
    else if (gpa >= 4.00) return 'A';
    else if (gpa >= 3.50) return 'A-';
    else if (gpa >= 3.25) return 'B';
    else if (gpa >= 2.00) return 'C';
    else if (gpa >= 1.00) return 'D';
    else return 'F';
};
const calculateGradeAndPoints = (marks) => {
    if (marks >= 80) return { grade: 'A+', point: 5.00 };
    else if (marks >= 70) return { grade: 'A', point: 4.00 };
    else if (marks >= 60) return { grade: 'A-', point: 3.50 };
    else if (marks >= 50) return { grade: 'B', point: 3.25 };
    else if (marks >= 40) return { grade: 'C', point: 2.00 };
    else if (marks >= 33) return { grade: 'D', point: 1.00 };
    else return { grade: 'F', point: 0.00 };
};

const calculateTotalMarks = (results) => {
    return results.reduce((total, subject) => total + Number(subject.marks), 0);
};

const calculateGPA = (subjects) => {
    const failedSubject = subjects.filter((subject) => subject.marks < 33)
    if (Object.keys(failedSubject).length > 0) {
        return 0.00
    } else {
        const totalCredits = subjects.length;
        const totalGradePoints = subjects.reduce((total, subject) => total + gradingSystem[subject.grade].gradePoint, 0);
        const gpa = totalGradePoints / totalCredits;
        return gpa
    }


};
module.exports = { gradingSystem, calculateGPA, calculateGradeAndPoints, calculateTotalMarks, calculateTotalGrade }