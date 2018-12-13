import { Component, 
    Input,
    Output,
    EventEmitter,
    OnChanges,
    SimpleChanges,
    OnInit
} from '@angular/core';

@Component({
    selector: 'parques',
    templateUrl: './../parques/parques.component.html',
})

export class ParquesComponent implements OnChanges, OnInit{
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

    //Este metodo se carga cuando se ejecuta la directiva de parques
    ngOnInit(){
        console.log('ngOnInit Lanzado')
    }

    //El primero que se ejecuta
    ngOnChanges(changes: SimpleChanges){
        console.log("Existen cambios en las propiedades", changes);
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