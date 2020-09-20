// modules (keep alpahabetical)
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// components (keep alphabetical)
import { AppComponent } from './app.component';
import { DustinComponent } from './dustin/dustin.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RyanComponent } from './ryan/ryan.component';

// shared components (keep alphabetical)
import { HttpService } from './http.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RyanComponent,
    DustinComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
      { path: 'ryan', component: RyanComponent },
      { path: 'dustin', component: DustinComponent },
      { path: "", redirectTo: "login", pathMatch: "full" },
      { path: "**", redirectTo: "login" }
    ]),
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
