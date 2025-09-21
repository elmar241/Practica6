import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { UserViewComponent } from './pages/user-view/user-view.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [
    {path: "", pathMatch: 'full', redirectTo:"home"},
    {path: "home", component: HomeComponent},
    {path: "newuser", component: FormComponent},
    {path: "updateuser/:idUser", component: FormComponent},
    {path: "user/:idUser", component: UserViewComponent},
    {path: "**", component: Error404Component }
];
