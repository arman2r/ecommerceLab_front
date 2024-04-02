import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule],
})
export class LoginComponent {

  loginForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private autService: AuthService, private _router: Router, private _snackBar: MatSnackBar){}

  ngOnInit(): void {
    // Create the form group with form controls
    this.loginForm = this.fb.group({
      email: ['', (Validators.required, Validators.email)], 
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Form is valid, handle form submission logic here
      console.log(this.loginForm.value);
      this.autService.login(this.loginForm.controls['email'].value, this.loginForm.controls['password'].value).subscribe(res => {
        const token = res.token;
        this.autService.saveToken(token);
        this._router.navigate(['/carrito'])
      },
      error => {
        console.error('Error al iniciar sesión:', error.error);
        const message = 'Error al iniciar sesión: ' + error.error
        this._snackBar.open(message, 'ok');
      })
    } else {
    // Form is invalid, mark all fields as touched to display validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
