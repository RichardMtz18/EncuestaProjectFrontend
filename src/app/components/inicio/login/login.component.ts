import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  log(): void {
    console.log(this.login);

    const usuario: Usuario = {
      emailUsuario: this.login.value.email,
      password: this.login.value.password,
    };

    if (
      usuario.emailUsuario === 'richard@gmail.com' &&
      usuario.password === '12345'
    ) {
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Email o password incorrecto', 'Error');
    }
    console.log(usuario);
  }
}
