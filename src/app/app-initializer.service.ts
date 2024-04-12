import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppInitializerService {
  constructor() {}
  private appLoaded = false;

  initializeApp(): Promise<void> {
    // Simulate initialization process (e.g., loading data, authentication checks)
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        this.appLoaded = true;
        resolve();
      }, 3000); // Simulate 3 seconds loading time
    });
  }

  isAppLoaded(): boolean {
    return this.appLoaded;
  }
}
