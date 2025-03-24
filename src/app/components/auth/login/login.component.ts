import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = "";
  password = "";

  constructor(private authService: AuthService, private toastService: ToastService, private router: Router) {}

  login(){
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastService.success('Login Successfull!');
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        if(error.error.message){
          this.toastService.error(error.error.message);
        }else{
          this.toastService.error("Login Failed!");
        }
        if(localStorage.getItem('token')){
          localStorage.removeItem('token');
        }
      }
    });
  }

}
