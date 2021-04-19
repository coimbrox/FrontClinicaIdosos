import { Component, OnInit } from '@angular/core';
import { RegisterService } from './services/register.service';
import { Register } from './models/register';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent implements OnInit {
  register = {} as Register;

  constructor(private RegisterService: RegisterService) {}

  ngOnInit() {
    this.getRegister();
  }


 // define se um Registro será criado ou atualizado
 saveCar(form: NgForm) {
  if (this.register.id !== undefined) {
    this.RegisterService.updateRegistro(this.register).subscribe(() => {
      this.cleanForm(form);
    });
  } else {
    this.RegisterService.saveRegister(this.register).subscribe(() => {
      this.cleanForm(form);
    });
  }
}

 // Chama o serviço para obtém todos os carros
 getRegister() {
  this.RegisterService.getRegister().subscribe((register: Register) => {
    this.register = register;
  });
}

// deleta um carro
deleteRegistro(register: Register) {
  this.RegisterService.deleteRegistro(register).subscribe(() => {
    this.getRegister();
  });
}



// limpa o formulario
cleanForm(form: NgForm) {
  this.getRegister();
  form.resetForm();
  this.register = {} as Register;
}


}

