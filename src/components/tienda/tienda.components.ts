import { Component } from '@angular/core';

@Component({
    selector: 'tienda',
    templateUrl: './../tienda/tienda.component.html',
    styleUrls: ['./../tienda/tienda.component.css']
})

export class TiendaComponent {
    public titulo;
    public nombreDelParque: string;
    public miParque;

    constructor(){
        this.titulo = 'Esta es la tienda';
    }

    mostrarNombre(){
        console.log(this.nombreDelParque)
    }

    verDatosParque(event){
        console.log(event);
        this.miParque = event;
    }
}