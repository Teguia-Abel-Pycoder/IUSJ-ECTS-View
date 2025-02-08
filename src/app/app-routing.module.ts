import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PvComponent } from './main-components/pv/pv.component';
import { UserComponent } from './main-components/user/user.component';
import { StudentComponent } from './main-components/student/student.component';
import { EquivalenceComponent } from './main-components/equivalence/equivalence.component';

export const routes: Routes = [
  { path: "", component: PvComponent },
  { path: "student", component: StudentComponent }, // Fixed casing
  { path: "user", component: UserComponent }, // Fixed casing
  { path: "equivalence", component: EquivalenceComponent }, // Fixed casing
  { path: "pv", component: PvComponent } // Fixed casing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
