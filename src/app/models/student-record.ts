export interface StudentRecord {
    studentName: string;
    studentID: string;
    schoolName: string;
    status: 'Done' | 'Ready' | 'Pending'; // Assuming possible statuses
    computed: boolean;
    classLevel: 'SRT4' | 'SRT3' | 'SRT5' | 'ISI4' | 'ISI5' | 'ISI3'; // Assuming possible levels
    semester: 'SEMESTER1' | 'SEMESTER2'; // Assuming possible semesters
    grades: Record<string, string>; // Subject-wise letter grades
    result: Record<string, number>; // Subject-wise numerical scores
    dueDate: string; // ISO 8601 format would be preferable
    studentMgp: number; // Grade Point
  }
  