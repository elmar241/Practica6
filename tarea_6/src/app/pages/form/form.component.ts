import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interfaces';
import { toast } from 'ngx-sonner';


@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})

export class FormComponent {
  userForm: FormGroup
  userServices = inject(UsersService)
  router = inject(Router)
  @Input() idUser: string = ""
  user : IUser | any
  title: string = "Registrar"

  constructor() {
    this.userForm = new FormGroup({
      first_name: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[A-Za-zÀ-ÿ\s]+$/)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]),
      image: new FormControl("", [
        Validators.required,
        Validators.pattern(/^(https?:\/\/[^\s]+)$/)
      ]),
    });
  }

  async ngOnInit() {
    // Aqui tengo disponible la ruta, para que aparezcan los datos en el formulario previamente.
    if(this.idUser) {
      this.title = "Actualizar"
      this.user = await this.userServices.getById(this.idUser)
      this.userForm = new FormGroup({
        _id: new FormControl(this.user._id, []),
        first_name: new FormControl(this.user.first_name, []),
        last_name: new FormControl(this.user.last_name, []),
        email: new FormControl(this.user.email, []),
        image: new FormControl(this.user.image, []),
      });
    }
    
  }

  async getDataForm(){
    // Con esta función llamo al servicio y envio los datos del formulario
    try {
      if(this.userForm.value._id) {
        const response = await this.userServices.update(this.userForm.value)
        if(response) {
          this.router.navigate(['/home'])
          toast.warning('Usuario actualizado correctamente')
        }
      } else {
        const response = await this.userServices.insert(this.userForm.value)
        if(response) {
          this.router.navigate(['/home'])
          toast.success('Usuario registrado correctamente')
        }
      }
    } catch (msg: any) {
        console.log(msg.error)
    }
  }

  checkControl(controlName: string, errorName: string): boolean | undefined {
    return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
  }
}
