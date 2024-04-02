import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, RouterModule, RouterLink, FormsModule, ReactiveFormsModule, MatSnackBarModule],
})
export class RegisterComponent {

  registerForm!: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private autService: AuthService, private _router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // Create the form group with form controls
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correoElectronico: ['', (Validators.required, Validators.email)],
      passwordUser: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Form is valid, handle form submission logic here
      console.log(this.registerForm.value);
      this.autService.register(this.registerForm.value).subscribe(res => {
        this.autService.login(this.registerForm.controls['correoElectronico'].value, this.registerForm.controls['passwordUser'].value).subscribe(respuesLogin => {
          const token = respuesLogin.token;
          this.autService.saveToken(token);
          this._router.navigate(['/carrito'])
        },
          error => {
            console.error('Error al iniciar sesión:', error.error);
            const message = 'Error al iniciar sesión: ' + error.title
            this._snackBar.open(message, 'ok');
          })
      },
        error => {
          console.error('Error al registrar usuario:', error.error);
          const message = 'Error al registrar usuario: ' + error.error
          this._snackBar.open(message, 'ok');
        })
    } else {
      // Form is invalid, mark all fields as touched to display validation errors
      this.registerForm.markAllAsTouched();
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
