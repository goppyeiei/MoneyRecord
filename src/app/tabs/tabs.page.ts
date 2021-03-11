import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor() {}

  async reloadp() {
    const loading = document.createElement('ion-loading');
    loading.message = 'Please wait...';
    loading.duration = 2000;
    document.body.appendChild(loading);
    await loading.present();

    await setTimeout(() => {
      window.location.reload();
    }, 0);
  }
}

