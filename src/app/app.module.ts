import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CelsiusFahrenheitComponent } from './celsius-fahrenheit/celsius-fahrenheit.component';
import { ImcComponent } from './imc/imc.component';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { DropboxComponent } from './dropbox/dropbox.component';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    CelsiusFahrenheitComponent,
    ImcComponent,
    CadastroUsuarioComponent,
    DropboxComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot({ dropSpecialCharacters: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
