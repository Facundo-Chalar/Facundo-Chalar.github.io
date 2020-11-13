import { AfterViewInit, Component, OnInit } from '@angular/core';

import { DrawEvents, featureGroup, FeatureGroup, icon, latLng, LatLng, Layer, marker, tileLayer } from 'leaflet';
import * as GeoJsonGeometriesLookup from 'geojson-geometries-lookup';
import { Cliente } from './cliente.model';
import { isBuffer } from 'util';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
    ngOnInit(): void {
        this.cargarClientes();
        this.limpiarComas();
    }
    ngAfterViewInit(): void {
        this.getProductosFiltrados();
    }
    title = 'puritas';
    listaProductos = [];
    listaFiltrada = [];
    cantidadArticulo = 0 ;
    monto:number = 0;
    zonas = [];
    articulo;
    layer;
    noResultMsg = null;
    listaClientes = [];
    listaDirecciones = [];
    listaVendedores = [];
    colClientes: Cliente[] = [];
    filtroCliente : Cliente;
    filtroVendedor;
    lista = {
        "Hoja": [
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,055.70 ",
                "Cantidad": 20,
                "Peso": 50
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,456.74 ",
                "Cantidad": 10,
                "Peso": 49.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "8,645.00 ",
                "Cantidad": 50,
                "Peso": 151
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "398,586.75 ",
                "Cantidad": 1500,
                "Peso": 8250
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "444 - COCOA PURITAS 1 X 2.50 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "452 - ACHOCOLATADO DINO KAO AIDA 12X200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "600 - JUGUITO 2LITROS 24 X 24 GR",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "514,836.00 ",
                "Cantidad": 3600,
                "Peso": 2376
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,082.65 ",
                "Cantidad": 10,
                "Peso": 48.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "106809 - FIDEOS PURITAS MOÑAS 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,082.65 ",
                "Cantidad": 10,
                "Peso": 48.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,082.65 ",
                "Cantidad": 10,
                "Peso": 48.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "106817 - FIDEOS PURI RIZZETO 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,082.65 ",
                "Cantidad": 10,
                "Peso": 48.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "378,275.64 ",
                "Cantidad": 10008,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108901 - GLUTINA HUEVO CAB DE ANGEL 1X500 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108903 - GLUTINA HUEVO LETRITAS  1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,754.97 ",
                "Cantidad": 96,
                "Peso": 48.768
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108905 - GLUTINA HUEVO CUCUZU 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,066.23 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108906 - GLUTINA HUEVO ARITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,132.45 ",
                "Cantidad": 144,
                "Peso": 73.152
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,132.45 ",
                "Cantidad": 144,
                "Peso": 73.152
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "8,264.91 ",
                "Cantidad": 288,
                "Peso": 146.304
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,887.42 ",
                "Cantidad": 240,
                "Peso": 121.92
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,887.42 ",
                "Cantidad": 240,
                "Peso": 121.92
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,887.42 ",
                "Cantidad": 240,
                "Peso": 121.92
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,066.23 ",
                "Cantidad": 72,
                "Peso": 36.72
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,721.86 ",
                "Cantidad": 60,
                "Peso": 30.6
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "418,957.18 ",
                "Cantidad": 1326,
                "Peso": 16044.6
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2027 - ALMIDON DE MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,170.00 ",
                "Cantidad": 30,
                "Peso": 151.02
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "63,255.60 ",
                "Cantidad": 360,
                "Peso": 588.9599999999999
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "275,827.58 ",
                "Cantidad": 600,
                "Peso": 6900
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,462.00 ",
                "Cantidad": 30,
                "Peso": 30.9
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "4555 - AJIES CAT ENTERO POTE 500 CC 1X150 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "362.10 ",
                "Cantidad": 12,
                "Peso": 4.404
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.592
            },
            {
                "Cliente": 1,
                "Direccion": "Adolfo Rodriguez 5787 y Garzon",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "61,751.79 ",
                "Cantidad": 248,
                "Peso": 620
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "101,814.41 ",
                "Cantidad": 236.84,
                "Peso": 1181.8316000000002
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "105 - AVENA PURITAS LAMINADA 12 X 800 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "37,223.28 ",
                "Cantidad": 50,
                "Peso": 499
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "12,026.92 ",
                "Cantidad": 71,
                "Peso": 214.41999999999996
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107 - SALVADO DE AVENA 12 x 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "977.90 ",
                "Cantidad": 1,
                "Peso": 6.1
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -275.63 ",
                "Cantidad": -1.05,
                "Peso": -5.775000000000001
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "254 - HARINA DE MAIZ BIOS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,321.20 ",
                "Cantidad": 6.2,
                "Peso": 34.72
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,378.16 ",
                "Cantidad": 12.69,
                "Peso": 153.35865000000007
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "783.94 ",
                "Cantidad": 0.92,
                "Peso": 4.968
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "245 - MAZAMORRA BLANCA 12 X 400 GR.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -26.51 ",
                "Cantidad": -0.04,
                "Peso": -0.1988
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "366 - COPOS DE MAIZ AZUCARADOS 20 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,531.81 ",
                "Cantidad": 6.95,
                "Peso": 30.89275
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "361 - COPOS DE MAIZ NATURALES 20 X 150 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "985.59 ",
                "Cantidad": 1.95,
                "Peso": 6.1425
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "340 - ARITOS FRUTADOS 20 X 90 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,017.76 ",
                "Cantidad": 6,
                "Peso": 11.7
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "437 - COMPLETO PURITAS 12 x 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "524.08 ",
                "Cantidad": 1,
                "Peso": 2.557
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "444 - COCOA PURITAS 1 X 2.50 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,381.48 ",
                "Cantidad": 12,
                "Peso": 30.36
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,159.72 ",
                "Cantidad": 15.92,
                "Peso": 40.70744
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "451 - ACHOCOL.  DINO KAO AIDA 12 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,972.78 ",
                "Cantidad": 6.6,
                "Peso": 40.425000000000004
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,381.16 ",
                "Cantidad": 13,
                "Peso": 40.300000000000004
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -39.91 ",
                "Cantidad": -0.08,
                "Peso": -0.252
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "600 - JUGUITO 2LITROS 24 X 24 GR",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "12,356.06 ",
                "Cantidad": 90,
                "Peso": 59.4
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "634 - JUGUITO MANZANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -7.20 ",
                "Cantidad": -0.06,
                "Peso": -0.03972
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,856.63 ",
                "Cantidad": 4.02,
                "Peso": 39.355799999999995
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,427.96 ",
                "Cantidad": 7.35,
                "Peso": 91.5075
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "750 - HARINA 00 AIDA 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,913.49 ",
                "Cantidad": 15.76,
                "Peso": 192.50840000000002
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "1015 - BUONAPASTA HUEVO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101507 - BUONAPASTA HUEVO PAMPERITOS 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -19.14 ",
                "Cantidad": -1,
                "Peso": -0.407
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101508 - BUONAPASTA HUEVO DEDALES 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -76.55 ",
                "Cantidad": -4,
                "Peso": -1.6280000000000001
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101509 - BUONAPASTA HUEVO MOÑAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -119.60 ",
                "Cantidad": -6,
                "Peso": -2.442
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101510 - BUONAPASTA HUEVO TIRABUZONES 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -153.43 ",
                "Cantidad": -8,
                "Peso": -3.256
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101511 - BUONAPASTA HUEVO MOSTACHOL1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -324.01 ",
                "Cantidad": -17,
                "Peso": -6.919
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101515 - BUONAPASTA HUEVO TROMPETIN 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -185.78 ",
                "Cantidad": -10,
                "Peso": -4.069999999999999
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101516 - BUONAPASTA HUEVO CORBATAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -150.44 ",
                "Cantidad": -8,
                "Peso": -3.256
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101517 - BUONAPASTA HUEVO RIZZETO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -76.09 ",
                "Cantidad": -4,
                "Peso": -1.628
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "101522 - BUONAPASTA HUEVO NIDOS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -39.07 ",
                "Cantidad": -2,
                "Peso": -0.822
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104309 - DON GUSTO HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -412.60 ",
                "Cantidad": -13,
                "Peso": -6.591
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104316 - DON GUSTO HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -445.28 ",
                "Cantidad": -14,
                "Peso": -7.098
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104318 - DON GUSTO HUEVO CAPPELLETTIS 1x500G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -263.85 ",
                "Cantidad": -8,
                "Peso": -4.056
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104321 - DON GUSTO HUEVO TALLARINES 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -100.45 ",
                "Cantidad": -3,
                "Peso": -1.545
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104322 - DON GUSTO HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,573.68 ",
                "Cantidad": 47,
                "Peso": 24.205
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "1045 - DON GUSTO HUEVO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104509 - DON GUSTO HUEVO MOÑAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -84.77 ",
                "Cantidad": -4,
                "Peso": -1.624
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104518 - DON GUSTO HUEVO CAPPELLETTIS 1x400G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -20.34 ",
                "Cantidad": -1,
                "Peso": -0.406
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104522 - DON GUSTO HUEVO NIDOS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -61.03 ",
                "Cantidad": -3,
                "Peso": -1.224
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104609 - DON GUSTO HUEVO MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "320.08 ",
                "Cantidad": 2,
                "Peso": 6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104616 - DON GUSTO HUEVO CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "320.08 ",
                "Cantidad": 2,
                "Peso": 6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104618 - DON GUSTO HUEVO CAPPELLETTIS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "320.08 ",
                "Cantidad": 2,
                "Peso": 6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104621 - DON GUSTO HUEVO TALLARINES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "320.08 ",
                "Cantidad": 2,
                "Peso": 6.12
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104622 - DON GUSTO HUEVO NIDOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "320.08 ",
                "Cantidad": 2,
                "Peso": 6.12
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104809 - DON GUSTO HUEVO MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,559.11 ",
                "Cantidad": 98,
                "Peso": 99.17600000000002
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104816 - DON GUSTO HUEVO CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,694.48 ",
                "Cantidad": 30,
                "Peso": 30.36
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104818 - DON GUSTO HUEVO CAPPELLETTIS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,205.64 ",
                "Cantidad": 39,
                "Peso": 39.467999999999996
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104821 - DON GUSTO HUEVO TALLARINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,575.44 ",
                "Cantidad": 62,
                "Peso": 62.93
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "104822 - DON GUSTO HUEVO NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,621.63 ",
                "Cantidad": 63,
                "Peso": 63.945
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -61.85 ",
                "Cantidad": -0.33,
                "Peso": -1.6137
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "106809 - FIDEOS PURITAS MOÑAS 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -15.00 ",
                "Cantidad": -0.08,
                "Peso": -0.3912
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -44.39 ",
                "Cantidad": -0.24,
                "Peso": -1.1736
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "106816 - FIDEOS PURITAS CORB 12X400 G PACK.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -74.98 ",
                "Cantidad": -0.4,
                "Peso": -1.956
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "106817 - FIDEOS PURI RIZZETO 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -74.98 ",
                "Cantidad": -0.4,
                "Peso": -1.956
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107508 - FIDEOS PURITAS DEDALES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -332.83 ",
                "Cantidad": -3,
                "Peso": -9.105
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -107.95 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107510 - FIDEOS PURITAS TIRABUZONES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -220.39 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107511 - FIDEOS PURITAS MOSTACHOLES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -332.83 ",
                "Cantidad": -3,
                "Peso": -9.105
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107512 - FIDEOS PURITAS CODOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -220.39 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107514 - FIDEOS PURITAS CODITOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -107.95 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107515 - FIDEOS PURITAS TROMPETINES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -220.39 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107517 - FIDEOS PURITAS RIZZETO 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -112.44 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "107524 - FIDEOS PURITAS ENTREFINOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -224.88 ",
                "Cantidad": -2,
                "Peso": -6.1
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108002 - GLUTINA HUEVO SEMILLAS 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -18.71 ",
                "Cantidad": -1,
                "Peso": -0.21
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108003 - GLUTINA HUEVO LETRITAS  1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -68.25 ",
                "Cantidad": -4,
                "Peso": -0.84
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108006 - GLUTINA HUEVO ARITOS 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -16.17 ",
                "Cantidad": -1,
                "Peso": -0.21
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108607 - FIDEOS PURITAS PAMPERITOS 1 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -39.90 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -112.38 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -116.49 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -343.36 ",
                "Cantidad": -9,
                "Peso": -9.108
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -151.69 ",
                "Cantidad": -4,
                "Peso": -4.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108612 - FIDEOS PURITAS CODOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -153.29 ",
                "Cantidad": -4,
                "Peso": -4.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -36.28 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -260.82 ",
                "Cantidad": -7,
                "Peso": -7.0840000000000005
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -155.97 ",
                "Cantidad": -4,
                "Peso": -4.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -72.56 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -36.28 ",
                "Cantidad": -1,
                "Peso": -1.03
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -37.80 ",
                "Cantidad": -1,
                "Peso": -1.03
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108701 - FIDEOS PURI CABELLO DE ANGEL 1x5 K",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -187.44 ",
                "Cantidad": -1,
                "Peso": -5.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108703 - FIDEOS PURITAS LETRITAS 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -179.96 ",
                "Cantidad": -1,
                "Peso": -5.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108707 - FIDEOS PURITAS PAMPERITOS 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -374.88 ",
                "Cantidad": -2,
                "Peso": -10.096
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108708 - FIDEOS PURITAS DEDALES 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -374.88 ",
                "Cantidad": -2,
                "Peso": -10.096
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108710 - FIDEOS PURITAS TIRABUZONES 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -929.72 ",
                "Cantidad": -5,
                "Peso": -25.240000000000002
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108711 - FIDEOS PURITAS MOSTACHOLES 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -187.44 ",
                "Cantidad": -1,
                "Peso": -5.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108716 - FIDEOS PURITAS CORBATAS 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -187.44 ",
                "Cantidad": -1,
                "Peso": -5.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108717 - FIDEOS PURITAS RIZZETO 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -359.92 ",
                "Cantidad": -2,
                "Peso": -10.096
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108722 - FIDEOS PURITAS NIDOS 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -367.40 ",
                "Cantidad": -2,
                "Peso": -10.1
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108724 - FIDEOS PURITAS ENTREFINOS 1 X 5 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -374.88 ",
                "Cantidad": -2,
                "Peso": -10.1
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "1089 - GLUTINA HUEVO 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108901 - GLUTINA HUEVO CAB DE ANGEL 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -25.83 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -127.81 ",
                "Cantidad": -5,
                "Peso": -2.54
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -151.23 ",
                "Cantidad": -6,
                "Peso": -3.048
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -439.12 ",
                "Cantidad": -17,
                "Peso": -8.636
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -281.05 ",
                "Cantidad": -11,
                "Peso": -5.588
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -585.13 ",
                "Cantidad": -23,
                "Peso": -11.684000000000001
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108913 - GLUTINA HUEVO ÑOQUIS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -52.34 ",
                "Cantidad": -2,
                "Peso": -1.016
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -224.18 ",
                "Cantidad": -9,
                "Peso": -4.572
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -361.81 ",
                "Cantidad": -14,
                "Peso": -7.112
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -1,048.08 ",
                "Cantidad": -41,
                "Peso": -20.828
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -278.99 ",
                "Cantidad": -11,
                "Peso": -5.588
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -101.93 ",
                "Cantidad": -4,
                "Peso": -2.04
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -99.18 ",
                "Cantidad": -4,
                "Peso": -2.04
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "34,556.01 ",
                "Cantidad": 100,
                "Peso": 1210
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2701 - OBLEA RELL. KROKYS LIMON 40 X 110 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -497.37 ",
                "Cantidad": -1.9900000000000002,
                "Peso": -9.8306
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2702 - OBLEA RELL. KROKYS CHOCO. 40X110 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -799.26 ",
                "Cantidad": -3.1820000000000004,
                "Peso": -15.719079999999998
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2703 - OBLEA RELL. KROKYS FRUTILLA 40 X 110 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -1,022.48 ",
                "Cantidad": -4.12,
                "Peso": -20.3528
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2723 - GALL. RELL. KROKYS D. DE LECHE 30X115 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -207.43 ",
                "Cantidad": -1.4,
                "Peso": -5.25
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2047 - PESTO PURITAS 24 X 25 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -14.89 ",
                "Cantidad": -0.02,
                "Peso": -0.2084
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -24.22 ",
                "Cantidad": -0.12,
                "Peso": -1.044
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "21,839.71 ",
                "Cantidad": 74.92,
                "Peso": 414.90696
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,710.66 ",
                "Cantidad": 6,
                "Peso": 32.7
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "178,691.74 ",
                "Cantidad": 1059.36,
                "Peso": 1733.11296
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2077 - PURE DE PAPAS PURITAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "20,846.05 ",
                "Cantidad": 212,
                "Peso": 216.24
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "57,408.33 ",
                "Cantidad": 123.85,
                "Peso": 1424.275
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,746.90 ",
                "Cantidad": 51,
                "Peso": 52.53
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "27,369.01 ",
                "Cantidad": 29.8,
                "Peso": 312.9
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "19,057.02 ",
                "Cantidad": 10.6,
                "Peso": 217.936
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -17.80 ",
                "Cantidad": -0.03,
                "Peso": -0.18378
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "879.08 ",
                "Cantidad": 1,
                "Peso": 10.46
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,396.51 ",
                "Cantidad": 0.7999999999999999,
                "Peso": 16.416
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2143 - YERBA COMP SERRANA ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,194.72 ",
                "Cantidad": 2,
                "Peso": 13.32
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,026.30 ",
                "Cantidad": 1.95,
                "Peso": 20.201999999999998
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,772.14 ",
                "Cantidad": 2.8,
                "Peso": 57.51199999999999
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "146,274.50 ",
                "Cantidad": 239.97,
                "Peso": 1598.2002
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2410 - ARROZ PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -146.25 ",
                "Cantidad": -0.48000000000000004,
                "Peso": -5.808
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2171 - PACK INTENSO 6X1 K + AZUCAR 6X1 K",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -234.72 ",
                "Cantidad": -0.32,
                "Peso": -3.92
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "17,607.75 ",
                "Cantidad": 49.92,
                "Peso": 245.6064
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "2311 - LENTEJON AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -1,245.10 ",
                "Cantidad": -6,
                "Peso": -18.12
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4002 - ACEIT C/ CAR DOYPACK 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,529.77 ",
                "Cantidad": 35.5,
                "Peso": 16.756
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4009 - ACEIT DESC DOYPACK 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "756.93 ",
                "Cantidad": 12,
                "Peso": 5.376
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4016 - ACEIT EN RODAJAS DOYPACK 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,523.62 ",
                "Cantidad": 46,
                "Peso": 21.528
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4046 - ACEIT RELL C/ MORR DOYPACK 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "814.85 ",
                "Cantidad": 12,
                "Peso": 5.664
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4051 - AJIES CAT ENTERO FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,027.50 ",
                "Cantidad": 18,
                "Peso": 8.459999999999999
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4055 - AJIES CAT TIR FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,010.76 ",
                "Cantidad": 18,
                "Peso": 9.899999999999999
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4056 - AJIES CAT TIR FCO 1X770 CC / 320 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "949.31 ",
                "Cantidad": 12,
                "Peso": 14.088
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4067 - MIXED PICKLES FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "353.58 ",
                "Cantidad": 6,
                "Peso": 3.228
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4068 - MIXED PICKLES FCO 1X770 CC / 420 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "527.65 ",
                "Cantidad": 6,
                "Peso": 7.308
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4075 - MORR FILET  VIN FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "515.56 ",
                "Cantidad": 6,
                "Peso": 3.36
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4076 - MORR FILET VIN FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4079 - MORR TIR VIN FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,746.73 ",
                "Cantidad": 21,
                "Peso": 11.718
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4080 - MORR TIR VIN FCO 1X770 CC / 400 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "687.64 ",
                "Cantidad": 6,
                "Peso": 7.368
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4083 - HONGOS EN VIN FCO 1X318 CC / 200G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "928.14 ",
                "Cantidad": 12,
                "Peso": 6.648
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4084 - HONGOS EN VIN FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "776.00 ",
                "Cantidad": 6,
                "Peso": 7.272
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4089 - HONGOS ESCAB FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "878.16 ",
                "Cantidad": 12,
                "Peso": 6.624
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4090 - HONGOS ESCAB FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,064.39 ",
                "Cantidad": 9,
                "Peso": 10.872
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4141 - HONGOS ESCAB SACH 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -507.89 ",
                "Cantidad": -12,
                "Peso": -5.364
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "11,423.55 ",
                "Cantidad": 1500,
                "Peso": 81.00000000000001
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,148.59 ",
                "Cantidad": 175,
                "Peso": 18.200000000000003
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,189.36 ",
                "Cantidad": 143,
                "Peso": 32.604000000000006
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4496 - MOSTAZA INGLESA SACHET 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,882.13 ",
                "Cantidad": 54,
                "Peso": 54.648
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4105 - PICANTINA SACHET 1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,124.77 ",
                "Cantidad": 150,
                "Peso": 8.100000000000001
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,491.50 ",
                "Cantidad": 66.5,
                "Peso": 15.427999999999997
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4500 - PICANTINA SACHET 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "736.40 ",
                "Cantidad": 21,
                "Peso": 21.462
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,961.80 ",
                "Cantidad": 90,
                "Peso": 43.38
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,396.88 ",
                "Cantidad": 72,
                "Peso": 33.552
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,388.81 ",
                "Cantidad": 72,
                "Peso": 34.704
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.4
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,371.95 ",
                "Cantidad": 42,
                "Peso": 20.286
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.4
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,000.72 ",
                "Cantidad": 30,
                "Peso": 14.399999999999999
            },
            {
                "Cliente": 2,
                "Direccion": "J. Belloni 4860 y Repetto",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "581.06 ",
                "Cantidad": 18,
                "Peso": 8.964
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,508.04 ",
                "Cantidad": 9.92,
                "Peso": 24.8
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,194.14 ",
                "Cantidad": 4.92,
                "Peso": 24.550800000000002
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "105 - AVENA PURITAS LAMINADA 12 X 800 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "398,586.75 ",
                "Cantidad": 1500,
                "Peso": 8250
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "233 - POLENTA AIDA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -450.18 ",
                "Cantidad": -3,
                "Peso": -14.7
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,675.19 ",
                "Cantidad": 33,
                "Peso": 165.66000000000003
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,875.50 ",
                "Cantidad": 5.17,
                "Peso": 62.47945
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,645.33 ",
                "Cantidad": 9.84,
                "Peso": 25.16088
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "452 - ACHOCOLATADO DINO KAO AIDA 12X200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,988.01 ",
                "Cantidad": 9.92,
                "Peso": 25.30592
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "613 - JUG NAR-BAN 2 LITROS 24X24 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -45.07 ",
                "Cantidad": -0.38,
                "Peso": -0.25156
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -17.79 ",
                "Cantidad": -0.15,
                "Peso": -0.0993
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "637 - JUGUITO ANANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -24.91 ",
                "Cantidad": -0.21,
                "Peso": -0.13902
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "638 - JUG FRUTAS TROP 2 LITROS 24X24 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -15.42 ",
                "Cantidad": -0.13,
                "Peso": -0.08606
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104809 - DON GUSTO HUEVO MOÑAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,860.55 ",
                "Cantidad": 82,
                "Peso": 82.98400000000001
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104816 - DON GUSTO HUEVO CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,860.55 ",
                "Cantidad": 82,
                "Peso": 82.98400000000001
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104818 - DON GUSTO HUEVO CAPPELLETTIS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,338.60 ",
                "Cantidad": 107,
                "Peso": 108.28399999999999
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104821 - DON GUSTO HUEVO TALLARINES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,395.45 ",
                "Cantidad": 108,
                "Peso": 109.62
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "104822 - DON GUSTO HUEVO NIDOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,281.76 ",
                "Cantidad": 106,
                "Peso": 107.59
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -14.40 ",
                "Cantidad": -0.08,
                "Peso": -0.3912
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "106810 - FIDEOS PURITAS TIRAB 12X400 GRS PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -28.79 ",
                "Cantidad": -0.16,
                "Peso": -0.7824
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -28.79 ",
                "Cantidad": -0.16,
                "Peso": -0.7824
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "106816 - FIDEOS PURITAS CORB 12X400 G PACK.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -14.40 ",
                "Cantidad": -0.08,
                "Peso": -0.3912
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107507 - FIDEOS PURITAS PAMPERITOS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -107.95 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107508 - FIDEOS PURITAS DEDALES 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -215.91 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -215.91 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107513 - FIDEOS PURITAS ÑOQUIS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -323.86 ",
                "Cantidad": -3,
                "Peso": -9.105
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107515 - FIDEOS PURITAS TROMPETINES 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -107.95 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -215.91 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "107517 - FIDEOS PURITAS RIZZETO 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -107.95 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108607 - FIDEOS PURITAS PAMPERITOS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -31.34 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108612 - FIDEOS PURITAS CODOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -31.34 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -62.68 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -94.03 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -31.34 ",
                "Cantidad": -1,
                "Peso": -1.03
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108901 - GLUTINA HUEVO CAB DE ANGEL 1X500 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -27.55 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "633.67 ",
                "Cantidad": 23,
                "Peso": 11.684000000000001
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,212.23 ",
                "Cantidad": 44,
                "Peso": 22.352
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,294.88 ",
                "Cantidad": 47,
                "Peso": 23.876
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,294.88 ",
                "Cantidad": 47,
                "Peso": 23.876
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,239.78 ",
                "Cantidad": 45,
                "Peso": 22.86
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,983.65 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,294.88 ",
                "Cantidad": 47,
                "Peso": 23.876
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,294.88 ",
                "Cantidad": 47,
                "Peso": 23.97
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,322.43 ",
                "Cantidad": 48,
                "Peso": 24.48
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "369,668.10 ",
                "Cantidad": 1170,
                "Peso": 14157
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -8.97 ",
                "Cantidad": -0.04,
                "Peso": -0.348
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,143.80 ",
                "Cantidad": 3.84,
                "Peso": 21.26592
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,373.64 ",
                "Cantidad": 3,
                "Peso": 16.35
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -67.47 ",
                "Cantidad": -0.4,
                "Peso": -0.6544
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,035.20 ",
                "Cantidad": 6.84,
                "Peso": 78.66
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,837.75 ",
                "Cantidad": 3,
                "Peso": 31.5
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,672.15 ",
                "Cantidad": 0.9,
                "Peso": 18.503999999999998
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -5.85 ",
                "Cantidad": -0.01,
                "Peso": -0.06126
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "879.08 ",
                "Cantidad": 1,
                "Peso": 10.46
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,170.58 ",
                "Cantidad": 3,
                "Peso": 61.56
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,243.40 ",
                "Cantidad": 3,
                "Peso": 31.08
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,228.30 ",
                "Cantidad": 2,
                "Peso": 41.08
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2410 - ARROZ PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -245.42 ",
                "Cantidad": -0.9099999999999999,
                "Peso": -11.011
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2310 - LENTEJON PURITAS 24 X 200 GR",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -49.53 ",
                "Cantidad": -0.13,
                "Peso": -0.65507
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "2314 - LENTEJON PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -125.40 ",
                "Cantidad": -0.33,
                "Peso": -4.0161
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4555 - AJIES CAT ENTERO POTE 500 CC 1X150 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "362.10 ",
                "Cantidad": 12,
                "Peso": 4.404
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4145 - MIXED PICKL POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "487.78 ",
                "Cantidad": 12,
                "Peso": 5.232
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4146 - MORR TIR VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "798.88 ",
                "Cantidad": 12,
                "Peso": 5.412
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4143 - HONGOS EN VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "733.76 ",
                "Cantidad": 12,
                "Peso": 5.22
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4144 - HONGOS ESCAB POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "664.46 ",
                "Cantidad": 12,
                "Peso": 5.328
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "548.00 ",
                "Cantidad": 24,
                "Peso": 5.472
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4496 - MOSTAZA INGLESA SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "641.54 ",
                "Cantidad": 18,
                "Peso": 18.216
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "276.15 ",
                "Cantidad": 12,
                "Peso": 2.784
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4500 - PICANTINA SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "657.51 ",
                "Cantidad": 18,
                "Peso": 18.396
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.592
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.796
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 3,
                "Direccion": "L. B. Berres 6645 y Tomkinson",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.976
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "463.90 ",
                "Cantidad": 1.76,
                "Peso": 4.4
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "862.02 ",
                "Cantidad": 1.92,
                "Peso": 9.5808
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,128.81 ",
                "Cantidad": 22,
                "Peso": 66.44
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107 - SALVADO DE AVENA 12 x 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -310.07 ",
                "Cantidad": -0.37,
                "Peso": -2.2569999999999997
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -101.23 ",
                "Cantidad": -0.49,
                "Peso": -2.6950000000000003
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "233 - POLENTA AIDA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -10.80 ",
                "Cantidad": -0.08,
                "Peso": -0.392
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "250 - MAZAMORRA COLORADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "347.34 ",
                "Cantidad": 1,
                "Peso": 4.97
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "254 - HARINA DE MAIZ BIOS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -93.98 ",
                "Cantidad": -0.48000000000000004,
                "Peso": -2.688
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -161.02 ",
                "Cantidad": -0.21,
                "Peso": -1.134
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "245 - MAZAMORRA BLANCA 12 X 400 GR.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "444 - COCOA PURITAS 1 X 2.50 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "82,120.00 ",
                "Cantidad": 400,
                "Peso": 1012
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "26,788.10 ",
                "Cantidad": 99.71,
                "Peso": 254.95846999999998
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "450 - ACHOCOLATADO DINO KAO AIDA 1 X 2 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -142.98 ",
                "Cantidad": -1,
                "Peso": -2.018
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "451 - ACHOCOL.  DINO KAO AIDA 12 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -208.55 ",
                "Cantidad": -0.53,
                "Peso": -3.24625
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "21.21 ",
                "Cantidad": -0.1499999999999999,
                "Peso": -0.4649999999999994
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "466.63 ",
                "Cantidad": 0.88,
                "Peso": 2.772
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "610 - JUGUITO MULTIFRUTA 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -375.56 ",
                "Cantidad": -3.04,
                "Peso": -2.01248
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "634 - JUGUITO MANZANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -4.94 ",
                "Cantidad": -0.04,
                "Peso": -0.02648
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -422.51 ",
                "Cantidad": -3.42,
                "Peso": -2.26404
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "637 - JUGUITO ANANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -9.88 ",
                "Cantidad": -0.08,
                "Peso": -0.05296
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -72.88 ",
                "Cantidad": -0.12,
                "Peso": -1.1748
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -836.71 ",
                "Cantidad": -1.6600000000000001,
                "Peso": -20.666999999999998
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1015 - BUONAPASTA HUEVO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "8,702.48 ",
                "Cantidad": 480,
                "Peso": 196.8
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "101509 - BUONAPASTA HUEVO MOÑAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -32.58 ",
                "Cantidad": -2,
                "Peso": -0.814
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104309 - DON GUSTO HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -28.92 ",
                "Cantidad": -1,
                "Peso": -0.507
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104316 - DON GUSTO HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -86.77 ",
                "Cantidad": -3,
                "Peso": -1.521
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104322 - DON GUSTO HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -28.92 ",
                "Cantidad": -1,
                "Peso": -0.515
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1045 - DON GUSTO HUEVO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "23,129.71 ",
                "Cantidad": 1200,
                "Peso": 492
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1046 - DON GUSTO HUEVO 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "27,366.53 ",
                "Cantidad": 190,
                "Peso": 579.5
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104609 - DON GUSTO HUEVO MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,600.38 ",
                "Cantidad": 10,
                "Peso": 30.35
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104616 - DON GUSTO HUEVO CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,420.38 ",
                "Cantidad": 9,
                "Peso": 27.315
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104618 - DON GUSTO HUEVO CAPPELLETTIS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,456.39 ",
                "Cantidad": 9,
                "Peso": 27.315
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104621 - DON GUSTO HUEVO TALLARINES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,936.51 ",
                "Cantidad": 12,
                "Peso": 36.72
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104622 - DON GUSTO HUEVO NIDOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,456.39 ",
                "Cantidad": 9,
                "Peso": 27.540000000000003
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1048 - DON GUSTO HUEVO 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "18,420.01 ",
                "Cantidad": 360,
                "Peso": 367.2
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104809 - DON GUSTO HUEVO MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,361.27 ",
                "Cantidad": 39,
                "Peso": 39.467999999999996
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104816 - DON GUSTO HUEVO CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,446.05 ",
                "Cantidad": 58,
                "Peso": 58.696
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104818 - DON GUSTO HUEVO CAPPELLETTIS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,109.65 ",
                "Cantidad": 53,
                "Peso": 53.636
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104821 - DON GUSTO HUEVO TALLARINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,144.66 ",
                "Cantidad": 54,
                "Peso": 54.809999999999995
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "104822 - DON GUSTO HUEVO NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,152.73 ",
                "Cantidad": 54,
                "Peso": 54.809999999999995
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "198,684.50 ",
                "Cantidad": 1060,
                "Peso": 5183.4
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -37.55 ",
                "Cantidad": -0.24,
                "Peso": -1.1736
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106809 - FIDEOS PURITAS MOÑAS 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -115.56 ",
                "Cantidad": -0.73,
                "Peso": -3.5697
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106810 - FIDEOS PURITAS TIRAB 12X400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -474.16 ",
                "Cantidad": -2.97,
                "Peso": -14.5233
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -1,003.94 ",
                "Cantidad": -6.250000000000001,
                "Peso": -30.5625
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106816 - FIDEOS PURITAS CORB 12X400 G PACK.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -528.46 ",
                "Cantidad": -3.2800000000000007,
                "Peso": -16.039199999999997
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "106817 - FIDEOS PURI RIZZETO 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -156.04 ",
                "Cantidad": -0.9799999999999999,
                "Peso": -4.792199999999999
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -102.52 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107510 - FIDEOS PURITAS TIRABUZONES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -102.52 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107511 - FIDEOS PURITAS MOSTACHOLES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -291.39 ",
                "Cantidad": -3,
                "Peso": -9.105
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107515 - FIDEOS PURITAS TROMPETINES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -404.70 ",
                "Cantidad": -4,
                "Peso": -12.14
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -291.39 ",
                "Cantidad": -3,
                "Peso": -9.105
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107522 - FIDEOS PURITAS NIDOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -97.13 ",
                "Cantidad": -1,
                "Peso": -3.05
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "107524 - FIDEOS PURITAS ENTREFINOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -97.13 ",
                "Cantidad": -1,
                "Peso": -3.05
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "304,775.51 ",
                "Cantidad": 8400,
                "Peso": 0
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -65.30 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -219.76 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -65.30 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -23.38 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -24.79 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -72.96 ",
                "Cantidad": -3,
                "Peso": -1.524
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "44,575.99 ",
                "Cantidad": 146.02,
                "Peso": 1766.8419999999999
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "10,457.25 ",
                "Cantidad": 8.98,
                "Peso": 93.5716
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "10,782.84 ",
                "Cantidad": 9.82,
                "Peso": 102.9136
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "649.31 ",
                "Cantidad": 2.75,
                "Peso": 23.925
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "244.37 ",
                "Cantidad": 0.84,
                "Peso": 4.6519200000000005
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "439.57 ",
                "Cantidad": 1,
                "Peso": 5.45
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2077 - PURE DE PAPAS PURITAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "11,625.99 ",
                "Cantidad": 120,
                "Peso": 122.4
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "28,878.71 ",
                "Cantidad": 64.76,
                "Peso": 744.74
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,726.29 ",
                "Cantidad": 1.9,
                "Peso": 19.95
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -1,066.22 ",
                "Cantidad": -0.6,
                "Peso": -12.336000000000004
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "791.17 ",
                "Cantidad": 0.9,
                "Peso": 9.414000000000001
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,637.35 ",
                "Cantidad": 0.95,
                "Peso": 19.494
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,021.66 ",
                "Cantidad": 1.95,
                "Peso": 20.201999999999998
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "926.92 ",
                "Cantidad": 0.44999999999999996,
                "Peso": 9.243
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2410 - ARROZ PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "139,877.00 ",
                "Cantidad": 497.65,
                "Peso": 6021.565
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2050 - CHOCLO AIDA 24 X 300 grs",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -15.16 ",
                "Cantidad": -0.04,
                "Peso": -0.348
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -80.80 ",
                "Cantidad": -0.32,
                "Peso": -1.5744
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "2314 - LENTEJON PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "84,297.44 ",
                "Cantidad": 99.43,
                "Peso": 1210.0631
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4137 - MORR TIR VIN SACH 1 X 200 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -47.51 ",
                "Cantidad": -1,
                "Peso": -0.441
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4500 - PICANTINA SACHET 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "386.02 ",
                "Cantidad": 11,
                "Peso": 11.241999999999999
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,178.25 ",
                "Cantidad": 36,
                "Peso": 17.352
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.184
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 4,
                "Direccion": "Camino Maldonado 6783 Bis.",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.952
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,782.69 ",
                "Cantidad": 4,
                "Peso": 19.96
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,729.00 ",
                "Cantidad": 10,
                "Peso": 30.2
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "610 - JUGUITO MULTIFRUTA 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "611 - JUGUITO NARANJA 2 LITROS  24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "613 - JUG NAR-BAN 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "632 - JUGUITO ANANA MELON 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "633 - JUG NARANJA-MANGO 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "634 - JUGUITO MANZANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "636 - JUGUITO PERA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "637 - JUGUITO ANANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "638 - JUG FRUTAS TROP 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "104516 - DON GUSTO HUEVO CORBATAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "513.95 ",
                "Cantidad": 24,
                "Peso": 9.744
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "104521 - DON GUSTO HUEVO TALLARINES 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "256.97 ",
                "Cantidad": 12,
                "Peso": 4.896
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "1075 - FIDEOS PURITAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "95,748.21 ",
                "Cantidad": 2400,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "1089 - GLUTINA HUEVO 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,443.71 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,066.23 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.48
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2027 - ALMIDON DE MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "633.84 ",
                "Cantidad": 5,
                "Peso": 25.17
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "20,206.65 ",
                "Cantidad": 115,
                "Peso": 188.14
            },
            {
                "Cliente": 5,
                "Direccion": "José Belloni 4230 y Tte. Galeano",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "945.92 ",
                "Cantidad": 1,
                "Peso": 10.5
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,007.58 ",
                "Cantidad": 11.92,
                "Peso": 29.8
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,193.96 ",
                "Cantidad": 11.92,
                "Peso": 59.4808
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "107 - SALVADO DE AVENA 12 x 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "977.90 ",
                "Cantidad": 1,
                "Peso": 6.1
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "19,462.51 ",
                "Cantidad": 74.84,
                "Peso": 411.62
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "233 - POLENTA AIDA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,446.90 ",
                "Cantidad": 19.84,
                "Peso": 97.216
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "250 - MAZAMORRA COLORADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "361.82 ",
                "Cantidad": 1,
                "Peso": 4.97
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "245 - MAZAMORRA BLANCA 12 X 400 GR.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,176.91 ",
                "Cantidad": 4.35,
                "Peso": 11.12295
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "450 - ACHOCOLATADO DINO KAO AIDA 1 X 2 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,921.65 ",
                "Cantidad": 14,
                "Peso": 28.252
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "451 - ACHOCOL.  DINO KAO AIDA 12 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,593.66 ",
                "Cantidad": 5.84,
                "Peso": 35.769999999999996
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "419.09 ",
                "Cantidad": 1,
                "Peso": 3.1
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -17.96 ",
                "Cantidad": -0.04,
                "Peso": -0.126
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -16.47 ",
                "Cantidad": -0.12,
                "Peso": -0.07944
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,600.31 ",
                "Cantidad": 6,
                "Peso": 58.739999999999995
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,004.21 ",
                "Cantidad": 10,
                "Peso": 124.5
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101507 - BUONAPASTA HUEVO PAMPERITOS 1X400 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -32.63 ",
                "Cantidad": -2,
                "Peso": -0.814
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101508 - BUONAPASTA HUEVO DEDALES 1 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -31.33 ",
                "Cantidad": -2,
                "Peso": -0.814
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101509 - BUONAPASTA HUEVO MOÑAS 1 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -47.65 ",
                "Cantidad": -3,
                "Peso": -1.2209999999999999
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101510 - BUONAPASTA HUEVO TIRABUZONES 1X400 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -81.58 ",
                "Cantidad": -5,
                "Peso": -2.0349999999999997
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101511 - BUONAPASTA HUEVO MOSTACHOL1X400 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -210.14 ",
                "Cantidad": -13,
                "Peso": -5.2909999999999995
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101516 - BUONAPASTA HUEVO CORBATAS 1 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -127.26 ",
                "Cantidad": -8,
                "Peso": -3.256
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "101517 - BUONAPASTA HUEVO RIZZETO 1 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -209.49 ",
                "Cantidad": -13,
                "Peso": -5.291
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104809 - DON GUSTO HUEVO MOÑAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,175.12 ",
                "Cantidad": 36.5,
                "Peso": 36.938
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104816 - DON GUSTO HUEVO CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,644.99 ",
                "Cantidad": 115,
                "Peso": 116.38000000000001
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104818 - DON GUSTO HUEVO CAPPELLETTIS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,102.47 ",
                "Cantidad": 71,
                "Peso": 71.85199999999999
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104821 - DON GUSTO HUEVO TALLARINES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,261.71 ",
                "Cantidad": 91,
                "Peso": 92.365
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "104822 - DON GUSTO HUEVO NIDOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,754.13 ",
                "Cantidad": 99,
                "Peso": 100.485
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -113.12 ",
                "Cantidad": -0.6599999999999999,
                "Peso": -3.2274
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106809 - FIDEOS PURITAS MOÑAS 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -27.99 ",
                "Cantidad": -0.16,
                "Peso": -0.7824
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106810 - FIDEOS PURITAS TIRAB 12X400 GRS PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -67.04 ",
                "Cantidad": -0.4,
                "Peso": -1.956
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -142.13 ",
                "Cantidad": -0.8200000000000001,
                "Peso": -4.0098
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106816 - FIDEOS PURITAS CORB 12X400 G PACK.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -99.39 ",
                "Cantidad": -0.5800000000000001,
                "Peso": -2.8362
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "106817 - FIDEOS PURI RIZZETO 12x400 G PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -127.96 ",
                "Cantidad": -0.75,
                "Peso": -3.6674999999999995
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "1075 - FIDEOS PURITAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108607 - FIDEOS PURITAS PAMPERITOS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -69.11 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -106.54 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -68.65 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -237.61 ",
                "Cantidad": -7,
                "Peso": -7.084
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -32.65 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -70.55 ",
                "Cantidad": -2,
                "Peso": -2.024
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -34.55 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -103.66 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -170.85 ",
                "Cantidad": -5,
                "Peso": -5.0600000000000005
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -168.50 ",
                "Cantidad": -5,
                "Peso": -5.15
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -101.75 ",
                "Cantidad": -3,
                "Peso": -3.09
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108905 - GLUTINA HUEVO CUCUZU 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,321.26 ",
                "Cantidad": 47,
                "Peso": 23.876
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -28.70 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,300.38 ",
                "Cantidad": 46,
                "Peso": 23.368000000000002
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,011.15 ",
                "Cantidad": 71,
                "Peso": 36.068
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "553.07 ",
                "Cantidad": 19,
                "Peso": 9.652000000000001
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108912 - GLUTINA HUEVO CODOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -24.79 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "554.24 ",
                "Cantidad": 20,
                "Peso": 10.16
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "492.91 ",
                "Cantidad": 17,
                "Peso": 8.636
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,478.83 ",
                "Cantidad": 88,
                "Peso": 44.704
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "631.34 ",
                "Cantidad": 22,
                "Peso": 11.22
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,321.26 ",
                "Cantidad": 47,
                "Peso": 23.97
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -419.04 ",
                "Cantidad": -1.4100000000000001,
                "Peso": -17.061
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -69.51 ",
                "Cantidad": -0.06,
                "Peso": -0.6252
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,020.86 ",
                "Cantidad": 12.92,
                "Peso": 112.404
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,690.96 ",
                "Cantidad": 5.84,
                "Peso": 32.34192
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,337.02 ",
                "Cantidad": 3,
                "Peso": 16.35
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "31,600.81 ",
                "Cantidad": 184.84,
                "Peso": 302.39824
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -23.40 ",
                "Cantidad": -0.08,
                "Peso": -0.92
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,669.72 ",
                "Cantidad": 33,
                "Peso": 33.989999999999995
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,698.64 ",
                "Cantidad": 3.95,
                "Peso": 41.475
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,355.61 ",
                "Cantidad": 1.85,
                "Peso": 38.036
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,566.88 ",
                "Cantidad": 3,
                "Peso": 31.380000000000003
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,784.87 ",
                "Cantidad": 2.85,
                "Peso": 58.482
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -101.48 ",
                "Cantidad": -0.05,
                "Peso": -1.027
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,821.76 ",
                "Cantidad": 8,
                "Peso": 39.36
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "2311 - LENTEJON AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,472.20 ",
                "Cantidad": 22,
                "Peso": 66.44
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4002 - ACEIT C/ CAR DOYPACK 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "979.27 ",
                "Cantidad": 23,
                "Peso": 10.856
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4009 - ACEIT DESC DOYPACK 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,302.33 ",
                "Cantidad": 36,
                "Peso": 16.128
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4016 - ACEIT EN RODAJAS DOYPACK 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,950.76 ",
                "Cantidad": 35,
                "Peso": 16.38
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4051 - AJIES CAT ENTERO FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "666.48 ",
                "Cantidad": 12,
                "Peso": 5.64
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4555 - AJIES CAT ENTERO POTE 500 CC 1X150 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,231.13 ",
                "Cantidad": 42,
                "Peso": 15.414
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4055 - AJIES CAT TIR FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "336.92 ",
                "Cantidad": 6,
                "Peso": 3.3
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4139 - MIXED PICKLES DOYPACK 1 x 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "751.17 ",
                "Cantidad": 23,
                "Peso": 10.557
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4145 - MIXED PICKL POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "956.05 ",
                "Cantidad": 24,
                "Peso": 10.464
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4081 - MORRON TIRITA VINAGRE SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -156.46 ",
                "Cantidad": -1,
                "Peso": -2.046
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4137 - MORR TIR VIN SACH 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,747.99 ",
                "Cantidad": 36,
                "Peso": 15.876
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4146 - MORR TIR VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,504.93 ",
                "Cantidad": 23,
                "Peso": 10.373000000000001
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4083 - HONGOS EN VIN FCO 1X318 CC / 200G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "464.07 ",
                "Cantidad": 6,
                "Peso": 3.324
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4143 - HONGOS EN VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,438.17 ",
                "Cantidad": 24,
                "Peso": 10.44
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4089 - HONGOS ESCAB FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "430.12 ",
                "Cantidad": 6,
                "Peso": 3.312
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4141 - HONGOS ESCAB SACH 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "995.47 ",
                "Cantidad": 24,
                "Peso": 10.728
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4144 - HONGOS ESCAB POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,226.40 ",
                "Cantidad": 22.5,
                "Peso": 9.99
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,133.05 ",
                "Cantidad": 150,
                "Peso": 8.100000000000001
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "922.63 ",
                "Cantidad": 75,
                "Peso": 7.800000000000001
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-$ -9.66 ",
                "Cantidad": -0.5,
                "Peso": -0.114
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4099 - MOSTAZA INGLESA BOTELLA 1 X 460 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,014.24 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4496 - MOSTAZA INGLESA SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "829.73 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "984.57 ",
                "Cantidad": 30,
                "Peso": 14.459999999999999
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.184
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,178.25 ",
                "Cantidad": 36,
                "Peso": 17.352
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.592
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "597.20 ",
                "Cantidad": 18,
                "Peso": 8.64
            },
            {
                "Cliente": 6,
                "Direccion": "Veraguas 1907 y Av. Lezica",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "582.56 ",
                "Cantidad": 17.5,
                "Peso": 8.715
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,549.32 ",
                "Cantidad": 14,
                "Peso": 35
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,686.79 ",
                "Cantidad": 13,
                "Peso": 64.87
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "250 - MAZAMORRA COLORADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "361.82 ",
                "Cantidad": 1,
                "Peso": 4.97
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "254 - HARINA DE MAIZ BIOS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,464.16 ",
                "Cantidad": 7,
                "Peso": 39.2
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "852.11 ",
                "Cantidad": 1,
                "Peso": 5.4
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "366 - COPOS DE MAIZ AZUCARADOS 20 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,873.78 ",
                "Cantidad": 6,
                "Peso": 26.67
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "361 - COPOS DE MAIZ NATURALES 20 X 150 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "484.72 ",
                "Cantidad": 1,
                "Peso": 3.15
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "28,424.23 ",
                "Cantidad": 110,
                "Peso": 281.27
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,609.32 ",
                "Cantidad": 4,
                "Peso": 12.4
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "613 - JUG NAR-BAN 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "738.23 ",
                "Cantidad": 1,
                "Peso": 9.79
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,627.03 ",
                "Cantidad": 6,
                "Peso": 74.69999999999999
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "750 - HARINA 00 AIDA 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,159.27 ",
                "Cantidad": 3,
                "Peso": 36.645
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101508 - BUONAPASTA HUEVO DEDALES 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101510 - BUONAPASTA HUEVO TIRABUZONES 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101511 - BUONAPASTA HUEVO MOSTACHOL1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101515 - BUONAPASTA HUEVO TROMPETIN 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101516 - BUONAPASTA HUEVO CORBATAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101517 - BUONAPASTA HUEVO RIZZETO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "101522 - BUONAPASTA HUEVO NIDOS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102109 - DON GUSTO ESPINACA MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,703.68 ",
                "Cantidad": 48,
                "Peso": 24.336
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102116 - DON GUSTO ESPINACA CORBATAS 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,668.88 ",
                "Cantidad": 48,
                "Peso": 24.336
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102118 - DON GUSTO ESPINACA CAPPEL 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "869.24 ",
                "Cantidad": 24,
                "Peso": 12.168
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102121 - DON GUSTO ESPINACA TALLARIN 1x500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,703.68 ",
                "Cantidad": 48,
                "Peso": 24.72
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "102122 - DON GUSTO ESPINACA NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "834.44 ",
                "Cantidad": 24,
                "Peso": 12.36
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104309 - DON GUSTO HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104316 - DON GUSTO HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104318 - DON GUSTO HUEVO CAPPELLETTIS 1x500G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104321 - DON GUSTO HUEVO TALLARINES 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "104322 - DON GUSTO HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "1075 - FIDEOS PURITAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107508 - FIDEOS PURITAS DEDALES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107510 - FIDEOS PURITAS TIRABUZONES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107511 - FIDEOS PURITAS MOSTACHOLES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107517 - FIDEOS PURITAS RIZZETO 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "107524 - FIDEOS PURITAS ENTREFINOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108612 - FIDEOS PURITAS CODOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108613 - FIDEOS PURITAS ÑOQUIS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108912 - GLUTINA HUEVO CODOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "15,165.32 ",
                "Cantidad": 50,
                "Peso": 605
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,902.32 ",
                "Cantidad": 10,
                "Peso": 55.38000000000001
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "10,366.89 ",
                "Cantidad": 60,
                "Peso": 98.16
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,206.70 ",
                "Cantidad": 5,
                "Peso": 57.5
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,343.25 ",
                "Cantidad": 12,
                "Peso": 12.36
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,616.39 ",
                "Cantidad": 5,
                "Peso": 52.5
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,551.89 ",
                "Cantidad": 2,
                "Peso": 41.12
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "585.17 ",
                "Cantidad": 1,
                "Peso": 6.126
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,602.06 ",
                "Cantidad": 3,
                "Peso": 31.380000000000003
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,075.72 ",
                "Cantidad": 2,
                "Peso": 20.72
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "8,287.36 ",
                "Cantidad": 4,
                "Peso": 82.16
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "585.17 ",
                "Cantidad": 1,
                "Peso": 6.66
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2410 - ARROZ PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,996.86 ",
                "Cantidad": 14,
                "Peso": 68.88
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "2314 - LENTEJON PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4051 - AJIES CAT ENTERO FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "694.26 ",
                "Cantidad": 12,
                "Peso": 5.64
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4052 - AJIES CAT ENTERO FCO 1X770 CC / 320 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "481.31 ",
                "Cantidad": 6,
                "Peso": 6.432
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4067 - MIXED PICKLES FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "368.32 ",
                "Cantidad": 6,
                "Peso": 3.228
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4068 - MIXED PICKLES FCO 1X770 CC / 420 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "538.41 ",
                "Cantidad": 6,
                "Peso": 7.308
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4079 - MORR TIR VIN FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "507.77 ",
                "Cantidad": 6,
                "Peso": 3.348
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4083 - HONGOS EN VIN FCO 1X318 CC / 200G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "483.41 ",
                "Cantidad": 6,
                "Peso": 3.324
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4084 - HONGOS EN VIN FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,584.33 ",
                "Cantidad": 12,
                "Peso": 14.544
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4089 - HONGOS ESCAB FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "448.04 ",
                "Cantidad": 6,
                "Peso": 3.312
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4090 - HONGOS ESCAB FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,428.91 ",
                "Cantidad": 12,
                "Peso": 14.496
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "303.33 ",
                "Cantidad": 25,
                "Peso": 2.6
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "537.04 ",
                "Cantidad": 24,
                "Peso": 5.472
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4099 - MOSTAZA INGLESA BOTELLA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "517.47 ",
                "Cantidad": 12,
                "Peso": 6.096
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4496 - MOSTAZA INGLESA SACHET 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "419.14 ",
                "Cantidad": 12,
                "Peso": 12.144
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4105 - PICANTINA SACHET 1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "541.26 ",
                "Cantidad": 24,
                "Peso": 5.568
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4108 - PICANTINA BOTELLA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "521.78 ",
                "Cantidad": 12,
                "Peso": 6.06
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4500 - PICANTINA SACHET 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "219.17 ",
                "Cantidad": 6,
                "Peso": 6.132
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.184
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "790.88 ",
                "Cantidad": 24,
                "Peso": 11.568
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.796
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 7,
                "Direccion": "José Belloni 6389 e Instrucciones",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.976
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,279.41 ",
                "Cantidad": 5,
                "Peso": 12.5
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,228.36 ",
                "Cantidad": 5,
                "Peso": 24.950000000000003
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,890.89 ",
                "Cantidad": 17,
                "Peso": 51.34
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,932.73 ",
                "Cantidad": 15,
                "Peso": 82.5
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,992.93 ",
                "Cantidad": 36,
                "Peso": 180.71999999999997
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "715.41 ",
                "Cantidad": 2,
                "Peso": 24.17
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "821.42 ",
                "Cantidad": 2,
                "Peso": 6.2
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "1087 - FIDEOS PURITAS X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108903 - GLUTINA HUEVO LETRITAS  1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108905 - GLUTINA HUEVO CUCUZU 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,077.39 ",
                "Cantidad": 144,
                "Peso": 73.152
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,699.91 ",
                "Cantidad": 96,
                "Peso": 48.768
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108912 - GLUTINA HUEVO CODOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108913 - GLUTINA HUEVO ÑOQUIS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,038.70 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "17,632.02 ",
                "Cantidad": 624,
                "Peso": 316.992
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,038.70 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,349.96 ",
                "Cantidad": 48,
                "Peso": 24.48
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,011.17 ",
                "Cantidad": 72,
                "Peso": 36.72
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,890.43 ",
                "Cantidad": 10,
                "Peso": 55.38000000000001
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2027 - ALMIDON DE MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,838.80 ",
                "Cantidad": 50,
                "Peso": 251.70000000000002
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "42,416.39 ",
                "Cantidad": 245,
                "Peso": 400.82
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,762.29 ",
                "Cantidad": 3,
                "Peso": 31.5
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "11,947.22 ",
                "Cantidad": 20,
                "Peso": 122.52
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4054 - AJIES CAT ENTERO SACH 1X1 K",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "393.93 ",
                "Cantidad": 4,
                "Peso": 7.648
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4069 - MIXED PICKLES SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "892.41 ",
                "Cantidad": 8,
                "Peso": 16.08
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4081 - MORRON TIRITA VINAGRE SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,367.86 ",
                "Cantidad": 20,
                "Peso": 40.92
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4091 - HONGOS EN ESCABECHE SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "700.96 ",
                "Cantidad": 4,
                "Peso": 8.416
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4496 - MOSTAZA INGLESA SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "615.88 ",
                "Cantidad": 18,
                "Peso": 18.216
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.592
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.796
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4117 - ADEREZO AJIES 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.7
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 8,
                "Direccion": "Cno.Cibils y Cno.Las Tropas",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.976
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,765.98 ",
                "Cantidad": 15,
                "Peso": 37.5
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,184.18 ",
                "Cantidad": 25,
                "Peso": 75.5
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "93,003.58 ",
                "Cantidad": 350,
                "Peso": 1925
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,780.16 ",
                "Cantidad": 20,
                "Peso": 100.4
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "366 - COPOS DE MAIZ AZUCARADOS 20 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,510.57 ",
                "Cantidad": 7,
                "Peso": 31.115000000000002
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "52,364.48 ",
                "Cantidad": 45,
                "Peso": 468.9
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "60,031.62 ",
                "Cantidad": 55,
                "Peso": 576.4
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,980.05 ",
                "Cantidad": 400,
                "Peso": 21.6
            },
            {
                "Cliente": 9,
                "Direccion": "José Belloni 5382-86 y C.A.Lopez",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,579.85 ",
                "Cantidad": 125,
                "Peso": 13
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "452 - ACHOCOLATADO DINO KAO AIDA 12X200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "107510 - FIDEOS PURITAS TIRABUZONES 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "107511 - FIDEOS PURITAS MOSTACHOLES 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4555 - AJIES CAT ENTERO POTE 500 CC 1X150 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4145 - MIXED PICKL POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4146 - MORR TIR VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4143 - HONGOS EN VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4144 - HONGOS ESCAB POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 10,
                "Direccion": "Luis B.Berres 6608 y Tomkinson",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "990.50 ",
                "Cantidad": 4,
                "Peso": 10
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,567.08 ",
                "Cantidad": 6,
                "Peso": 29.94
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "105 - AVENA PURITAS LAMINADA 12 X 800 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "11,826.36 ",
                "Cantidad": 70,
                "Peso": 211.39999999999998
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "107 - SALVADO DE AVENA 12 x 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "250 - MAZAMORRA COLORADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "709.16 ",
                "Cantidad": 2,
                "Peso": 9.94
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,808.52 ",
                "Cantidad": 20,
                "Peso": 100.4
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "245 - MAZAMORRA BLANCA 12 X 400 GR.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "736.49 ",
                "Cantidad": 1,
                "Peso": 4.97
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,579.14 ",
                "Cantidad": 10,
                "Peso": 25.57
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "804.66 ",
                "Cantidad": 2,
                "Peso": 6.2
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "746.00 ",
                "Cantidad": 1,
                "Peso": 9.79
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104609 - DON GUSTO HUEVO MOÑAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,600.38 ",
                "Cantidad": 10,
                "Peso": 30.35
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104616 - DON GUSTO HUEVO CORBATAS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,600.38 ",
                "Cantidad": 10,
                "Peso": 30.35
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104618 - DON GUSTO HUEVO CAPPELLETTIS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,600.38 ",
                "Cantidad": 10,
                "Peso": 30.35
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104621 - DON GUSTO HUEVO TALLARINES 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,240.53 ",
                "Cantidad": 14,
                "Peso": 42.84
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104622 - DON GUSTO HUEVO NIDOS 1 X 3 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,240.53 ",
                "Cantidad": 14,
                "Peso": 42.84
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104809 - DON GUSTO HUEVO MOÑAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104816 - DON GUSTO HUEVO CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,410.79 ",
                "Cantidad": 60,
                "Peso": 60.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104818 - DON GUSTO HUEVO CAPPELLETTIS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,917.35 ",
                "Cantidad": 84,
                "Peso": 85.008
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104821 - DON GUSTO HUEVO TALLARINES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,785.53 ",
                "Cantidad": 48,
                "Peso": 48.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "104822 - DON GUSTO HUEVO NIDOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,785.53 ",
                "Cantidad": 48,
                "Peso": 48.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "1086 - FIDEOS PURITAS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "181,559.13 ",
                "Cantidad": 5004,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108607 - FIDEOS PURITAS PAMPERITOS 1 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,007.83 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,007.83 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,015.66 ",
                "Cantidad": 48,
                "Peso": 48.576
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,519.57 ",
                "Cantidad": 60,
                "Peso": 60.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,511.74 ",
                "Cantidad": 36,
                "Peso": 36.432
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,007.83 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,511.74 ",
                "Cantidad": 36,
                "Peso": 36.432
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,519.57 ",
                "Cantidad": 60,
                "Peso": 60.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,007.83 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "755.87 ",
                "Cantidad": 18,
                "Peso": 18.54
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "755.87 ",
                "Cantidad": 18,
                "Peso": 18.54
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,306.08 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,306.08 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "23,657.90 ",
                "Cantidad": 78,
                "Peso": 943.8
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,336.84 ",
                "Cantidad": 10,
                "Peso": 87
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "570.95 ",
                "Cantidad": 2,
                "Peso": 11.076
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2027 - ALMIDON DE MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,696.60 ",
                "Cantidad": 20,
                "Peso": 100.68
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "439.57 ",
                "Cantidad": 1,
                "Peso": 5.45
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,373.63 ",
                "Cantidad": 20,
                "Peso": 32.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2077 - PURE DE PAPAS PURITAS 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "9,494.55 ",
                "Cantidad": 98,
                "Peso": 99.96000000000001
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,559.78 ",
                "Cantidad": 6,
                "Peso": 36.756
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,075.72 ",
                "Cantidad": 2,
                "Peso": 20.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,059.05 ",
                "Cantidad": 2,
                "Peso": 41.08
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,340.68 ",
                "Cantidad": 4,
                "Peso": 26.64
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "2311 - LENTEJON AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "7,318.15 ",
                "Cantidad": 36,
                "Peso": 108.72
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4054 - AJIES CAT ENTERO SACH 1X1 K",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "378.18 ",
                "Cantidad": 4,
                "Peso": 7.648
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4555 - AJIES CAT ENTERO POTE 500 CC 1X150 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "173.81 ",
                "Cantidad": 6,
                "Peso": 2.202
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4139 - MIXED PICKLES DOYPACK 1 x 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "399.56 ",
                "Cantidad": 12,
                "Peso": 5.508
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4145 - MIXED PICKL POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "234.14 ",
                "Cantidad": 6,
                "Peso": 2.616
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4146 - MORR TIR VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "383.46 ",
                "Cantidad": 6,
                "Peso": 2.706
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4143 - HONGOS EN VIN POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "352.21 ",
                "Cantidad": 6,
                "Peso": 2.61
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4141 - HONGOS ESCAB SACH 1 X 200 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "507.89 ",
                "Cantidad": 12,
                "Peso": 5.364
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4144 - HONGOS ESCAB POTE 500 CC 1 X 200 G PESO ESC.",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "318.94 ",
                "Cantidad": 6,
                "Peso": 2.664
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "263.04 ",
                "Cantidad": 12,
                "Peso": 2.736
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "276.15 ",
                "Cantidad": 12,
                "Peso": 2.784
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4500 - PICANTINA SACHET 1 X 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 11,
                "Direccion": "SAN QUINTIN Y AGRACIADA",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "387.37 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,279.40 ",
                "Cantidad": 5,
                "Peso": 12.5
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,210.54 ",
                "Cantidad": 5,
                "Peso": 24.950000000000003
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "105 - AVENA PURITAS LAMINADA 12 X 800 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "744.47 ",
                "Cantidad": 1,
                "Peso": 9.98
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,070.70 ",
                "Cantidad": 18,
                "Peso": 54.36000000000001
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,338.38 ",
                "Cantidad": 9,
                "Peso": 49.5
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "233 - POLENTA AIDA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "680.82 ",
                "Cantidad": 4,
                "Peso": 19.6
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "254 - HARINA DE MAIZ BIOS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "206.70 ",
                "Cantidad": 1,
                "Peso": 5.6
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "343.40 ",
                "Cantidad": 1,
                "Peso": 12.085
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "444 - COCOA PURITAS 1 X 2.50 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,220.97 ",
                "Cantidad": 21,
                "Peso": 53.13
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,063.89 ",
                "Cantidad": 4,
                "Peso": 10.228
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "419.09 ",
                "Cantidad": 1,
                "Peso": 3.1
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "610 - JUGUITO MULTIFRUTA 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "611 - JUGUITO NARANJA 2 LITROS  24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "858.06 ",
                "Cantidad": 6,
                "Peso": 3.972
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "612 - JUGUITO DURAZNO 2 LITROS  24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "613 - JUG NAR-BAN 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "634 - JUGUITO MANZANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "636 - JUGUITO PERA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "637 - JUGUITO ANANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "638 - JUG FRUTAS TROP 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "738.23 ",
                "Cantidad": 1,
                "Peso": 9.79
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,225.34 ",
                "Cantidad": 2,
                "Peso": 24.9
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "99,342.25 ",
                "Cantidad": 530,
                "Peso": 2591.7
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106808 - FIDEOS PURITAS DEDALES 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "208.26 ",
                "Cantidad": 1,
                "Peso": 4.89
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106809 - FIDEOS PURITAS MOÑAS 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,874.38 ",
                "Cantidad": 9,
                "Peso": 44.01
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106810 - FIDEOS PURITAS TIRAB 12X400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,874.38 ",
                "Cantidad": 9,
                "Peso": 44.01
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,666.11 ",
                "Cantidad": 8,
                "Peso": 39.12
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106816 - FIDEOS PURITAS CORB 12X400 G PACK.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,290.91 ",
                "Cantidad": 11,
                "Peso": 53.79
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "106817 - FIDEOS PURI RIZZETO 12x400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "208.26 ",
                "Cantidad": 1,
                "Peso": 4.89
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,471.33 ",
                "Cantidad": 36,
                "Peso": 36.432
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,983.08 ",
                "Cantidad": 72,
                "Peso": 72.864
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,950.50 ",
                "Cantidad": 96,
                "Peso": 97.152
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,983.08 ",
                "Cantidad": 72,
                "Peso": 72.864
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108612 - FIDEOS PURITAS CODOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "503.91 ",
                "Cantidad": 12,
                "Peso": 12.144
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "503.91 ",
                "Cantidad": 12,
                "Peso": 12.144
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "987.62 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,945.94 ",
                "Cantidad": 144,
                "Peso": 145.728
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108617 - FIDEOS PURITAS RIZZETO 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,471.33 ",
                "Cantidad": 36,
                "Peso": 36.432
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "735.66 ",
                "Cantidad": 18,
                "Peso": 18.54
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108624 - FIDEOS PURITAS ENTREFINOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "735.66 ",
                "Cantidad": 18,
                "Peso": 18.54
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "330.61 ",
                "Cantidad": 12,
                "Peso": 6.12
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "330.61 ",
                "Cantidad": 12,
                "Peso": 6.12
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "53,787.14 ",
                "Cantidad": 156,
                "Peso": 1887.6
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "467.37 ",
                "Cantidad": 2,
                "Peso": 17.4
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,153.79 ",
                "Cantidad": 4,
                "Peso": 22.152
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2052 - AZUCAR IMPALPABLE AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "439.57 ",
                "Cantidad": 1,
                "Peso": 5.45
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "23,334.29 ",
                "Cantidad": 135,
                "Peso": 220.85999999999999
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "6,822.20 ",
                "Cantidad": 15,
                "Peso": 172.5
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,024.75 ",
                "Cantidad": 9,
                "Peso": 9.27
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,800.02 ",
                "Cantidad": 3,
                "Peso": 31.5
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,475.43 ",
                "Cantidad": 3,
                "Peso": 61.67999999999999
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,974.61 ",
                "Cantidad": 5,
                "Peso": 30.630000000000003
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "879.08 ",
                "Cantidad": 1,
                "Peso": 10.46
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,378.31 ",
                "Cantidad": 2,
                "Peso": 41.04
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,243.40 ",
                "Cantidad": 3,
                "Peso": 31.08
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,114.15 ",
                "Cantidad": 1,
                "Peso": 20.54
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "609.55 ",
                "Cantidad": 1,
                "Peso": 6.66
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2171 - PACK INTENSO 6X1 K + AZUCAR 6X1 K",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,934.00 ",
                "Cantidad": 4,
                "Peso": 49
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,600.68 ",
                "Cantidad": 10,
                "Peso": 49.2
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "2314 - LENTEJON PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "8,343.66 ",
                "Cantidad": 8,
                "Peso": 97.36
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4051 - AJIES CAT ENTERO FCO 1X318 CC / 140 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "347.13 ",
                "Cantidad": 6,
                "Peso": 2.82
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4052 - AJIES CAT ENTERO FCO 1X770 CC / 320 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "240.66 ",
                "Cantidad": 3,
                "Peso": 3.216
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4067 - MIXED PICKLES FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "721.90 ",
                "Cantidad": 12,
                "Peso": 6.456
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4068 - MIXED PICKLES FCO 1X770 CC / 420 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "538.42 ",
                "Cantidad": 6,
                "Peso": 7.308
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4079 - MORR TIR VIN FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "761.65 ",
                "Cantidad": 9,
                "Peso": 5.022
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4080 - MORR TIR VIN FCO 1X770 CC / 400 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "358.14 ",
                "Cantidad": 3,
                "Peso": 3.684
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4083 - HONGOS EN VIN FCO 1X318 CC / 200G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "483.41 ",
                "Cantidad": 6,
                "Peso": 3.324
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4084 - HONGOS EN VIN FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "404.17 ",
                "Cantidad": 3,
                "Peso": 3.636
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4089 - HONGOS ESCAB FCO 1X318 CC / 200 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "448.04 ",
                "Cantidad": 6,
                "Peso": 3.312
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4090 - HONGOS ESCAB FCO 1X770 CC / 450 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "364.52 ",
                "Cantidad": 3,
                "Peso": 3.624
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "388.03 ",
                "Cantidad": 50,
                "Peso": 2.7
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "315.97 ",
                "Cantidad": 25,
                "Peso": 2.6
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "263.04 ",
                "Cantidad": 12,
                "Peso": 2.736
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4105 - PICANTINA SACHET 1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "374.92 ",
                "Cantidad": 50,
                "Peso": 2.7
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "265.11 ",
                "Cantidad": 12,
                "Peso": 2.784
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.784
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.592
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.796
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 12,
                "Direccion": "Del Fuerte 5305 Y Cochabamba",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "403.51 ",
                "Cantidad": 12,
                "Peso": 5.976
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,579.44 ",
                "Cantidad": 10,
                "Peso": 25
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,456.74 ",
                "Cantidad": 10,
                "Peso": 49.9
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,319.68 ",
                "Cantidad": 20,
                "Peso": 60.4
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,314.49 ",
                "Cantidad": 20,
                "Peso": 110
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "361 - COPOS DE MAIZ NATURALES 20 X 150 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "444 - COCOA PURITAS 1 X 2.50 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,970.88 ",
                "Cantidad": 10,
                "Peso": 25.3
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "610 - JUGUITO MULTIFRUTA 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "858.06 ",
                "Cantidad": 6,
                "Peso": 3.972
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "611 - JUGUITO NARANJA 2 LITROS  24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,287.09 ",
                "Cantidad": 9,
                "Peso": 5.958
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "612 - JUGUITO DURAZNO 2 LITROS  24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "858.06 ",
                "Cantidad": 6,
                "Peso": 3.972
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "613 - JUG NAR-BAN 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "858.06 ",
                "Cantidad": 6,
                "Peso": 3.972
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "634 - JUGUITO MANZANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "858.06 ",
                "Cantidad": 6,
                "Peso": 3.972
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "635 - JUGUITO LIMON 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "636 - JUGUITO PERA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "637 - JUGUITO ANANA 2 LITROS 24 X 24 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "638 - JUG FRUTAS TROP 2 LITROS 24X24 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "429.03 ",
                "Cantidad": 3,
                "Peso": 1.986
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101508 - BUONAPASTA HUEVO DEDALES 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.536
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101509 - BUONAPASTA HUEVO MOÑAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.536
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101510 - BUONAPASTA HUEVO TIRABUZONES 1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.536
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101511 - BUONAPASTA HUEVO MOSTACHOL1X400 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.536
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101516 - BUONAPASTA HUEVO CORBATAS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,450.41 ",
                "Cantidad": 72,
                "Peso": 29.304
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101517 - BUONAPASTA HUEVO RIZZETO 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.536
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "101522 - BUONAPASTA HUEVO NIDOS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "966.94 ",
                "Cantidad": 48,
                "Peso": 19.728
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104309 - DON GUSTO HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "771.41 ",
                "Cantidad": 24,
                "Peso": 12.168
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104316 - DON GUSTO HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104318 - DON GUSTO HUEVO CAPPELLETTIS 1x500G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "771.41 ",
                "Cantidad": 24,
                "Peso": 12.168
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104321 - DON GUSTO HUEVO TALLARINES 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,157.12 ",
                "Cantidad": 36,
                "Peso": 18.54
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "104322 - DON GUSTO HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,157.12 ",
                "Cantidad": 36,
                "Peso": 18.54
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "1068 - FIDEOS PURITAS 12 X 400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "99,342.25 ",
                "Cantidad": 530,
                "Peso": 2591.7
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107510 - FIDEOS PURITAS TIRABUZONES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107511 - FIDEOS PURITAS MOSTACHOLES 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "749.60 ",
                "Cantidad": 6,
                "Peso": 18.21
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "874.53 ",
                "Cantidad": 7,
                "Peso": 21.245
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107517 - FIDEOS PURITAS RIZZETO 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107522 - FIDEOS PURITAS NIDOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "749.60 ",
                "Cantidad": 6,
                "Peso": 18.3
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "107524 - FIDEOS PURITAS ENTREFINOS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "749.60 ",
                "Cantidad": 6,
                "Peso": 18.3
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "967.42 ",
                "Cantidad": 24,
                "Peso": 24.288
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,975.25 ",
                "Cantidad": 48,
                "Peso": 48.576
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,007.83 ",
                "Cantidad": 24,
                "Peso": 24.72
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108905 - GLUTINA HUEVO CUCUZU 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,644.86 ",
                "Cantidad": 96,
                "Peso": 48.768
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,322.43 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,983.65 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,644.86 ",
                "Cantidad": 96,
                "Peso": 48.768
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,983.65 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "7,383.48 ",
                "Cantidad": 264,
                "Peso": 134.112
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.24
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2400 - AZUCAR PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "27,440.75 ",
                "Cantidad": 78,
                "Peso": 943.8
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,990.99 ",
                "Cantidad": 8,
                "Peso": 69.6
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2027 - ALMIDON DE MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "633.84 ",
                "Cantidad": 5,
                "Peso": 25.17
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "12,700.32 ",
                "Cantidad": 73,
                "Peso": 119.428
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2077 - PURE DE PAPAS PURITAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,036.80 ",
                "Cantidad": 40,
                "Peso": 40.8
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,758.28 ",
                "Cantidad": 6,
                "Peso": 69
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "7,325.16 ",
                "Cantidad": 4,
                "Peso": 82.24
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,219.10 ",
                "Cantidad": 2,
                "Peso": 12.252
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,114.15 ",
                "Cantidad": 1,
                "Peso": 20.54
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,657.31 ",
                "Cantidad": 6,
                "Peso": 39.96
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2050 - CHOCLO AIDA 24 X 300 grs",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,044.22 ",
                "Cantidad": 18,
                "Peso": 156.6
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,674.16 ",
                "Cantidad": 10,
                "Peso": 49.2
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "2314 - LENTEJON PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,235.36 ",
                "Cantidad": 5,
                "Peso": 60.85
            },
            {
                "Cliente": 13,
                "Direccion": "Gral Flores 4567 y Corrales",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,117.52 ",
                "Cantidad": 150,
                "Peso": 8.1
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,683.77 ",
                "Cantidad": 19,
                "Peso": 47.5
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "9,891.04 ",
                "Cantidad": 23,
                "Peso": 114.77000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "105 - AVENA PURITAS LAMINADA 12 X 800 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,888.40 ",
                "Cantidad": 4,
                "Peso": 39.92
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "107 - SALVADO DE AVENA 12 x 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "968.30 ",
                "Cantidad": 1,
                "Peso": 6.1
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "7,526.28 ",
                "Cantidad": 29.6,
                "Peso": 162.8
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "254 - HARINA DE MAIZ BIOS 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,044.29 ",
                "Cantidad": 5,
                "Peso": 28
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "280 - HARINA MAIZ BIOS 12 X 1 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,053.31 ",
                "Cantidad": 8.92,
                "Peso": 107.79820000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "240 - SEMOLA MINUTO MAIZ BLANCO 12x450 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "430.49 ",
                "Cantidad": 0.5,
                "Peso": 2.7
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "245 - MAZAMORRA BLANCA 12 X 400 GR.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -321.41 ",
                "Cantidad": -0.5,
                "Peso": -2.485
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "366 - COPOS DE MAIZ AZUCARADOS 20 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,852.96 ",
                "Cantidad": 3,
                "Peso": 13.335
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "367 - COPOS DE MAIZ AZUCARADOS 24 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "399.58 ",
                "Cantidad": 1,
                "Peso": 2.8
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "361 - COPOS DE MAIZ NATURALES 20 X 150 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,919.85 ",
                "Cantidad": 4,
                "Peso": 12.6
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "445 - COCOA PURITAS 12 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,159.44 ",
                "Cantidad": 11.92,
                "Peso": 30.479440000000004
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "447 - COCOA PURITAS 12 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,818.53 ",
                "Cantidad": 5.84,
                "Peso": 35.624
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "530 - FAINA CLASICO 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,406.56 ",
                "Cantidad": 6,
                "Peso": 18.6
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "529 - FAINA CON CEBOLLA 12 x 250 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "947.60 ",
                "Cantidad": 1.92,
                "Peso": 6.048
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "723 - HARINA LEUD BLANCANIEVES 12X800 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,385.06 ",
                "Cantidad": 6,
                "Peso": 58.739999999999995
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "731 - HARINA 0000 PURITAS 12 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,514.07 ",
                "Cantidad": 9,
                "Peso": 112.05
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "101514 - BUONAPASTA HUEVO CODITOS 1 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -503.62 ",
                "Cantidad": -24,
                "Peso": -9.768
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102109 - DON GUSTO ESPINACA MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,667.46 ",
                "Cantidad": 47,
                "Peso": 23.829
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102116 - DON GUSTO ESPINACA CORBATAS 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,631.24 ",
                "Cantidad": 46,
                "Peso": 23.322
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102118 - DON GUSTO ESPINACA CAPPEL 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,703.68 ",
                "Cantidad": 48,
                "Peso": 24.336
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102121 - DON GUSTO ESPINACA TALLARIN 1x500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,667.46 ",
                "Cantidad": 47,
                "Peso": 24.205
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "102122 - DON GUSTO ESPINACA NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,667.46 ",
                "Cantidad": 47,
                "Peso": 24.205
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104309 - DON GUSTO HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,921.39 ",
                "Cantidad": 120,
                "Peso": 60.839999999999996
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104316 - DON GUSTO HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,930.33 ",
                "Cantidad": 180,
                "Peso": 91.26
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104318 - DON GUSTO HUEVO CAPPELLETTIS 1x500G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,454.48 ",
                "Cantidad": 134,
                "Peso": 67.93799999999999
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104321 - DON GUSTO HUEVO TALLARINES 1X500 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,310.30 ",
                "Cantidad": 69,
                "Peso": 35.535
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "104322 - DON GUSTO HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "6,265.17 ",
                "Cantidad": 190,
                "Peso": 97.85
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "106810 - FIDEOS PURITAS TIRAB 12X400 GRS PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -12.95 ",
                "Cantidad": -0.08,
                "Peso": -0.3912
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "106811 - FIDEOS PURITAS MOST 12X400 G PACK",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -25.91 ",
                "Cantidad": -0.16,
                "Peso": -0.7824
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "107509 - FIDEOS PURITAS MOÑAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -112.44 ",
                "Cantidad": -1,
                "Peso": -3.035
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "107516 - FIDEOS PURITAS CORBATAS 1 X 3 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -224.88 ",
                "Cantidad": -2,
                "Peso": -6.07
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108608 - FIDEOS PURITAS DEDALES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -41.99 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108609 - FIDEOS PURITAS MOÑAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -159.57 ",
                "Cantidad": -4,
                "Peso": -4.048
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108610 - FIDEOS PURITAS TIRABUZONES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -289.75 ",
                "Cantidad": -7,
                "Peso": -7.084000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108611 - FIDEOS PURITAS MOSTACHOLES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -121.78 ",
                "Cantidad": -3,
                "Peso": -3.036
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108614 - FIDEOS PURITAS CODITOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -37.80 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108615 - FIDEOS PURITAS TROMPETINES 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -41.99 ",
                "Cantidad": -1,
                "Peso": -1.012
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108616 - FIDEOS PURITAS CORBATAS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -239.37 ",
                "Cantidad": -6,
                "Peso": -6.072000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108622 - FIDEOS PURITAS NIDOS 1 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -41.99 ",
                "Cantidad": -1,
                "Peso": -1.03
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -28.70 ",
                "Cantidad": -1,
                "Peso": -0.508
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -54.53 ",
                "Cantidad": -2,
                "Peso": -1.016
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -57.40 ",
                "Cantidad": -2,
                "Peso": -1.016
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -479.27 ",
                "Cantidad": -17,
                "Peso": -8.636
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108912 - GLUTINA HUEVO CODOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -57.40 ",
                "Cantidad": -2,
                "Peso": -1.016
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -57.40 ",
                "Cantidad": -2,
                "Peso": -1.016
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -370.22 ",
                "Cantidad": -13,
                "Peso": -6.604
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -255.42 ",
                "Cantidad": -9,
                "Peso": -4.572
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -28.70 ",
                "Cantidad": -1,
                "Peso": -0.51
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2031 - ATUN DESMEN AIDA AL ACEITE 48X170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,818.28 ",
                "Cantidad": 5,
                "Peso": 52.1
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2032 - ATUN DESMEN. AIDA AL AGUA 48 X 170 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,457.42 ",
                "Cantidad": 5,
                "Peso": 52.400000000000006
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,100.64 ",
                "Cantidad": 4.71,
                "Peso": 40.977000000000004
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2020 - ALMIDON DE MAIZ AIDA 12 X 450 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,526.77 ",
                "Cantidad": 8.84,
                "Peso": 48.95592
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "11,238.42 ",
                "Cantidad": 64.75999999999999,
                "Peso": 105.94735999999999
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "10,816.64 ",
                "Cantidad": 23.92,
                "Peso": 275.08
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2043 - SALSA BLANCA PURITAS 12 X 75 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,219.01 ",
                "Cantidad": 36.92,
                "Peso": 38.0276
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "9,260.96 ",
                "Cantidad": 9.95,
                "Peso": 104.475
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "26,914.65 ",
                "Cantidad": 14.75,
                "Peso": 303.26
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2133 - YERBA DEL CEBADOR ( 60 x 100 G CEB)",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,194.72 ",
                "Cantidad": 2,
                "Peso": 12.252
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2140 - YERBA COMPUESTA SERRANA 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,481.14 ",
                "Cantidad": 4,
                "Peso": 41.84
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2141 - YERBA COMPUESTA SERRANA 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "5,015.65 ",
                "Cantidad": 2.95,
                "Peso": 60.53399999999999
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2160 - YERBA DEL CEBADOR INTENSO 20 X 500 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "4,075.81 ",
                "Cantidad": 3.85,
                "Peso": 39.885999999999996
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2161 - YERBA DEL CEBADOR INTENSO 20 X 1 KG",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "3,805.46 ",
                "Cantidad": 1.8,
                "Peso": 36.972
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2050 - CHOCLO AIDA 24 X 300 grs",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -39.10 ",
                "Cantidad": -0.15,
                "Peso": -1.305
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "-$ -123.26 ",
                "Cantidad": -0.48000000000000004,
                "Peso": -2.3616
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4448 - AJIES CAT ENTERO SACH 1X3 K / 2700 G PESO ESC.",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "769.90 ",
                "Cantidad": 3,
                "Peso": 13.950000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4452 - AJIES CAT TIRS SACH 1X3 K",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "808.17 ",
                "Cantidad": 3,
                "Peso": 15.794999999999998
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4464 - MIXED PICKLES SACHET 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,441.59 ",
                "Cantidad": 5,
                "Peso": 25.85
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4472 - MORRON FILET VINAGRE SACHET 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,284.39 ",
                "Cantidad": 3,
                "Peso": 15.075000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4476 - MORR TIR VIN SACH 1X3 K",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,723.83 ",
                "Cantidad": 4,
                "Peso": 20.02
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4486 - HONGOS EN VINAGRE SACHET 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,243.18 ",
                "Cantidad": 4,
                "Peso": 20.58
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4490 - HONGOS EN ESCABECHE SACHET 1 X 3 KGS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "2,347.63 ",
                "Cantidad": 5,
                "Peso": 22.865000000000002
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,114.09 ",
                "Cantidad": 150,
                "Peso": 8.100000000000001
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4096 - MOSTAZA INGLESA SACHET  1 X 100 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,176.90 ",
                "Cantidad": 98,
                "Peso": 10.192
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4098 - MOSTAZA INGLESA MOSTACERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "781.38 ",
                "Cantidad": 36,
                "Peso": 8.208
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4099 - MOSTAZA INGLESA BOTELLA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,224.71 ",
                "Cantidad": 30,
                "Peso": 15.24
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4107 - PICANTINA PICANTINERO 1 X 200 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "530.37 ",
                "Cantidad": 24,
                "Peso": 5.568
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4112 - ADEREZO ADOBO PARRILLERO 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,542.13 ",
                "Cantidad": 48,
                "Peso": 23.136
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4113 - ADEREZO AJO Y PEREJIL 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,542.13 ",
                "Cantidad": 48,
                "Peso": 22.368
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4114 - ADEREZO CHIMICHURRI 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "1,158.56 ",
                "Cantidad": 36,
                "Peso": 17.352
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4115 - ADEREZO PICKLES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "489.25 ",
                "Cantidad": 15,
                "Peso": 7.125
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4116 - ADEREZO MORRONES 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "684.97 ",
                "Cantidad": 21,
                "Peso": 10.143
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4118 - ADEREZO HONGOS ESCABECHE 1 X 440 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "375.74 ",
                "Cantidad": 12,
                "Peso": 5.76
            },
            {
                "Cliente": 14,
                "Direccion": "Cno.Carrasco 4675 y Veracierto",
                "Articulo": "4119 - ADEREZO PRIMAVERA 1 X 460 GRS",
                "Vendedor": "Adrian Castellano - 19",
                "ImporteMN": "391.40 ",
                "Cantidad": 12,
                "Peso": 5.976
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "102 - AVENA PURITAS LAMINADA 12 X 200 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,527.03 ",
                "Cantidad": 6,
                "Peso": 15
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "104 - AVENA PURITAS LAMINADA 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,747.04 ",
                "Cantidad": 4,
                "Peso": 19.96
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "173 - AVENA LAMINADA AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,694.42 ",
                "Cantidad": 10,
                "Peso": 30.2
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "232 - POLENTA 1 MINUTO PURITAS 12 X 450 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "8,928.34 ",
                "Cantidad": 34,
                "Peso": 187
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "260 - HARINA  MAIZ BIOS 1 X 5 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,418.45 ",
                "Cantidad": 10,
                "Peso": 50.2
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "379 - COPOS DE MAIZ AZUCARADOS 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,992.23 ",
                "Cantidad": 9,
                "Peso": 27.27
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108701 - FIDEOS PURI CABELLO DE ANGEL 1x5 K",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "608.15 ",
                "Cantidad": 3,
                "Peso": 15.144
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108703 - FIDEOS PURITAS LETRITAS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "833.06 ",
                "Cantidad": 4,
                "Peso": 20.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108704 - FIDEOS PURITAS ESTRELLAS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "208.26 ",
                "Cantidad": 1,
                "Peso": 5.048
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108705 - FIDEOS PURITAS CUCUZU 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "416.53 ",
                "Cantidad": 2,
                "Peso": 10.096
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108706 - FIDEOS PURITAS ARITOS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108707 - FIDEOS PURITAS PAMPERITOS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,441.21 ",
                "Cantidad": 7,
                "Peso": 35.336
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108708 - FIDEOS PURITAS DEDALES 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,082.65 ",
                "Cantidad": 10,
                "Peso": 50.48
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108709 - FIDEOS PURITAS MOÑAS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,841.09 ",
                "Cantidad": 9,
                "Peso": 45.432
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108710 - FIDEOS PURITAS TIRABUZONES 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,448.96 ",
                "Cantidad": 17,
                "Peso": 85.816
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108711 - FIDEOS PURITAS MOSTACHOLES 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "833.06 ",
                "Cantidad": 4,
                "Peso": 20.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108714 - FIDEOS PURITAS CODITOS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108715 - FIDEOS PURITAS TROMPETINES 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,249.59 ",
                "Cantidad": 6,
                "Peso": 30.288
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108716 - FIDEOS PURITAS CORBATAS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "9,697.13 ",
                "Cantidad": 48,
                "Peso": 242.30399999999997
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108717 - FIDEOS PURITAS RIZZETO 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "833.06 ",
                "Cantidad": 4,
                "Peso": 20.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108724 - FIDEOS PURITAS ENTREFINOS 1 X 5 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,999.43 ",
                "Cantidad": 10,
                "Peso": 50.5
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108901 - GLUTINA HUEVO CAB DE ANGEL 1X500 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,377.48 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108903 - GLUTINA HUEVO LETRITAS  1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "661.22 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108905 - GLUTINA HUEVO CUCUZU 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,349.96 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108906 - GLUTINA HUEVO ARITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108907 - GLUTINA HUEVO PAMPERITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "1,349.96 ",
                "Cantidad": 48,
                "Peso": 24.384
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108908 - GLUTINA HUEVO DEDALES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,022.35 ",
                "Cantidad": 144,
                "Peso": 73.152
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108909 - GLUTINA HUEVO MOÑAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,738.61 ",
                "Cantidad": 168,
                "Peso": 85.344
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108910 - GLUTINA HUEVO TIRABUZONES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "6,088.57 ",
                "Cantidad": 216,
                "Peso": 109.728
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108911 - GLUTINA HUEVO MOSTACHOLES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,738.62 ",
                "Cantidad": 168,
                "Peso": 85.344
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108914 - GLUTINA HUEVO CODITOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,011.17 ",
                "Cantidad": 72,
                "Peso": 36.576
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108915 - GLUTINA HUEVO TROMPETINES 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.192
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108916 - GLUTINA HUEVO CORBATAS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "16,805.65 ",
                "Cantidad": 600,
                "Peso": 304.8
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108917 - GLUTINA HUEVO RIZZETO 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,388.65 ",
                "Cantidad": 120,
                "Peso": 60.96
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108922 - GLUTINA HUEVO NIDOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,066.22 ",
                "Cantidad": 72,
                "Peso": 36.72
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "108924 - GLUTINA HUEVO ENTREFINOS 1 X 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "688.74 ",
                "Cantidad": 24,
                "Peso": 12.24
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2046 - ARVEJAS AIDA 24 X 300 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2039 - PURE DE PAPAS PURITAS 12 X 125 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "24,247.98 ",
                "Cantidad": 140,
                "Peso": 229.04000000000002
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2036 - DURAZNOS EN ALMIBAR AIDA 12X820 G",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "14,931.68 ",
                "Cantidad": 33,
                "Peso": 379.5
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2130 - YERBA DEL CEBADOR 20 x 500 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "4,654.12 ",
                "Cantidad": 5,
                "Peso": 52.5
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2131 - YERBA DEL CEBADOR 20 x 1 KG",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "5,475.42 ",
                "Cantidad": 3,
                "Peso": 61.67999999999999
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2163 - YERBA DEL CEB INTENSO ( 60 x 100 G CEB)",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "2,925.85 ",
                "Cantidad": 5,
                "Peso": 33.3
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2312 - LENTEJON PURITAS 12 X 400 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "-   ",
                "Cantidad": 0,
                "Peso": 0
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "2311 - LENTEJON AIDA 1 X 3 KGS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "37,607.16 ",
                "Cantidad": 180,
                "Peso": 543.5999999999999
            },
            {
                "Cliente": 15,
                "Direccion": "China 1988",
                "Articulo": "4095 - MOSTAZA INGLESA SACHET  1 X 50 GRS",
                "Vendedor": "Michel Gonzalez - 21",
                "ImporteMN": "3,787.16 ",
                "Cantidad": 500,
                "Peso": 27
            }
        ]
    };
    counter = 1;

    drawnItems: FeatureGroup = featureGroup();
    drawOptions = {
        edit: {
            featureGroup: this.drawnItems
        }
    };

    crearMarcador(latitud, longitud, texto) {
        let nuevoMarcador = marker([latitud, longitud], {
            icon: icon({
                iconSize: [25, 41],
                iconAnchor: [13, 41],
                iconUrl: 'assets/marker-icon.png',
                shadowUrl: 'assets/marker-shadow.png'
            })
        }).bindTooltip(texto, {
            permanent: false,
            opacity: 1,
            direction: 'top'
        });

        this.drawnItems.addLayer(nuevoMarcador);
        console.log(this.drawnItems.getLayers());
    }

    getCapas() {
        return this.drawnItems.getLayers().filter(layer => layer['nombre'] != null);
    }
    cargarClientes() {
        let cliente = new Cliente(1, "01542 - NUEVAS  GENERACIONES LTDA.", "Adolfo Rodriguez 5187 y Garzon", "-34.8243796", "-56.2217286");
        let cliente2 = new Cliente(2, "03275 - BIDENUX", "J. Belloni 4860 y Repetto", "-34.815864", "-56.13864");
        let cliente3 = new Cliente(3, "1723 - LOSLO LTDA.", "L. B. Berres 6645 y Tomkinson", "-34.835972", "-56.273558");
        let cliente4 = new Cliente(4, "01016 - BIEN IGUAL LTDA.", "Camino Maldonado 6783 Bis.", "-34.824442", "-56.102426");
        let cliente5 = new Cliente(5, "02189 - BRITES NELSON", "José Belloni 4230 y Tte. Galeano", "-34.826732", "-56.140634");
        let cliente6 = new Cliente(6, "00298 - VERYLOND S.A.", "Veraguas 1907 y Av. Lezica", "-34.794948", "-56.249384");
        let cliente7 = new Cliente(7, "03665 - TONICOR S.A.(LA CHACRA)", "José Belloni 6389 e Instrucciones", "-34.782002", "-56.136381");
        let cliente8 = new Cliente(8, "03702 - AGRO MERCADO FORTALEZA (J.RODRIGUEZ", "Cno.Cibils y Cno.Las Tropas", "-34.874995", "-56.266506");
        let cliente9 = new Cliente(9, "01352 - BONAREL  S.A.", "José Belloni 5382-86 y C.A.Lopez", "-34.805924", "-56.136342");
        let cliente10 = new Cliente(10, "03535 - TOPA S.R.L.","Luis B.Berres 6608 y Tomkinson", "-34.835939", "-56.272501");
        let cliente11 = new Cliente(11, "01545 - SUARAS S.A.", "SAN QUINTIN Y AGRACIADA", "-34.855051", "-56.22139");
        let cliente12 = new Cliente(12, "02648 - SAN CONO III", "Del Fuerte 5305 Y Cochabamba", "-34.851984", "-56.117816");
        let cliente13 = new Cliente(13,"11760 - CARZOLIO LEONARDO", "Gral Flores 4567 y Corrales", "-34.846866", "-56.156135");
        let cliente14 = new Cliente(14, "03754 - PALTICOR S.A.", "Cno.Carrasco 4675 y Veracierto", "-34.871406", "-56.116855");
        let cliente15 = new Cliente(15, "01024 - CIVENUR S.A.", "China 1988", "-34.881118", "-56.256193");

        this.colClientes.push(cliente);
        this.colClientes.push(cliente2);
        this.colClientes.push(cliente3);
        this.colClientes.push(cliente4);
        this.colClientes.push(cliente5);
        this.colClientes.push(cliente6);
        this.colClientes.push(cliente7);
        this.colClientes.push(cliente8);
        this.colClientes.push(cliente9);
        this.colClientes.push(cliente10);
        this.colClientes.push(cliente11);
        this.colClientes.push(cliente12);
        this.colClientes.push(cliente13);
        this.colClientes.push(cliente14);
        this.colClientes.push(cliente15);

        this.cargarClientesEnMapa();
    }


    limpiarComas(){
        this.lista.Hoja.forEach( fila => {
            fila.ImporteMN = fila.ImporteMN.replace(',','');
        })
    }
    cargarClientesEnMapa() {
        this.colClientes.forEach(cliente => {
            this.crearMarcador(cliente.lat, cliente.long, cliente.nombre + "<br>" + cliente.direccion)
        })
    }

    obtenerCantidadArticulosVendidosEnZona() {
        this.cantidadArticulo = 0;
        this.monto = 0;
        let colClientesEnZona = this.obtenerClientesDeZona(this.layer);
        
        let filasArticulosEnZona = this.listaFiltrada.filter( fila => colClientesEnZona.includes(fila.Cliente));
        if(this.filtroCliente){            
            filasArticulosEnZona = filasArticulosEnZona.filter( fila => fila.Cliente == this.filtroCliente.id);
        }
        if(this.filtroVendedor){
            filasArticulosEnZona = filasArticulosEnZona.filter( fila => fila.Vendedor == this.filtroVendedor);
        }
        if(filasArticulosEnZona.length > 0){
        filasArticulosEnZona.forEach( fila => {
            this.cantidadArticulo += fila.Cantidad;
            if(!isNaN(Number(fila.ImporteMN))) {                
                this.monto = this.monto +  parseFloat(fila.ImporteMN);
            }        
        });  
        this.noResultMsg = null;

        }else{
            this.noResultMsg = "No hay resultados para los filtros ingresados";

        }        
    }

    filtrarDatos(){
        
    }


    obtenerClientesDeZona(layer: any) {
        let colClientesDeArticuloEnZona = [];
        this.colClientes.forEach(cliente => {
            if (this.marcadorEstaEnZona(cliente.lat, cliente.long, layer)) {
                colClientesDeArticuloEnZona.push(cliente.id);
            }
        });

        return colClientesDeArticuloEnZona;
    }

    getClienteById(idCliente) {
        let clientes = this.colClientes.filter(cli => cli.id === idCliente);
        console.log(clientes);
        return clientes;
    }

    getArticulosByIdCliente(idCliente) {
        let filtrada = this.lista.Hoja.filter(art => art.Cliente === idCliente);
        this.getClienteById(idCliente);
        return filtrada;
    }

    clearFilters(){
        this.filtroCliente =null;
        this.filtroVendedor = null;       
        this.articulo = null;
        this.noResultMsg = null;
    }


    onCustomerChange(customer){
            this.filtroCliente = customer;
    }
    onLayerChange(layer) {
        this.layer = layer;
    }
    onProductChange(product) {
        this.getFilasPorProducto(product);
        this.articulo = product;
    }
    onVendedorChange(vendedor){
        this.filtroVendedor = vendedor; 
    }

    obtenerCoordenadasPorDireccion(direccion) {
    }

    obtenerCoordenadasLista() {
        this.listaClientes.forEach(cliente => {
            this.obtenerCoordenadasPorDireccion(cliente.direccion);
        });
    }


    getFilasPorProducto(productoBuscado) {
        let listaFiltradaPorProducto = this.lista.Hoja.filter(product => product.Articulo === productoBuscado);
        this.listaFiltrada = listaFiltradaPorProducto;
        console.log(listaFiltradaPorProducto);
        return listaFiltradaPorProducto;
    }

    getProductosFiltrados() {
        this.lista.Hoja.forEach((producto) => {
            this.listaProductos.push(producto.Articulo);
            this.listaClientes.push(producto.Cliente);
            this.listaVendedores.push(producto.Vendedor);
        })
        this.listaProductos = Array.from(new Set(this.listaProductos));
        this.listaClientes = Array.from(new Set(this.listaClientes));
        this.listaVendedores= Array.from(new Set(this.listaVendedores));
    }



    //MAPA

    marcadorEstaEnZona(lat, long, zona: any) {
        //let points = zona._latlngs;
        let geoJson = zona.toGeoJSON();
        let gs = new GeoJsonGeometriesLookup(geoJson);
        const point1 = { type: "Point", coordinates: [long, lat] };

        let containers = gs.getContainers(point1);
        if (containers.features.length > 0) {
            return true;
        }
        return false
    }
    onDrawCreated(event: any) {
        let type = event.type;
        let layer = event.layer;
        let nuevaZona = 'Zona ' + this.counter;
        layer.bindPopup(nuevaZona);
        this.counter += 1;
        this.zonas.push(nuevaZona);
        console.log(event);
        layer.nombre = nuevaZona;
        this.drawnItems.addLayer((event as DrawEvents.Created).layer);





    }
    optionsSpec: any = {
        layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Street Map' }],
        zoom: 12,
        center: [-34.897522, -56.164677]
    };
    options = {
        layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
        zoom: this.optionsSpec.zoom,
        center: latLng(this.optionsSpec.center)
    };
    zoom = this.optionsSpec.zoom;
    center = latLng(this.optionsSpec.center);
    formZoom = this.zoom;
    zoomLevels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
    lat = this.center.lat;
    lng = this.center.lng;

    onCenterChange(center: LatLng) {
        setTimeout(() => {
            this.lat = center.lat;
            this.lng = center.lng;
        });
    }


    onZoomChange(zoom: number) {
        setTimeout(() => {
            this.formZoom = zoom;
        });
    }

}