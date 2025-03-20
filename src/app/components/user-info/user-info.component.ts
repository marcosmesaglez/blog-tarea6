import { Component, Input } from '@angular/core';
import { IError, IUser, User } from '../../models/user';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-info',
  imports: [RouterModule, SweetAlert2Module],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  @Input() user!: User;

  constructor(private usersService: UsersService) {}

  onDeleteUser(user: User) {
    this.usersService.deleteUser(user._id).subscribe({
      next: (res: IUser | IError) => {
        if ('error' in res) {
          Swal.fire({
            title: 'Error',
            text: `Se ha producido un error eliminando el usuario: ${res.error}`,
            toast: true,
            position: 'top-end',
            icon: 'error',
          });
          return;
        }
        Swal.fire({
          title: 'Éxito',
          text: `Se ha eliminado correctamente el usuario: ${res.first_name}`,
          toast: true,
          position: 'top-end',
          icon: 'success',
        });
      },
      error: (err) => {
        console.error('Error en la llamada HTTP', err);
      },
    });
  }
}
