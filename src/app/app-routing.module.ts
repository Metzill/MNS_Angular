import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ConnectFormComponent } from './connect-form/connect-form.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { UsersListComponent } from './users-list/users-list.component';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';

const routes: Routes = [
  { path: "signin", component: ConnectFormComponent},
  { path: "signup", component: SignupFormComponent},
  { path: "usersList", component: UsersListComponent},
  { path: "articlesList", component: ArticlesListComponent},
  { path: "user/:id", component: UserDetailComponent},
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
