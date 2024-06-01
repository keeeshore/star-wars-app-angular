import {Component, OnInit, Output} from '@angular/core';
import {PeopleService} from '../services/people.service';
import {PersonProps} from '../person/person.component';

export interface PeopleProps {
  status: string;
  count: number;
  next?: string;
  previous?: string;
  results: Array<PersonProps>;
}

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  @Output() people: PeopleProps = { status: '', count: 0, results: [] };

  constructor(
    private peopleService: PeopleService
    ) {
    this.peopleService.asObservable().subscribe(
      (result: any) => {
        console.log('People component peopleService result ==== ', result);
        this.people = result;
      },
      (error: any) => { console.log('People component  peopleService error ==== ', error); },
      () => { console.log('People component peopleService complete ==== '); },
    );
  }

  ngOnInit(): void {
    this.peopleService.getPeople('https://swapi.dev/api/people/');
    // this.peopleService.getPeople('http://localhost:4200/api/people/');
  }

  updatePerson(person: PersonProps): void {
    console.log('updatePerson clicked', person);
    this.peopleService.updatePerson(person);
  }

  nextPage(e): void {
    console.log('Next page clicked', e);
    this.peopleService.getPeople(this.people.next);
  }

  prevPage(e): void {
    console.log('Prev page clicked, ', e);
    this.peopleService.getPeople(this.people.previous);
  }

}
