import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Pagination, PaginatedResult } from 'src/app/_models/pagination';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  users: User[];
  pagination: Pagination;
  likesParam: string;
  userParams: any = {};

  constructor(private userService: UserService, private alertify: AlertifyService,
    private authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.
    getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
    .subscribe(
      (res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    },
    error => {
      this.alertify.error(error);
    }
    );
  }


}
