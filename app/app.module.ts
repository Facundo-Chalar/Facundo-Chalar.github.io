import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
import {MatSelectModule} from '@angular/material/select';
import {MatListModule} from '@angular/material/list';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { LeafletDrawModule } from '@asymmetrik/ngx-leaflet-draw';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTooltipModule} from '@angular/material/tooltip';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,GoogleMapsModule, BrowserAnimationsModule, MatSelectModule, MatListModule, LeafletModule, LeafletDrawModule,MatButtonModule, MatInputModule, MatIconModule,FormsModule, MatTooltipModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
