import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './../parques/parques.component.html',
})

export class ParquesComponent {
    @Input() nombre:string;
    @Input('metros_cuadrados') metros: number;
    public vegetacion: string;
    public abierto: boolean;

    @Output() pasameLosDatos = new EventEmitter();

    constructor(){
        this.nombre = 'Parque Natural';
        this.metros = 340;
        this.vegetacion = 'Alta';
        this.abierto = false;
    }

    emitirEvento(){
        this.pasameLosDatos.emit({ 
            'nombre': this.nombre,
            'metros': this.metros,
            'vegetacion':this.vegetacion,
            'abierto': this.abierto
        })
    }
}