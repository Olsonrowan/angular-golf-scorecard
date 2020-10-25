import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';
import { Courses } from '../../interfaces/courses'
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
 courses: Courses[];
  constructor(
    private coursesService: CoursesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.coursesService.getCourses().subscribe(courses => {
      this.courses = courses.courses;
      console.log(this.courses);
    });
  }

  goToCourse(courseId: number): void {
    this.router.navigate(['scoreboard/courseId', {id: courseId}]);
}

}
