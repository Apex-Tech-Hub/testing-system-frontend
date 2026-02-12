// data.ts
import { Clock, Search, Briefcase, FileText, Calendar, CheckCircle, Trophy } from "lucide-react";

export const userData = {
  name: 'Muhammad Ahmed Khan',
  email: 'ahmed.khan@example.com',
  cnic: '54201-1234567-8',
  city: 'Quetta',
  phone: '0333-1234567',
  registrationDate: '15 Jan 2026',
};

type StatVariant = "emerald" | "blue" | "orange" | "purple";

interface StatItem {
  label: string;
  value: number | string;
  icon: any; // Or LucideIcon
  variant: StatVariant; // This is the magic fix
}

export const onlineTestData = {
  id: "test_772",
  title: "General Knowledge & IQ Assessment",
  department: "Services & General Administration",
  durationMinutes: 45,
  totalQuestions: 50,
  passingPercentage: 50,
  deadline: "Feb 28, 2026",
  instructions: [
    "One attempt only. The test cannot be paused.",
    "Browser window must not be closed.",
    "Camera must be on during the session.",
    "Do not refresh the page during the test."
  ]
};

// 2. Apply the type to your export
export const statsData: StatItem[] = [
  {
    label: "Available Jobs",
    value: 42,
    icon: Briefcase,
    variant: "emerald", // TS now knows this is a valid StatVariant
  },
  {
    label: "Applied Jobs",
    value: 12,
    icon: FileText,
    variant: "blue",
  },
  {
    label: "Tests Scheduled",
    value: 2,
    icon: Calendar,
    variant: "orange",
  },
  {
    label: "Tests Passed",
    value: 5,
    icon: CheckCircle,
    variant: "purple",
  },
];

export const recentActivities = [
  {
    id: 1,
    title: "Job Application Submitted",
    description: "Assistant - Revenue Department",
    date: "05 Feb 2026",
    color: "blue" as const,
    icon: Search,
  },
  {
    id: 2,
    title: "Test Scheduled",
    description: "Data Entry Operator - 25 Feb 2026",
    date: "15 Jan 2026",
    color: "orange" as const,
    icon: Clock,
  },
  {
    id: 3,
    title: "Test Result Announced",
    description: "Junior Technician - Passed (85%)",
    date: "22 Dec 2025",
    color: "green" as const,
    icon: CheckCircle,
  },
];

export const availableJobs = [
  {
    id: 1,
    title: 'Junior Clerk',
    department: 'Education Department',
    location: 'Quetta',
    positions: 50,
    education: 'Bachelor',
    lastDate: '28 Feb 2026',
    salary: 'BPS-11',
    status: 'Open',
  },
  {
    id: 2,
    title: 'Computer Operator',
    department: 'Health Department',
    location: 'Gwadar',
    positions: 25,
    education: 'Intermediate',
    lastDate: '15 Mar 2026',
    salary: 'BPS-09',
    status: 'Open',
  },
  {
    id: 3,
    title: 'Assistant Engineer',
    department: 'Public Works Department',
    location: 'Turbat',
    positions: 15,
    education: 'Bachelor in Engineering',
    lastDate: '20 Mar 2026',
    salary: 'BPS-17',
    status: 'Open',
  },
];

export const appliedJobs = [
  {
    id: 1,
    title: 'Data Entry Operator',
    department: 'Finance Department',
    appliedDate: '10 Jan 2026',
    testDate: '25 Feb 2026',
    testTime: '10:00 AM',
    venue: 'Quetta Testing Center',
    rollNumber: 'BTS-2026-001234',
    status: 'Test Scheduled',
  },
  {
    id: 2,
    title: 'Assistant',
    department: 'Revenue Department',
    appliedDate: '05 Feb 2026',
    testDate: 'TBA',
    testTime: 'TBA',
    venue: 'TBA',
    rollNumber: 'BTS-2026-005678',
    status: 'Application Submitted',
  },
];

export const testResults = [
  {
    id: 1,
    title: 'Office Assistant',
    department: 'Local Government',
    testDate: '15 Jan 2026',
    totalMarks: 100,
    obtainedMarks: 78,
    percentage: '78%',
    status: 'Passed',
    merit: 'In Merit',
  },
  {
    id: 2,
    title: 'Junior Technician',
    department: 'IT Department',
    testDate: '22 Dec 2025',
    totalMarks: 100,
    obtainedMarks: 85,
    percentage: '85%',
    status: 'Passed',
    merit: 'In Merit',
  },
];