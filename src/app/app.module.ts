import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { routing, appRoutingProviders } from './app.routing';

//Componentes
import { AppComponent } from './app.component';
import { TiendaComponent } from './../components/tienda/tienda.components';
import { ParquesComponent } from './../components/parques/parques.components';
import { AnimalsComponent } from './../components/animals/animals.component';
import { ContactComponent } from './../components/contact/contact.component';
import { KeepersComponent } from './../components/keepers/keepers.component';
import { HomeComponent } from './../components/home/home.component';

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
    HomeComponent
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
