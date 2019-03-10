import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { TiendaComponent } from './../components/tienda/tienda.components';   
import { AnimalsComponent } from './../components/animals/animals.component';
import { ContactComponent } from './../components/contact/contact.component';
import { KeepersComponent } from './../components/keepers/keepers.component';
import { HomeComponent } from './../components/home/home.component';
import { RegisterComponent } from './../components/register/register.component';
import { LoginComponent } from './../components/login/login.component';


const appRoutes: Routes = [
    
    {   path : '', component: HomeComponent },
    {   path : '', redirectTo: 'home', pathMatch: 'full' },
    {   path : 'home', component: HomeComponent },
    {   path : 'tienda', component: TiendaComponent },
    {   path : 'keepers', component: KeepersComponent },
    {   path : 'contact', component: ContactComponent },
    {   path : 'animals', component: AnimalsComponent },
    {   path : 'login', component: LoginComponent },
    {   path : 'register', component: RegisterComponent },
    
    {   path : '**', component: HomeComponent },
];

export const appRoutingProviders: any[] =[];
export const routing: ModuleWithProviders =  RouterModule.forRoot(appRoutes);

