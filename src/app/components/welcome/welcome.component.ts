import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  courseOne = []
  courseHoles =  []
  test: any

  constructor(
    private courseService: CoursesService
  ) { }

  ngOnInit(): void {


  }

}
