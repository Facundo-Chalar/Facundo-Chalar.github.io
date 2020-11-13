export class Cliente {
    id:number;
    nombre:string;
    direccion:string;
    lat:string;
    long: string;

    constructor(id,nombre,direccion,lat,long){
        this.id = id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.lat = lat;
        this.long = long;
    }
}
