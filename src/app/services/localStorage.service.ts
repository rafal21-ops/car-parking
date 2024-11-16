import { Injectable, Inject, PLATFORM_ID, InjectionToken } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const LOCAL_STORAGE_KEY = new InjectionToken<string>('LOCAL_STORAGE_KEY');

@Injectable({
  providedIn: 'root'
})

export class LocalStorageService {
  readonly #localStorageAvailable: Storage | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(LOCAL_STORAGE_KEY) private storageKey: string
  ) {

    if (isPlatformBrowser(this.platformId)) {
      this.#localStorageAvailable = localStorage;
    }
  }

  setItem<T>(value: T): void {
    if (this.#localStorageAvailable) {
      const jsonData = JSON.stringify(value);
      this.#localStorageAvailable.setItem(this.storageKey, jsonData);
    }
  }

  getItem<T>() {
    if (this.#localStorageAvailable) {
      const jsonData = this.#localStorageAvailable.getItem(this.storageKey);
      return jsonData ? JSON.parse(jsonData) as T : null;
    }
    return null;
  }

  removeItem(): void {
    if (this.#localStorageAvailable) {
      this.#localStorageAvailable.removeItem(this.storageKey);
    }
  }

  clear(): void {
    if (this.#localStorageAvailable) {
      this.#localStorageAvailable.clear();
    }
  }
}
