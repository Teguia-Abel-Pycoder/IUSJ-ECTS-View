import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchbarComponent } from './shared-components/searchbar/searchbar.component';
import { HeaderComponent } from "./shared-components/header/header.component";
import { PvComponent } from './main-components/pv/pv.component';
import { EquivalenceComponent } from './main-components/equivalence/equivalence.component';
import { UserComponent } from './main-components/user/user.component';
import { StudentComponent } from './main-components/student/student.component';
import { SelectOptionComponent } from './shared-components/select-option/select-option.component';
import { BreadcrumbComponent } from './shared-components/breadcrumb/breadcrumb.component'; // ✅ Import standalone component

@NgModule({
  declarations: [
    AppComponent,
    PvComponent,
    EquivalenceComponent,
    UserComponent,
    StudentComponent,
    SelectOptionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchbarComponent, // ✅ Standalone component
    HeaderComponent, // ✅ Standalone component
    BreadcrumbComponent // ✅ Standalone component (moved from declarations to imports)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
