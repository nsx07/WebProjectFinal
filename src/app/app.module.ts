import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import {ButtonModule} from 'primeng/button';
import { ConfirmDialog, ConfirmDialogModule } from 'primeng/confirmdialog'
import { Dialog, DialogModule } from 'primeng/dialog'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TooltipModule} from "primeng/tooltip"

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ButtonModule,
    TooltipModule,
    ConfirmDialogModule,
    DialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
