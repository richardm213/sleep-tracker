import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  constructor(public sleepService: SleepService) {}

  ngOnInit() {}

  get averageSleep() {
    let average = SleepService.AverageSleepSum / SleepService.NightsTracked;
    if (SleepService.NightsTracked == 0) {
      average = 0;
    }
    return (
      Math.floor(average / (1000 * 60 * 60)) +
      ' hours, ' +
      Math.floor((average / (1000 * 60)) % 60) +
      ' minutes'
    );
  }

  get longestSleep() {
    if (SleepService.LongestSleep == null) {
      return 'N/A hours, N/A minutes';
    }
    var sleep = SleepService.LongestSleep.getSleepDifference();
    return (
      Math.floor(sleep / (1000 * 60 * 60)) +
      ' hours, ' +
      Math.floor((sleep / (1000 * 60)) % 60) +
      ' minute'
    );
  }
  get longestSleepDate() {
    if (SleepService.LongestSleep == null) return '';
    return SleepService.LongestSleep.getTime().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  get shortestSleep() {
    if (SleepService.ShortestSleep == null) {
      return 'N/A hours, N/A minutes';
    }
    var sleep = SleepService.ShortestSleep.getSleepDifference();
    return (
      Math.floor(sleep / (1000 * 60 * 60)) +
      ' hours, ' +
      Math.floor((sleep / (1000 * 60)) % 60) +
      ' minute'
    );
  }
  get shortestSleepDate() {
    if (SleepService.ShortestSleep == null) return '';
    return SleepService.ShortestSleep.getTime().toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  get nightsTracked() {
    return SleepService.NightsTracked;
  }
}
