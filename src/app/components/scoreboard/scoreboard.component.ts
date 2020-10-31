import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Players } from 'src/app/interfaces/players';
import { CoursesService } from 'src/app/services/courses.service';
import { PlayersService } from 'src/app/services/players.service';
import { FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.scss']
})
export class ScoreboardComponent implements OnInit {
  // courses: Courses[]
  tees: string[] = ["Pro", "Champion", "Men", "Women"]
	tee: string = ""
  name: string;
  image: any
  courseInfo: any
  handicap9 = []
  handicap18 = []

  back9: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  front9: string[] = ['10', '11', '12', '13', '14', '15', '16', '17', '18'];
  course9Holes = []
  course18Holes = []
  course9Yards = []
  course18Yards = []
  totalYards = []
  totalY: number

  totalPar = []
  totalP: number

  front9TotalPar: number
  front9TotalYards: number
  back9TotalPar: number
  back9TotalYards: number

  course9Par = []
  course18Par = []
  players: Players[] = []
  playerId = 0
  playerFormControl = new FormControl('', this.nameValidator());



  constructor(
    private route: ActivatedRoute,
    private courseService: CoursesService,
    private playerService: PlayersService,
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this.courseService.getCourseById(id).subscribe(data => {
      this.image = data.thumbnail
      this.name = data.name
      this.courseInfo = data.holes

      for(let i = 0; i <= 8; i++ ) {
        this.course9Yards.push(this.courseInfo[i].teeBoxes[0].yards)
        this.course9Par.push(this.courseInfo[i].teeBoxes[0].par)
        this.handicap9.push(this.courseInfo[i].teeBoxes[0].hcp)

        this.course9Holes.push(this.courseInfo[i].hole)
        this.front9TotalPar = this.course9Par.reduce(function(a, b){ return a + b; }, 0);
        this.front9TotalYards = this.course9Yards.reduce(function(a, b){ return a + b; }, 0);
      }
      for(let i = 9; i <= 17; i++ ) {
        this.course18Yards.push(this.courseInfo[i].teeBoxes[0].yards)
        this.course18Par.push(this.courseInfo[i].teeBoxes[0].par)
        this.handicap18.push(this.courseInfo[i].teeBoxes[0].hcp)
        this.course18Holes.push(this.courseInfo[i].hole)
        this.back9TotalPar = this.course18Par.reduce(function(a, b){ return a + b; }, 0);
        this.back9TotalYards = this.course18Yards.reduce(function(a, b){ return a + b; }, 0);

      }
      for(let i = 0; i <= 17; i++ ) {
        this.totalYards.push(this.courseInfo[i].teeBoxes[0].yards)
        this.totalPar.push(this.courseInfo[i].teeBoxes[0].par)
        this.totalY = this.totalYards.reduce(function(a, b){ return a + b; }, 0);
        this.totalP = this.totalPar.reduce(function(a, b){ return a + b; }, 0);

      }
    })

    this.playerService.getPlayer().subscribe(players => {
      this.players = players;
    });

  }

  addPlayer(): void {
    if (this.playerFormControl.value) {
      this.playerId++;
      this.players.push({
        name: this.playerFormControl.value,
        id: this.playerId.toString(),
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
        13: 0,
        14: 0,
        15: 0,
        16: 0,
        17: 0,
        18: 0
      });
      this.playerFormControl.setValue('');
    }
  }
  getFrontTotal(player: Players): number {
    // for(let i = 1;  i => 9; i++){
    //   return player[i].reduce(function(a, b){ return a + b; }, 0);
    //needs player hole score obj in an array inside of this obj
    // }
    return player[1] + player[2] + player[3] + player[4] + player[5] + player[6] + player[7] + player[8] + player[9];
  }

  getBackTotal(player: Players): number {
    // for(let i = 10; i=> 18; i++){
    //   return player[i].reduce(function(a, b){ return a + b; }, 0);
    // }
    return player[10] + player[11] + player[12] + player[13] + player[14] + player[15] + player[16] + player[17] + player[18];
  }

  getTotal(player: Players): number {
    return player[1] + player[2] + player[3] + player[4] + player[5] +
    player[6] + player[7] + player[8] + player[9] + player[10] + player[11] +
    player[12] + player[13] + player[14] + player[15] + player[16] + player[17] + player[18];
  }

  nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let error = null;
      if (this.players && this.players.length) {
        this.players.forEach(player => {
          if (player.name.toLowerCase() === control.value.toLowerCase()) {
            error = {duplicate: true};
          }
        });
      }
      return error;
    };
  }


  deletePlayer(player: Players, index: number) {
    if (player.id) {
      this.playerService.deletePlayer(player);
    }
    this.players.splice(index, 1);

  }


    updateData(): void {
      this.players.forEach(player => {
        if(player.id) {
          this.playerService.updateScore(player);
        } else {
          this.playerService.saveUser(player);
        }
      });
    }



}
