import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'user/:id', component: UserDetailComponent},
    { path: 'newuser', component: UserFormComponent},
    { path: 'updateuser/:id', component: UserFormComponent},
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: '**', component: PageNotFoundComponent, title: 'Página no encontrada' } 
];
