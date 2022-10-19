import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/model/authResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  loginFrom!: FormGroup;
  isCredValid: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private fb: FormBuilder) {

  }

  ngOnInit(): void {

    this.loginFrom = this.fb.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required],
      });

  }
  onSubmit(user: any) {

    console.log(user);

    if (this.loginFrom.valid) {

      console.log("Have to Submit Form the server");
      //token generated
      this.loginService.generateToken(user).subscribe(
        (response: AuthResponse) => {
          console.log(response);
          this.loginService.loginUser(response["jwttoken"]);
          console.log(this.loginService.getToken());
          //this.router.navigate(['dashboard', (this.credentials.username])
          // this.router.navigate(['dashboard'])
          window.location.href = "/dashboard";

        },
        (error: any) => {
          console.log(error['error']['message']);
          if (error['error']['message'] == "INVALID_CREDENTIALS") {
            this.isCredValid = true;
          }
        }
      )


    }

  }
}

export interface LoginFrom {
  username: string,
  password: string
}
