import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.css']
})
export class CambiarPasswordComponent implements OnInit {
  cambiarPassword: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private toastr: ToastrService,
    private router: Router) 
  { 
    this.cambiarPassword = this.fb.group({
      passwordAnterior: ['', Validators.required],
      nuevoPassword: ['',[Validators.required, Validators.minLength(4)]],
      confirmarPassword: ['']
    }, { validator: this.checkPassword})
  }

  ngOnInit(): void {
  }
  
  checkPassword(group: FormGroup): any{
    const pass = group.controls['nuevoPassword'].value;
    const confirmarPass = group.controls['confirmarPassword'].value;
    return pass === confirmarPass ? null : {notSame: true};
  }

  savePassword(): void{

    const changePassword: any = {
      passwordAnterior: this.cambiarPassword.value.passwordAnterior,
      nuevoPassword: this.cambiarPassword.value.nuevoPassword
    };
    console.log(changePassword);
    this.loading = true;
    this.usuarioService.changePassword(changePassword).subscribe(data => {
      this.toastr.info(data.message);
      this.router.navigate(['/dashboard']);
    }, error => {
      this.loading = false;
      this.cambiarPassword.reset();
      this.toastr.error(error.error.message, 'Error!');
    });
  }

}
