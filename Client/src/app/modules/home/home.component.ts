import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HomeService } from './home.service';
import { BaseComponent } from '../../base/base.component';

// shared
import { User } from "../../shared/user/user";
import { UserService } from "../../shared/user/user.service";
//import { CourseService } from "../course/course.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent extends BaseComponent implements OnInit {
  model: any;
  rows: any;
  response: any;
  errors: any;
  view: any;

  get user(): User {
    return this._userService.user;
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private route: ActivatedRoute,
    private readonly router: Router,
    private readonly _homeService: HomeService,
    private breakpointObserver: BreakpointObserver,
    private readonly _userService: UserService,
    //private readonly _courseService: CourseService
    ) 
    {
    super();
  }

  ngOnInit(): void {
    this._userService.loadUser();
    if (this.user && this.user.role) {
      this._homeService.getInstructorCourses(this.user.id).then(response => {
        this.rows = response;
        console.log(this.rows);
      });
    } else if(this.user && !this.user.role) {
      this._homeService.getStudentCourses().then(response => {
        this.rows = response;
        console.log(this.rows);
      });
      // this._courseService.getAssignments().then(response =>{ //get student assignments
      //   this.rows = response;
      // });
    }
    this.view = 1;
    this.model = {};
  }

  resetViewstate() {
    this.errors = {};
  }

  loadCourse(courseId) {
    this.router.navigate(['course'], { state: { courseId: courseId }, relativeTo: this.route.parent });
  }

  loadAssignment(assignmentId) {
    this.router.navigate(['assignment'], { state: { assignmentId: assignmentId }, relativeTo: this.route.parent });
  }
}
