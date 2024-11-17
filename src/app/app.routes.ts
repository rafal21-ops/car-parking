import { Route } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { TestingComponent } from './testing/testing.component';

export const appRoutes: Route[] = [
  { path: '', component: TestingComponent }
];
