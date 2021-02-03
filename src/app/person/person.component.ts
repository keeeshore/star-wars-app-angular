import { Component, OnInit } from '@angular/core';
import {PeopleService} from '../services/people.service';

export interface PersonProps {
  name?: string;
  height?: string;
  mass?: string;
  url?: string;
  birth_year?: string;
  gender?: string;
  films: Array<string>;
}

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss']
})
export class PersonComponent implements OnInit {

  constructor(private peopleService: PeopleService) { }

  person: PersonProps = { films: [] };

  ngOnInit(): void {
    this.peopleService.personSubject.subscribe(
      (person: PersonProps) => {
        console.log('Person component personSubject result ==== ', person);
        this.person = person;
        },
      (error: any) => { console.log('Person component  personSubject error ==== ', error); },
      () => { console.log('Person component personSubject complete ==== '); },
      );
  }

}
