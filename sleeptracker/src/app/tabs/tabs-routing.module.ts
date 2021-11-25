import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      { path: '', redirectTo: 'sleep', pathMatch: 'full' },
      {
        path: 'sleep',
        loadChildren: () =>
          import('../sleep/sleep.module').then((m) => m.SleepPageModule),
      },
      {
        path: 'stats',
        loadChildren: () =>
          import('../stats/stats.module').then((m) => m.StatsPageModule),
      },
      {
        path: 'journal',
        loadChildren: () =>
          import('../journal/journal.module').then((m) => m.JournalPageModule),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'tabs/sleep',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
