import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {PeopleProps} from '../people/people.component';
import {HttpService} from '../services/http.service';
import {PersonProps} from '../person/person.component';
import {FilmProps} from '../film/film.component';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  peopleSubject: BehaviorSubject<PeopleProps> = new BehaviorSubject({ status: 'OK', count: 0, results: [] });

  personSubject: BehaviorSubject<PersonProps> = new BehaviorSubject({ films: [] });

  filmSubject: BehaviorSubject<FilmProps> = new BehaviorSubject({ title: '' });

  constructor(private httpService: HttpService) {}

  asObservable(): Observable<PeopleProps> {
    return this.peopleSubject.asObservable();
  }

  asPersonObservable(): Observable<PersonProps> {
    return this.personSubject.asObservable();
  }

  asFilmObservable(): Observable<FilmProps> {
    return this.filmSubject.asObservable();
  }

  next(result: PeopleProps): void {
    this.peopleSubject.next(result);
  }

  getPeople(url: string): any {
    this.next({...this.peopleSubject.getValue(), ...{ status: 'loading' }});
    this.httpService.get(url).subscribe(
      (response: any) => {
        console.log('People get response: ', response);
        this.next({...response, ...{ status: 'OK' }});
      },
      (err: any) => {
        console.log('People get response: ', err);
      },
      () => {
        console.log('People get FINAL DONE: ');
      });
  }

  updatePerson(person: PersonProps): void {
    this.personSubject.next(person);
  }

  updateFilm(film: FilmProps): void {
    this.filmSubject.next(film);
  }
}
