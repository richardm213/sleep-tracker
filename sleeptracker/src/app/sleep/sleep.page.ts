import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-sleep',
  templateUrl: 'sleep.page.html',
  styleUrls: ['sleep.page.scss'],
})
export class SleepPage implements OnInit {
  day: string = new Date().toString().substring(0, 15);
  date: Date = new Date();
  fellAsleepTime = this.currentTime;
  wokeUpTime = this.currentTime;
  sleepinessTime = this.currentTime;
  sleepiness = null;
  sleepinessText: string = 'Select Sleepiness Rating';
  time: string = this.date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
  viewOption: string = '1';

  constructor(
    public sleepService: SleepService,
    public alertController: AlertController,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    setInterval(() => {
      this.date = new Date();
      this.day = this.date.toString().substring(0, 15);
      this.time = this.date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    }, 1000);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      position: 'top',
      duration: 2000,
      color: 'success',
      animated: true,
    });
    toast.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  get currentTime() {
    return new Date().toISOString();
  }

  addSleepData() {
    if (new Date(this.wokeUpTime) <= new Date(this.fellAsleepTime)) {
      this.presentAlert('Please enter valid fall asleep and wake up times.');
    } else {
      this.presentToast('Sleep Entry Recorded');
      this.sleepService.logOvernightData(
        new OvernightSleepData(
          new Date(this.fellAsleepTime),
          new Date(this.wokeUpTime)
        )
      );
    }
  }
  addSleepinessData() {
    if (this.sleepiness == null) {
      this.presentAlert('Please select a sleepiness rating.');
    } else {
      this.presentToast('Sleepiness Entry Recorded');
      this.sleepService.logSleepinessData(
        new StanfordSleepinessData(
          parseInt(this.sleepiness),
          new Date(this.sleepinessTime)
        )
      );
    }
  }
  updateSleepinessText() {
    this.sleepinessText = 'Sleepiness Rating: ' + this.sleepiness;
  }
}
