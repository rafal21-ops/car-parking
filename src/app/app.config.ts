import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { IconDefinition } from '@ant-design/icons-angular';
import { PoweroffOutline, LockOutline, UserOutline } from '@ant-design/icons-angular/icons';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { LOCAL_STORAGE_KEY } from './services/localStorage.service';


const icons: IconDefinition[] = [PoweroffOutline, LockOutline, UserOutline];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideNzIcons(icons),
    importProvidersFrom([BrowserAnimationsModule]),
    provideNzI18n(en_US),
    { provide: LOCAL_STORAGE_KEY, useValue: 'userInformation' }
  ]
};
