import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { TiendaComponent } from './../components/tienda/tienda.components';
import { ParquesComponent } from './../components/parques/parques.components';
import { AnimalsComponent } from './../components/animals/animals.component';
import { ContactComponent } from './../components/contact/contact.component';
import { HomeComponent } from './../components/home/home.component';
import { KeepersComponent } from './../components/keepers/keepers.component';
import { RegisterComponent } from './../components/register/register.component';
import { LoginComponent } from './../components/login/login.component';
import { UserEditComponent } from 'src/components/user-edit/user-edit.component';

//Modules
import { AdminModule } from './admin/admin.module';

@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    AnimalsComponent,
    ContactComponent,
    KeepersComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    routing,
    AdminModule
  ],
  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
