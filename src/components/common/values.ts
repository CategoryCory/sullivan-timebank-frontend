import { NumberOptionType } from "../../models/options";

export const daysOfWeek: NumberOptionType[] = [
    { value: 0, label: 'Sunday' },
    { value: 1, label: 'Monday' },
    { value: 2, label: 'Tuesday' },
    { value: 3, label: 'Wednesday' },
    { value: 4, label: 'Thursday' },
    { value: 5, label: 'Friday' },
    { value: 6, label: 'Saturday' },
]

export const timesOfDay: NumberOptionType[] = [
    { value: 700, label: "7:00 AM" },
    { value: 730, label: "7:30 AM" },
    { value: 800, label: "8:00 AM" },
    { value: 830, label: "8:30 AM" },
    { value: 900, label: "9:00 AM" },
    { value: 930, label: "9:30 AM" },
    { value: 1000, label: "10:00 AM" },
    { value: 1030, label: "10:30 AM" },
    { value: 1100, label: "11:00 AM" },
    { value: 1130, label: "11:30 AM" },
    { value: 1200, label: "12:00 PM" },
    { value: 1230, label: "12:30 PM" },
    { value: 1300, label: "1:00 PM" },
    { value: 1330, label: "1:30 PM" },
    { value: 1400, label: "2:00 PM" },
    { value: 1430, label: "2:30 PM" },
    { value: 1500, label: "3:00 PM" },
    { value: 1530, label: "3:30 PM" },
    { value: 1600, label: "4:00 PM" },
    { value: 1630, label: "4:30 PM" },
    { value: 1700, label: "5:00 PM" },
    { value: 1730, label: "5:30 PM" },
    { value: 1800, label: "6:00 PM" },
    { value: 1830, label: "6:30 PM" },
    { value: 1900, label: "7:00 PM" },
]

export function getWeekdayLabel(dayId: number): string {
    return daysOfWeek.find(day => day.value === dayId)?.label ?? "";
}

export function getTimeOfDayLabel(timeId: number): string {
    return timesOfDay.find(time => time.value === timeId)?.label ?? "";
}

export const jobApplicationStatuses = {
    pending: "Pending",
    accepted: "Accepted",
    declined: "Declined",
    completed: "Completed",
}