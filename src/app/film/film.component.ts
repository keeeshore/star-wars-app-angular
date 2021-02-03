import {Component, Input, OnInit} from '@angular/core';
import {HttpService} from '../services/http.service';
import {PeopleService} from '../services/people.service';

export interface FilmProps {
  title: string;
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {

  @Input() url: string;

  film: FilmProps = { title: 'loading...' };

  constructor(
    private httpService: HttpService,
    private peopleService: PeopleService,
    ) { }

  ngOnInit(): void {
    console.log('FilmComponent url :: ', this.url);
    this.httpService.get(this.url).subscribe(
      (response: FilmProps) => {
        console.log('Film get response: ', response);
        this.film = response;
        this.peopleService.updateFilm(this.film);
      },
      (err: any) => {
        console.log('Film get response: ', err);
      },
      () => {
        console.log('Film get FINAL DONE: ');
      });
  }

}
