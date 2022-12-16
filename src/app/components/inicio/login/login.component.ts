import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../../../models/usuario';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading = false;
  login: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private toastr: ToastrService,
    private router:Router,
    private loginService: LoginService
  ) {
    this.login = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  log(): void {
    const usuario: Usuario = {
      email: this.login.value.email,
      password: this.login.value.password,
    };
    this.loading = true;
    this.loginService.login(usuario).subscribe(data => {
      console.log(data);
      this.loading = false;
      this.loginService.setLocalStorage(data.token);
      this.router.navigate(['/dashboard']);
    }, error => {
      console.log(error);
      this.loading = false;
      this.toastr.error(error.error.message, 'Error');
      this.login.reset();
    });
    /*setTimeout(()=> {
      if (usuario.email === 'richard' && usuario.password === '12345')
    {
      this.login.reset();
      this.router.navigate(['/dashboard'])
    }else{
      this.toastr.error('Usuario o contraseña incorrecta', 'Error');
      this.login.reset();
    }
    this.loading = false;
    }, 3000);*/
  }
}
