import { Component } from '@angular/core';

@Component({
    selector: 'tienda',
    //template: `<h1>{{ titulo }}</h1>`,
    templateUrl: './../tienda/tienda.component.html',
    //styles: ['h1 {color:blue}']
    styleUrls: ['./../tienda/tienda.component.css']
})

export class TiendaComponent {
    public titulo;
    public nombreDelParque: string;
    constructor(){
        this.titulo = 'Esta es la tienda';
    }

    mostrarNombre(){
        console.log(this.nombreDelParque)
    }
}