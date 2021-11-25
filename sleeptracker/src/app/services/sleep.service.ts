import { Injectable } from '@angular/core';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root',
})
export class SleepService {
  public static AllSleepData: SleepData[] = [];
  public static AllOvernightData: OvernightSleepData[] = [];
  public static AllSleepinessData: StanfordSleepinessData[] = [];
  public static AverageSleepSum: number = 0;
  public static NightsTracked: number = 0;
  public static LongestSleep: OvernightSleepData = null;
  public static ShortestSleep: OvernightSleepData = null;

  constructor(private storage: Storage) {
    storage.create();
    this.loadStorageData();
  }

  private loadStorageData() {
    this.storage.forEach((data) => {
      if (data.hasOwnProperty('sleepStart')) {
        var d = new OvernightSleepData(
          data.sleepStart,
          data.sleepEnd,
          data.loggedAt
        );
        SleepService.AllOvernightData.push(d);
        SleepService.NightsTracked += 1;
        SleepService.AverageSleepSum += d.getSleepDifference();
        if (
          SleepService.LongestSleep == null ||
          d.getSleepDifference() >
            SleepService.LongestSleep.getSleepDifference()
        ) {
          SleepService.LongestSleep = d;
        }
        if (
          SleepService.ShortestSleep == null ||
          d.getSleepDifference() <
            SleepService.ShortestSleep.getSleepDifference()
        ) {
          SleepService.ShortestSleep = d;
        }
      } else {
        SleepService.AllSleepinessData.push(
          new StanfordSleepinessData(data.loggedValue, data.loggedAt)
        );
      }
    });
  }

  public logOvernightData(sleepData: OvernightSleepData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllOvernightData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
    SleepService.NightsTracked += 1;
    SleepService.AverageSleepSum += sleepData.getSleepDifference();
    if (
      SleepService.LongestSleep == null ||
      sleepData.getSleepDifference() >
        SleepService.LongestSleep.getSleepDifference()
    ) {
      SleepService.LongestSleep = sleepData;
    }
    if (
      SleepService.ShortestSleep == null ||
      sleepData.getSleepDifference() <
        SleepService.ShortestSleep.getSleepDifference()
    ) {
      SleepService.ShortestSleep = sleepData;
    }
  }

  public logSleepinessData(sleepData: StanfordSleepinessData) {
    SleepService.AllSleepData.push(sleepData);
    SleepService.AllSleepinessData.push(sleepData);
    this.storage.set(sleepData.id, sleepData);
  }
}
