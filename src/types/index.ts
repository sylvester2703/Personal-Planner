export type SubjectCode = 'ML' | 'DMV' | 'BIF' | 'IR' | 'GENERAL' | 'PRACTICAL';
export type PriorityLevel = 'P1' | 'P2' | 'APPLICATION' | 'ROUTINE';
export type PhaseType = 'FOUNDATION' | 'MOCKS' | 'SUBMISSIONS' | 'PRACTICALS' | 'INTENSIVE' | 'EXAM_BUFFER';
export type DayType = 'INTERNSHIP' | 'PRACTICAL_COLLEGE' | 'SATURDAY' | 'SUNDAY' | 'EXAM_DAY';
export type ThemeMode = 'dark' | 'light';

export interface SubTask {
  id: string;
  subjectCode: SubjectCode;
  unit: 3 | 4 | 5 | 6 | null;
  timeSlot: string; // e.g. "2:00 PM – 4:30 PM"
  plannedHours: number;
  title: string;
  description: string;
  isCompleted: boolean;
  completedAt?: string;
  isBacklog: boolean;
  originalDate: string; // YYYY-MM-DD
  currentScheduledDate: string; // YYYY-MM-DD
  priority: PriorityLevel;
}

export interface DaySchedule {
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  phase: PhaseType;
  dayType: DayType;
  targetHours: number;
  tasks: SubTask[];
  notes: string;
  isAudited: boolean;
}

export type PersonalTodoCategory = 'PRAYER' | 'COLLEGE' | 'PERSONAL' | 'HOTSPOT';

export interface HotspotHistoryEntry {
  date: string;
  consumedMB: number;
}

export interface PersonalTodo {
  id: string;
  text: string;
  category: PersonalTodoCategory;
  isDone: boolean;
  time?: string;
}

export type PersonalEventCategory = 'FITNESS' | 'INTERNSHIP' | 'PRAYER' | 'COLLEGE' | 'HABIT' | 'PERSONAL' | 'MEETING' | 'STUDY';
export type PersonalEventPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export interface PersonalEvent {
  id: string;
  title: string;
  description?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // e.g. "07:00 AM" or "14:30"
  endTime?: string;
  category: PersonalEventCategory;
  priority: PersonalEventPriority;
  isCompleted: boolean;
  location?: string;
  reminderWhatsApp?: boolean;
  reminderTimeMinutesBefore?: number;
  isRecurringDaily?: boolean;
}

export interface WhatsAppBriefingSlot {
  id: 'morning' | 'afternoon' | 'evening' | 'night';
  time: string; // "08:00", "14:00", "19:30", "23:00"
  label: string; // "8:00 AM Morning Briefing", "2:00 PM Midday Briefing", etc.
  description: string;
}

export interface WhatsAppSettings {
  phoneNumber: string; // e.g. "919876543210"
  countryCode: string; // e.g. "+91"
  autoFormatEmoji: boolean;
  enableAutoBriefings: boolean;
  autoOpenTab: boolean; // Automatically open whatsapp tab at scheduled times
  lastDispatchedSlot?: string; // e.g. "2026-10-08-morning"
  customMessagePrefix?: string;
}

export interface DrivePYQLink {
  subject: SubjectCode;
  name: string;
  courseCode: string;
  url: string;
  description: string;
  paperYears: string[];
}

export interface ExamStoreState {
  theme: ThemeMode;
  schedules: DaySchedule[];
  personalEvents: PersonalEvent[];
  whatsAppSettings: WhatsAppSettings;
  currentDate: string; // Defaults to "2026-10-08"
  selectedDate: string;
  activeStopwatch: {
    taskId: string | null;
    elapsedSeconds: number;
    isRunning: boolean;
    startedAt?: string;
  };
  personalTodos: PersonalTodo[];
  subjectFilter: SubjectCode | 'ALL';
  phaseFilter: PhaseType | 'ALL';
  activeTab: 'schedule' | 'personal_calendar' | 'pyq_drive' | 'syllabus' | 'focus' | 'analytics';
  
  // Mobile Hotspot Quota State
  dailyHotspotQuotaMB: number;
  consumedHotspotMB: number;
  hotspotHistory: HotspotHistoryEntry[];
  
  // Actions
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
  setSelectedDate: (date: string) => void;
  setActiveTab: (tab: ExamStoreState['activeTab']) => void;
  setSubjectFilter: (filter: SubjectCode | 'ALL') => void;
  setPhaseFilter: (filter: PhaseType | 'ALL') => void;
  toggleTask: (taskId: string) => void;
  auditAndRolloverDay: (date: string) => void;
  autoRedistributeBacklog: () => void;
  rescheduleTask: (taskId: string, targetDate: string) => void;
  addTask: (date: string, task: Omit<SubTask, 'id' | 'isCompleted' | 'isBacklog' | 'originalDate' | 'currentScheduledDate'>) => void;
  deleteTask: (taskId: string) => void;
  
  // Personal Events Actions
  addPersonalEvent: (event: Omit<PersonalEvent, 'id'>) => void;
  updatePersonalEvent: (id: string, updates: Partial<PersonalEvent>) => void;
  deletePersonalEvent: (id: string) => void;
  togglePersonalEvent: (id: string) => void;
  
  // WhatsApp Settings & Actions
  updateWhatsAppSettings: (settings: Partial<WhatsAppSettings>) => void;
  getWhatsAppTaskLink: (taskId: string, customPhone?: string) => string;
  getWhatsAppEventLink: (eventId: string, customPhone?: string) => string;
  getWhatsAppDailyDigestLink: (date: string, customPhone?: string, slotLabel?: string) => string;
  markBriefingDispatched: (slotKey: string) => void;
  
  // Life & Routine Actions
  addPersonalTodo: (text: string, category: PersonalTodoCategory, time?: string) => void;
  togglePersonalTodo: (id: string) => void;
  deletePersonalTodo: (id: string) => void;

  // Hotspot Quota Actions
  updateHotspotUsage: (deltaMB: number) => void;
  resetDailyHotspot: () => void;
  
  // Stopwatch Actions
  startStopwatch: (taskId?: string) => void;
  pauseStopwatch: () => void;
  resetStopwatch: () => void;
  tickStopwatch: () => void;
  
  // State Reset
  resetToDefaults: () => void;
}

export interface SyllabusUnit {
  unitNumber: 3 | 4 | 5 | 6;
  title: string;
  weightageMarks: number;
  overview: string;
  keyTopics: string[];
  coreDerivations: {
    title: string;
    description: string;
    latexEquation: string;
  }[];
  modelQuestions: {
    id: string;
    year: string;
    marks: number;
    bloomsLevel: 'Remember' | 'Understand' | 'Apply' | 'Analyze' | 'Evaluate';
    questionText: string;
    modelAnswerMarkdown: string;
    keyPoints: string[];
  }[];
}

export interface SubjectSyllabus {
  code: SubjectCode;
  name: string;
  courseCode: string;
  credits: number;
  description: string;
  units: SyllabusUnit[];
}

