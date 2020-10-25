import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursesComponent } from '../components/courses/courses.component';
import { ScoreboardComponent } from '../components/scoreboard/scoreboard.component';
import { WelcomeComponent } from '../components/welcome/welcome.component';

const routes: Routes = [
  { path: '',   redirectTo: 'welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent},
  { path: 'courses', component: CoursesComponent},
  { path: 'scoreboard/:id', component: ScoreboardComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
