import {Component, OnInit} from '@angular/core';
import {HttpService} from './services/http.service';
import {PeopleService} from './services/people.service';
import {PersonProps} from './person/person.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'star-wars-ng';

  constructor(
    private httpService: HttpService,
    private peopleService: PeopleService,
  ) {

  }

  ngOnInit(): void {
    this.peopleService.asPersonObservable().subscribe(
      (person: PersonProps) => this.title = person.name,
      (error: any) => { },
      () => {  },
    );
  }

}
