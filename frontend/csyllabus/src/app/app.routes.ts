import {CoreComponent} from './core/core.component';
import {ExplorerComponent} from './core/explorer/explorer.component';
import {ComparatorComponent} from './core/comparator/comparator.component';
import {CourseComponent} from './components/course/course.component';
import {UniversityComponent} from './components/university/university.component';
import {AboutComponent} from './components/about/about.component';
import {ContactComponent} from './components/contact/contact.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {DocumentationComponent} from "./components/documentation/documentation.component";

export const ROUTES = [
  {
    path: '',
    redirectTo: 'core',
    pathMatch: 'full'
  },
  {
    path: 'core',
    component: CoreComponent,
    children: [
      {
        path: 'explorer',
        component: ExplorerComponent,
        outlet: 'sub'
      },
      {
        path: 'comparator',
        component: ComparatorComponent,
        outlet: 'sub'
      },
      {
        path: 'comparator/:courseId',
        component: ComparatorComponent,
        outlet: 'sub'
      }
      ]
  },
  {
    path: 'course/:id',
    component: CourseComponent
  },
  {
    path: 'university/:id',
    component: UniversityComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'connect',
    component: DocumentationComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  },
];
