import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { IError, IUser, User } from '../../models/user';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-detail',
  imports: [RouterModule, SweetAlert2Module],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent {
  user!: User;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private usersService: UsersService
  ) {
    const id = this.route.snapshot.paramMap.get('id') ?? '';

    this.usersService.getUserById(id).subscribe({
      next: (response: IUser | IError) => {
        if ('error' in response) {
          this.errorMessage = response.error;
          return;
        }
        this.user = new User(
          response._id,
          response.id,
          response.first_name,
          response.last_name,
          response.username,
          response.email,
          response.image
        );
      },
      error: (err) => {
        console.error('Error en la llamada HTTP', err);
      },
    });
  }

  onDeleteUser(user: User) {
    this.usersService.deleteUser(user._id).subscribe({
      next: (res: IUser | IError) => {
        if("error" in res){
          Swal.fire({
            'title' : 'Error',
            'text' : `Se ha producido un error eliminando el usuario: ${res.error}`,
            'toast' : true,
            'position': 'top-end',
            'icon': "error"
          });
          return;
        }
        Swal.fire({
          'title' : 'Éxito',
          'text' : `Se ha eliminado correctamente el usuario: ${res.first_name}`,
          'toast' : true,
          'position': 'top-end',
          'icon': "success"
        });
        this.router.navigateByUrl('/home');
      },
      error: (err) => {
        console.error('Error en la llamada HTTP', err);
      },
    });
  }
}
