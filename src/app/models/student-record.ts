export interface StudentRecord {
    studentName: string;
    studentID: string;
    schoolName: string;
    status: 'PENDING' | 'APPROVED' | 'REJECTED'; // Assuming possible statuses
    computed: boolean;
    classLevel: 'UNDERGRADUATE' | 'GRADUATE'; // Assuming possible levels
    semester: 'SPRING' | 'SUMMER' | 'FALL' | 'WINTER'; // Assuming possible semesters
    grades: Record<string, string>; // Subject-wise letter grades
    result: Record<string, number>; // Subject-wise numerical scores
    dueDate: string; // ISO 8601 format would be preferable
    studentMgp: number; // Grade Point
  }
  