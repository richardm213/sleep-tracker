import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.page.html',
  styleUrls: ['./journal.page.scss'],
})
export class JournalPage implements OnInit {
  sleepArray: OvernightSleepData[];
  sleepinessArray: StanfordSleepinessData[];
  viewOption: string = '1';
  v = SleepService.NightsTracked;
  constructor(public sleepService: SleepService) {}

  ngOnInit() {
    this.sleepArray = SleepService.AllOvernightData;
    this.sleepinessArray = SleepService.AllSleepinessData;
  }
  sortedSleep() {
    return this.sleepArray.sort((a, b) =>
      a.getTime() > b.getTime() ? -1 : a.getTime() < b.getTime() ? 1 : 0
    );
  }
  sortedSleepiness() {
    return this.sleepinessArray.sort((a, b) =>
      a.getTime() > b.getTime() ? -1 : a.getTime() < b.getTime() ? 1 : 0
    );
  }
}
