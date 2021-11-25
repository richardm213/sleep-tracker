import { SleepData } from './sleep-data';

export class OvernightSleepData extends SleepData {
  private sleepStart: Date;
  private sleepEnd: Date;
  private time: Date;
  private sleepDifference: number;

  constructor(sleepStart: Date, sleepEnd: Date, loggedAt: Date = new Date()) {
    super();
    this.sleepStart = sleepStart;
    this.loggedAt = loggedAt;
    this.time = sleepStart;
    this.sleepEnd = sleepEnd;
    this.sleepDifference = this.sleepEnd.getTime() - this.sleepStart.getTime();
  }

  summaryString(): string {
    var sleepStart_ms = this.sleepStart.getTime();
    var sleepEnd_ms = this.sleepEnd.getTime();

    // Calculate the difference in milliseconds
    var difference_ms = sleepEnd_ms - sleepStart_ms;

    // Convert to hours and minutes
    return (
      Math.floor(difference_ms / (1000 * 60 * 60)) +
      ' hours, ' +
      Math.floor((difference_ms / (1000 * 60)) % 60) +
      ' minutes.'
    );
  }

  dateString(): string {
    return (
      'Night of ' +
      this.sleepStart.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    );
  }
  getTime(): Date {
    return this.time;
  }
  getSleepDifference(): number {
    return this.sleepDifference;
  }
}
