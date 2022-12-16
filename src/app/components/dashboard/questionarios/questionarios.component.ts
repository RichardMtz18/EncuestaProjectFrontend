import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-questionarios',
  templateUrl: './questionarios.component.html',
  styleUrls: ['./questionarios.component.css']
})
export class QuestionariosComponent implements OnInit {
  email: string="";

  constructor(private loginService: LoginService) 
  { 

  }

  ngOnInit(): void {
    this.getNombreUsuario();
  }

  getNombreUsuario(): void{
    console.log(this.loginService.getTokenDecoded());
    this.email = this.loginService.getTokenDecoded().sub;
  }

}
