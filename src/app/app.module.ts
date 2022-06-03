import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ConnectFormComponent } from './connect-form/connect-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { AppRoutingModule } from './app-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = []

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ConnectFormComponent,
    SignupFormComponent,
    UsersListComponent,
    ArticlesListComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
