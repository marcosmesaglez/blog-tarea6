import { Component } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { IUser, IUserRes, User } from '../../models/user';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-home',
  imports: [UserInfoComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentPage: number = 1;
  totalPages: number = 1;
  userList: User[] = [];

  constructor(
    private usersService: UsersService
  ){
    this.initUsers(this.currentPage);
  }

  initUsers(page: number){
    this.usersService.getUsers(page).subscribe({
      next: (userRes: IUserRes) => {
        this.currentPage = userRes.page;
        this.totalPages = userRes.total_pages;
        this.userList = userRes.results.map((user: IUser) => {
          return new User(user._id, user.id, user.first_name, user.last_name, user.username, user.email, user.image);
        });
      },
      error: (err) => {
        console.error('Error en la llamada HTTP', err);
      }
    })
  }

  goToPage(page: number){
    this.initUsers(page);
  }

}
