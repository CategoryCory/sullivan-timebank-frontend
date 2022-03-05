import { daysOfWeek, timesOfDay } from "../components/common/values";

export default function scheduleFormatter(dayOfWeek: number, begin: number, end: number): string {
    const dayString: string | undefined = daysOfWeek.find(d => d.value === dayOfWeek)?.label;
    const beginString: string | undefined = timesOfDay.find(t => t.value === begin)?.label;
    const endString: string | undefined = timesOfDay.find(t => t.value === end)?.label;

    if (dayString == null || beginString == null || endString == null) {
        return "Improper date/time formatting";
    }

    return `${dayString} - ${beginString} to ${endString}`;
}