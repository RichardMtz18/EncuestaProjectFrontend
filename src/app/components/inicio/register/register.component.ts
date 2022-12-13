import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  register: FormGroup;

  constructor(private fb: FormBuilder) 
  { 
    this.register = this.fb.group
    (
      {
        name: ['', Validators.required],
        lastNames: ['', Validators.required],
        gender: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(8)]]
      }
    );
  }

  ngOnInit(): void {
  }

  userReg(): void
  {
    console.log(this.register)
  }

}
