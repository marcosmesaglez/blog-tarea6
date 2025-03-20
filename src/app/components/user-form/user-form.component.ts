import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IError, IUser } from '../../models/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  userForm!: FormGroup;
  id!: string;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    const urlRegex = /^https:\/\/.+$/i;
    this.userForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      image: ['', [Validators.required, Validators.pattern(urlRegex)]],
    });
    if (this.id) {
      this.usersService.getUserById(this.id).subscribe({
        next: (res: IUser | IError) => {
          if ('error' in res) {
            this.errorMessage = res.error;
            return;
          }
          this.userForm.patchValue(res);
        },
        error: (err) => {
          console.error('Error en la llamada HTTP', err);
        },
      });
    }
  }

  ngOnInit() {}

  get userF() {
    return this.userForm.controls;
  }

  onSubmit() {
    if (!this.id) {
      this.usersService.createUser(this.userForm.value).subscribe({
        next: (res: Omit<IUser, '_id' | 'username' | 'password'>) => {
          Swal.fire({
            title: 'Éxito',
            text: `Se ha añadido correctamente el usuario: ${res.first_name}`,
            toast: true,
            position: 'top-end',
            icon: 'success',
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error en la llamada HTTP', err);
        },
      });
    } else {
      this.usersService.updateUser(this.id, this.userForm.value).subscribe({
        next: (res: IUser | IError) => {
          if ('error' in res) {
            Swal.fire({
              title: 'Error',
              text: `Se ha producido un error actualizando el usuario: ${res.error}`,
              toast: true,
              position: 'top-end',
              icon: 'error',
            });
            return;
          }
          Swal.fire({
            title: 'Éxito',
            text: `Se ha actualizado correctamente el usuario: ${res.first_name}`,
            toast: true,
            position: 'top-end',
            icon: 'success',
          });
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error en la llamada HTTP', err);
        },
      });
    }
  }
}
