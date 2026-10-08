import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  ExamStoreState,
  DaySchedule,
  SubTask,
  PersonalTodo,
  PersonalEvent,
  WhatsAppSettings,
  SubjectCode,
  PhaseType,
  ThemeMode,
} from '@/types';
import { INITIAL_SCHEDULE } from '@/data/seedSchedule';
import { INITIAL_PERSONAL_EVENTS } from '@/data/seedPersonalEvents';

const DEFAULT_PERSONAL_TODOS: PersonalTodo[] = [
  { id: 'todo-2', text: 'Morning Focus & Fajr / Mindfulness Routine', category: 'PRAYER', isDone: true, time: '06:00 AM' },
  { id: 'todo-3', text: 'Midday Dhuhr Prayer & 15-min Power Nap', category: 'PRAYER', isDone: false, time: '01:15 PM' },
  { id: 'todo-4', text: 'Asr Prayer & Evening Cognitive Refresh Walk', category: 'PRAYER', isDone: false, time: '05:00 PM' },
  { id: 'todo-5', text: 'Maghrib Prayer & Dinner Break', category: 'PRAYER', isDone: false, time: '06:45 PM' },
  { id: 'todo-6', text: 'Isha Prayer & Deep Night Work Setup', category: 'PRAYER', isDone: false, time: '08:30 PM' },
  { id: 'todo-7', text: 'Collect HOD Sign on ML Lab Assignment 6 & 7 Index', category: 'COLLEGE', isDone: false, time: '11:00 AM' },
  { id: 'todo-8', text: 'Take Xerox Printout of DMV Covid & Airbnb Graphs', category: 'COLLEGE', isDone: false, time: '04:00 PM' },
  { id: 'todo-9', text: 'Verify BE Project Phase-1 Guide Review Date & PPT Slides', category: 'COLLEGE', isDone: false, time: '02:00 PM' },
  { id: 'todo-10', text: 'Hydration Check: 3.5L Water Intake Target', category: 'PERSONAL', isDone: false },
  { id: 'todo-11', text: 'Screen curfew: Blue-light blocker on at 11:00 PM', category: 'PERSONAL', isDone: false, time: '11:00 PM' }
];

const DEFAULT_WHATSAPP_SETTINGS: WhatsAppSettings = {
  phoneNumber: '',
  countryCode: '+91',
  autoFormatEmoji: true,
  enableAutoBriefings: true,
  autoOpenTab: true,
  lastDispatchedSlot: undefined,
  customMessagePrefix: '🔔 *SPPU AI&DS ExamOS Alert*',
};

// Helper to sync theme class on documentElement
const applyThemeClass = (theme: ThemeMode) => {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
};

export const useExamStore = create<ExamStoreState>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      schedules: INITIAL_SCHEDULE,
      personalEvents: INITIAL_PERSONAL_EVENTS,
      whatsAppSettings: DEFAULT_WHATSAPP_SETTINGS,
      currentDate: '2026-10-08',
      selectedDate: '2026-10-08',
      activeStopwatch: {
        taskId: null,
        elapsedSeconds: 0,
        isRunning: false,
      },
      personalTodos: DEFAULT_PERSONAL_TODOS,
      subjectFilter: 'ALL',
      phaseFilter: 'ALL',
      activeTab: 'schedule',

      // Hotspot Quota State
      dailyHotspotQuotaMB: 2000,
      consumedHotspotMB: 650,
      hotspotHistory: [
        { date: '2026-10-07', consumedMB: 1450 },
        { date: '2026-10-06', consumedMB: 1820 },
        { date: '2026-10-05', consumedMB: 1200 },
      ],

      setTheme: (theme: ThemeMode) => {
        applyThemeClass(theme);
        set({ theme });
      },

      toggleTheme: () => {
        const nextTheme: ThemeMode = get().theme === 'dark' ? 'light' : 'dark';
        applyThemeClass(nextTheme);
        set({ theme: nextTheme });
      },

      setSelectedDate: (date: string) => set({ selectedDate: date }),
      setActiveTab: (tab) => set({ activeTab: tab }),
      setSubjectFilter: (filter) => set({ subjectFilter: filter }),
      setPhaseFilter: (filter) => set({ phaseFilter: filter }),

      toggleTask: (taskId: string) => {
        set((state) => {
          const newSchedules = state.schedules.map((schedule) => ({
            ...schedule,
            tasks: schedule.tasks.map((task) => {
              if (task.id === taskId) {
                const nextCompleted = !task.isCompleted;
                return {
                  ...task,
                  isCompleted: nextCompleted,
                  completedAt: nextCompleted ? new Date().toISOString() : undefined,
                  isBacklog: nextCompleted ? false : task.isBacklog,
                };
              }
              return task;
            }),
          }));
          return { schedules: newSchedules };
        });
      },

      auditAndRolloverDay: (date: string) => {
        set((state) => {
          const newSchedules = state.schedules.map((schedule) => {
            if (schedule.date === date) {
              return {
                ...schedule,
                isAudited: true,
                tasks: schedule.tasks.map((task) => ({
                  ...task,
                  isBacklog: !task.isCompleted ? true : task.isBacklog,
                })),
              };
            }
            return schedule;
          });
          return { schedules: newSchedules };
        });
      },

      autoRedistributeBacklog: () => {
        set((state) => {
          const allBacklogs: SubTask[] = [];
          const cleanedSchedules = state.schedules.map((schedule) => {
            const retainedTasks: SubTask[] = [];
            schedule.tasks.forEach((t) => {
              if (t.isBacklog && !t.isCompleted) {
                allBacklogs.push(t);
              } else {
                retainedTasks.push(t);
              }
            });
            return {
              ...schedule,
              tasks: retainedTasks,
              targetHours: Number(retainedTasks.reduce((acc, curr) => acc + curr.plannedHours, 0).toFixed(2)),
            };
          });

          if (allBacklogs.length === 0) return { schedules: cleanedSchedules };

          // Find upcoming days starting after selectedDate or currentDate with available capacity
          const today = state.selectedDate || state.currentDate;
          const updatedSchedules = [...cleanedSchedules];
          let backlogIdx = 0;

          for (let i = 0; i < updatedSchedules.length && backlogIdx < allBacklogs.length; i++) {
            const day = updatedSchedules[i];
            if (day.date >= today && day.dayType !== 'EXAM_DAY') {
              const currentLoad = day.tasks.reduce((sum, t) => sum + t.plannedHours, 0);
              const maxCap = day.dayType === 'SATURDAY' ? 12.0 : 8.5;
              const remainingCap = maxCap - currentLoad;

              if (remainingCap >= 1.5 && backlogIdx < allBacklogs.length) {
                const taskToMove = {
                  ...allBacklogs[backlogIdx],
                  currentScheduledDate: day.date,
                  timeSlot: '11:00 PM – 1:00 AM (Rollover)',
                  isBacklog: true,
                };
                day.tasks.push(taskToMove);
                day.targetHours = Number((currentLoad + taskToMove.plannedHours).toFixed(2));
                backlogIdx++;
              }
            }
          }

          // If any backlogs still remain, append to nearest Saturday
          while (backlogIdx < allBacklogs.length) {
            const nextSaturday = updatedSchedules.find((d) => d.date >= today && d.dayType === 'SATURDAY');
            if (nextSaturday) {
              const taskToMove = {
                ...allBacklogs[backlogIdx],
                currentScheduledDate: nextSaturday.date,
                timeSlot: 'Catch-up Buffer Block',
                isBacklog: true,
              };
              nextSaturday.tasks.push(taskToMove);
              nextSaturday.targetHours = Number((nextSaturday.targetHours + taskToMove.plannedHours).toFixed(2));
            }
            backlogIdx++;
          }

          return { schedules: updatedSchedules };
        });
      },

      rescheduleTask: (taskId: string, targetDate: string) => {
        set((state) => {
          let taskToMove: SubTask | null = null;

          // Remove task from origin
          const intermediateSchedules = state.schedules.map((schedule) => {
            const filteredTasks = schedule.tasks.filter((t) => {
              if (t.id === taskId) {
                taskToMove = { ...t, currentScheduledDate: targetDate };
                return false;
              }
              return true;
            });
            return {
              ...schedule,
              tasks: filteredTasks,
              targetHours: Number(filteredTasks.reduce((sum, t) => sum + t.plannedHours, 0).toFixed(2)),
            };
          });

          if (!taskToMove) return { schedules: state.schedules };

          // Insert into target day
          const finalSchedules = intermediateSchedules.map((schedule) => {
            if (schedule.date === targetDate && taskToMove) {
              const newTasks = [...schedule.tasks, taskToMove];
              return {
                ...schedule,
                tasks: newTasks,
                targetHours: Number(newTasks.reduce((sum, t) => sum + t.plannedHours, 0).toFixed(2)),
              };
            }
            return schedule;
          });

          return { schedules: finalSchedules };
        });
      },

      addTask: (date: string, newTaskData) => {
        set((state) => {
          const newTask: SubTask = {
            ...newTaskData,
            id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            isCompleted: false,
            isBacklog: false,
            originalDate: date,
            currentScheduledDate: date,
          };

          const newSchedules = state.schedules.map((schedule) => {
            if (schedule.date === date) {
              const updatedTasks = [...schedule.tasks, newTask];
              return {
                ...schedule,
                tasks: updatedTasks,
                targetHours: Number(updatedTasks.reduce((sum, t) => sum + t.plannedHours, 0).toFixed(2)),
              };
            }
            return schedule;
          });

          return { schedules: newSchedules };
        });
      },

      deleteTask: (taskId: string) => {
        set((state) => {
          const newSchedules = state.schedules.map((schedule) => {
            const updatedTasks = schedule.tasks.filter((t) => t.id !== taskId);
            return {
              ...schedule,
              tasks: updatedTasks,
              targetHours: Number(updatedTasks.reduce((sum, t) => sum + t.plannedHours, 0).toFixed(2)),
            };
          });
          return { schedules: newSchedules };
        });
      },

      // Personal Events Implementation
      addPersonalEvent: (newEventData) => {
        set((state) => {
          const newEvent: PersonalEvent = {
            ...newEventData,
            id: `pe-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          };
          return { personalEvents: [newEvent, ...state.personalEvents] };
        });
      },

      updatePersonalEvent: (id: string, updates: Partial<PersonalEvent>) => {
        set((state) => ({
          personalEvents: state.personalEvents.map((evt) =>
            evt.id === id ? { ...evt, ...updates } : evt
          ),
        }));
      },

      deletePersonalEvent: (id: string) => {
        set((state) => ({
          personalEvents: state.personalEvents.filter((evt) => evt.id !== id),
        }));
      },

      togglePersonalEvent: (id: string) => {
        set((state) => ({
          personalEvents: state.personalEvents.map((evt) =>
            evt.id === id ? { ...evt, isCompleted: !evt.isCompleted } : evt
          ),
        }));
      },

      // WhatsApp Settings & Actions
      updateWhatsAppSettings: (settings: Partial<WhatsAppSettings>) => {
        set((state) => ({
          whatsAppSettings: { ...state.whatsAppSettings, ...settings },
        }));
      },

      markBriefingDispatched: (slotKey: string) => {
        set((state) => ({
          whatsAppSettings: {
            ...state.whatsAppSettings,
            lastDispatchedSlot: slotKey,
          },
        }));
      },

      getWhatsAppTaskLink: (taskId: string, customPhone?: string) => {
        const state = get();
        let targetTask: SubTask | undefined;
        let targetDate = '';

        for (const schedule of state.schedules) {
          const found = schedule.tasks.find((t) => t.id === taskId);
          if (found) {
            targetTask = found;
            targetDate = schedule.date;
            break;
          }
        }

        if (!targetTask) return '';

        const phone = customPhone || state.whatsAppSettings.phoneNumber.replace(/[^0-9]/g, '');
        const emoji = state.whatsAppSettings.autoFormatEmoji ? '📚' : '';
        const priorityEmoji = targetTask.priority === 'P1' ? '🔥 [P1 CRITICAL]' : `[${targetTask.priority}]`;

        const message = `${state.whatsAppSettings.customMessagePrefix || '🔔 *SPPU AI&DS ExamOS Reminder*'}
${emoji} *Subject:* ${targetTask.subjectCode} ${targetTask.unit ? `(Unit ${targetTask.unit})` : ''}
📌 *Task:* ${targetTask.title}
⏰ *Time Slot:* ${targetTask.timeSlot} (${targetTask.plannedHours} hrs)
🎯 *Priority:* ${priorityEmoji}
📅 *Date:* ${targetDate}
📝 *Details:* ${targetTask.description}
Status: ${targetTask.isCompleted ? '✅ Completed' : '⏳ Pending'}
_Sent from SPPU AI&DS ExamOS_`;

        const encoded = encodeURIComponent(message);
        return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
      },

      getWhatsAppEventLink: (eventId: string, customPhone?: string) => {
        const state = get();
        const event = state.personalEvents.find((e) => e.id === eventId);
        if (!event) return '';

        const phone = customPhone || state.whatsAppSettings.phoneNumber.replace(/[^0-9]/g, '');
        const message = `${state.whatsAppSettings.customMessagePrefix || '🔔 *Personal Life Planner Reminder*'}
🌟 *Event:* ${event.title}
🏷️ *Category:* ${event.category}
⏰ *Time:* ${event.startTime}${event.endTime ? ` – ${event.endTime}` : ''}
📅 *Date:* ${event.date}
📍 *Location:* ${event.location || 'N/A'}
🎯 *Priority:* ${event.priority}
${event.description ? `📝 *Notes:* ${event.description}\n` : ''}Status: ${event.isCompleted ? '✅ Done' : '⏳ Pending'}
_Sent from SPPU AI&DS ExamOS_`;

        const encoded = encodeURIComponent(message);
        return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
      },

      getWhatsAppDailyDigestLink: (date: string, customPhone?: string, slotLabel?: string) => {
        const state = get();
        const schedule = state.schedules.find((s) => s.date === date);
        const events = state.personalEvents.filter((e) => e.date === date);
        const phone = customPhone || state.whatsAppSettings.phoneNumber.replace(/[^0-9]/g, '');

        const headerTitle = slotLabel || 'Daily Schedule Briefing';

        let digest = `🌅 *SPPU AI&DS ExamOS: ${headerTitle}*\n📅 *Date:* ${date}\n`;
        if (schedule) {
          digest += `📊 *Phase:* ${schedule.phase} | *Day:* ${schedule.dayOfWeek} (${schedule.dayType})\n`;
          digest += `⏱️ *Target Study Load:* ${schedule.targetHours}h\n`;
          digest += `🎯 *Focus:* ${schedule.notes}\n\n`;
          digest += `*📖 ACADEMIC TARGETS (${schedule.tasks.length}):*\n`;
          schedule.tasks.forEach((t, idx) => {
            const status = t.isCompleted ? '✅' : '⏳';
            digest += `${idx + 1}. ${status} [${t.subjectCode}${t.unit ? ` U${t.unit}` : ''}] ${t.title} (${t.timeSlot})\n`;
          });
        }

        if (events.length > 0) {
          digest += `\n*🌟 PERSONAL & ROUTINE COMMITMENTS (${events.length}):*\n`;
          events.forEach((e, idx) => {
            const status = e.isCompleted ? '✅' : '⏳';
            digest += `${idx + 1}. ${status} [${e.category}] ${e.title} @ ${e.startTime}\n`;
          });
        }

        digest += `\n*⏰ Scheduled Auto-Briefings:* 8:00 AM • 2:00 PM • 7:30 PM • 11:00 PM\n`;
        digest += `_Deterministic Execution • 2026 SPPU BE AI&DS_`;

        const encoded = encodeURIComponent(digest);
        return phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
      },

      addPersonalTodo: (text: string, category, time?: string) => {
        set((state) => ({
          personalTodos: [
            ...state.personalTodos,
            {
              id: `todo-${Date.now()}`,
              text,
              category,
              isDone: false,
              time,
            },
          ],
        }));
      },

      togglePersonalTodo: (id: string) => {
        set((state) => ({
          personalTodos: state.personalTodos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          ),
        }));
      },

      deletePersonalTodo: (id: string) => {
        set((state) => ({
          personalTodos: state.personalTodos.filter((todo) => todo.id !== id),
        }));
      },

      updateHotspotUsage: (deltaMB: number) => {
        set((state) => ({
          consumedHotspotMB: Math.max(0, state.consumedHotspotMB + deltaMB),
        }));
      },

      resetDailyHotspot: () => {
        set((state) => ({
          hotspotHistory: [
            { date: state.selectedDate || state.currentDate, consumedMB: state.consumedHotspotMB },
            ...state.hotspotHistory.slice(0, 6),
          ],
          consumedHotspotMB: 0,
        }));
      },

      startStopwatch: (taskId?: string) => {
        set((state) => ({
          activeStopwatch: {
            taskId: taskId || state.activeStopwatch.taskId,
            elapsedSeconds: state.activeStopwatch.elapsedSeconds,
            isRunning: true,
            startedAt: new Date().toISOString(),
          },
        }));
      },

      pauseStopwatch: () => {
        set((state) => ({
          activeStopwatch: {
            ...state.activeStopwatch,
            isRunning: false,
          },
        }));
      },

      resetStopwatch: () => {
        set({
          activeStopwatch: {
            taskId: null,
            elapsedSeconds: 0,
            isRunning: false,
          },
        });
      },

      tickStopwatch: () => {
        set((state) => {
          if (!state.activeStopwatch.isRunning) return {};
          return {
            activeStopwatch: {
              ...state.activeStopwatch,
              elapsedSeconds: state.activeStopwatch.elapsedSeconds + 1,
            },
          };
        });
      },

      resetToDefaults: () => {
        set({
          theme: 'dark',
          schedules: INITIAL_SCHEDULE,
          personalEvents: INITIAL_PERSONAL_EVENTS,
          whatsAppSettings: DEFAULT_WHATSAPP_SETTINGS,
          currentDate: '2026-10-08',
          selectedDate: '2026-10-08',
          activeStopwatch: {
            taskId: null,
            elapsedSeconds: 0,
            isRunning: false,
          },
          personalTodos: DEFAULT_PERSONAL_TODOS,
          subjectFilter: 'ALL',
          phaseFilter: 'ALL',
          activeTab: 'schedule',
          dailyHotspotQuotaMB: 2000,
          consumedHotspotMB: 650,
          hotspotHistory: [
            { date: '2026-10-07', consumedMB: 1450 },
            { date: '2026-10-06', consumedMB: 1820 },
            { date: '2026-10-05', consumedMB: 1200 },
          ],
        });
      },
    }),
    {
      name: 'sppu_aids_examos_v1',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.theme) {
          applyThemeClass(state.theme);
        }
      },
    }
  )
);


