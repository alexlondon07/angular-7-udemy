import { Component, Input } from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './../parques/parques.component.html',
})

export class ParquesComponent {
    @Input() nombre:string;
    @Input('metros_cuadrados') metros: number;
    public vegetacion: string;
    public abierto: boolean;

    constructor(){
        this.nombre = 'Parque Natural';
        this.metros = 340;
        this.vegetacion = 'Alta';
        this.abierto = true;
    }
}