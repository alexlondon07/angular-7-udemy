import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Components
import { MainComponent } from './components/main/main.component';
import { ListComponent } from './components/list/list.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { DeleteComponent } from './components/delete/delete.component';

const appRoutes: Routes = [
    {   
        path : 'admin-panel', 
        component: MainComponent,
        children: [
            { path : 'list', component: ListComponent },
            { path : 'add', component: AddComponent },
            { path : 'edit', component: EditComponent },
            { path : 'delete', component: DeleteComponent }
        ] 
    }
];

@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AdminRoutingModule {};