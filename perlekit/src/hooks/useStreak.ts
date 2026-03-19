import { useState, useEffect } from 'react';

const REMINDER_KEY = 'perle-reminder-time';

const useStreak = (streakDays: number) => {
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState('09:00');

  useEffect(() => {
    const saved = localStorage.getItem(REMINDER_KEY);
    if (saved) {
      setReminderEnabled(true);
      setReminderTime(saved);
    }
  }, []);

  const requestReminder = async (time: string): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') return false;
      localStorage.setItem(REMINDER_KEY, time);
      setReminderEnabled(true);
      setReminderTime(time);
      new Notification('Perle Reminder Set ✅', {
        body: `Daily reminder set for ${time}. Keep your streak alive!`,
      });
      return true;
    } catch {
      return false;
    }
  };

  const cancelReminder = (): void => {
    setReminderEnabled(false);
    localStorage.removeItem(REMINDER_KEY);
  };

  const pointsAtRisk = streakDays >= 3 ? streakDays * 5 : 0;
  const daysToMaxMultiplier = Math.max(0, 30 - streakDays);

  return {
    reminderEnabled,
    reminderTime,
    requestReminder,
    cancelReminder,
    pointsAtRisk,
    daysToMaxMultiplier,
  };
};

export default useStreak;
