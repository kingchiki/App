import {Component, OnInit} from '@angular/core';
import {AuthResponse, AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  showRegisterForm = false;
  name!: string;
  password!: string;

  userData: AuthResponse = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")!) : null

  regForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.regForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required),
      're-password': new FormControl(null, [Validators.required, mustMatchValidator("password")])
    });
  }

  ngOnInit() {
    console.log(this.userData)
    if (this.userData?.access_token) {
      this.router.navigate(["my-recipes"])
    }
  }

  onSubmit() {
    this.authService.login({username: this.name, password: this.password}).subscribe(
      (authResponse) => {
        console.log(authResponse);
        localStorage.setItem("userData", JSON.stringify(authResponse))
        this.router.navigate(["my-recipes"])
      },
      (error) => {
        console.log(error);
        window.alert("Login Failed! Check username and password")
      }
    );
  }

  regUser($event: any) {
    if (!this.regForm.invalid) {
      this.authService.register({
        ...this.regForm.value,
        roles: "USER",
        password: btoa(this.regForm.controls['re-password'].value)
        // password: encoder(this.regForm.controls['re-password'].value)
      }).subscribe((res) => {
        this.showRegisterForm = false
      }, (error) => {
        console.log(error);
        window.alert("Registration Failed! Contact support")
      })
    }
  }
}

function mustMatchValidator(controlName: string) {
  return (control: AbstractControl) => {
    const matchingControl = control.parent?.get(controlName);

    if (control.value !== matchingControl?.value) {
      return {mustMatch: true};
    }

    return null;
  };
}

