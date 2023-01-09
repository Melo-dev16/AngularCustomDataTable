import { Component } from '@angular/core';
import { TableColumn } from './shared/models/TableColumn';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CustomDataTable';

  columns: TableColumn[] = [
    {
      name: 'Avatar',
      property: 'avatar',
      type: 'avatar',
      sortable: false
    },
    {
      name: 'Nom & Prénoms',
      property: 'fullname',
      type: 'string',
      sortable: true
    },
    {
      name: 'Date d\'ajout',
      property: 'createdAt',
      type: 'date',
      sortable: true
    },
    {
      name: 'Actif',
      property: 'active',
      type: 'boolean',
      sortable: true
    }
  ]

  data = [
    {
      id: 1,
      avatar: 'avatar.png',
      fullname: 'Will Quentin',
      createdAt: new Date('2023-01-07'),
      active: true
    },
    {
      id: 2,
      avatar: 'avatar.png',
      fullname: 'Aziz Zawad',
      createdAt: new Date('2023-01-07'),
      active: false
    },
    {
      id: 3,
      avatar: 'avatar.png',
      fullname: 'Samuel Xi',
      createdAt: new Date('2023-01-07'),
      active: false
    },
    {
      id: 4,
      avatar: 'avatar.png',
      fullname: 'Charles Donnie',
      createdAt: new Date('2023-01-07'),
      active: true
    },
    {
      id: 5,
      avatar: 'avatar.png',
      fullname: 'Erwin Rohan',
      createdAt: new Date('2023-01-07'),
      active: false
    },
    {
      id: 6,
      avatar: 'avatar.png',
      fullname: 'Frederic Van Burden',
      createdAt: new Date('2023-01-07'),
      active: true
    },
    {
      id: 7,
      avatar: 'avatar.png',
      fullname: 'Gerard Thunder',
      createdAt: new Date('2023-01-07'),
      active: true
    },
    {
      id: 8,
      avatar: 'avatar.png',
      fullname: 'Yann Hughes',
      createdAt: new Date('2023-01-07'),
      active: false
    },
    {
      id: 9,
      avatar: 'avatar.png',
      fullname: 'Nina Jojo Bizarre',
      createdAt: new Date('2023-01-07'),
      active: true
    },
    {
      id: 10,
      avatar: 'avatar.png',
      fullname: 'Ursula Ibiza',
      createdAt: new Date('2023-01-07'),
      active: false
    },
    {
      id: 11,
      avatar: 'avatar.png',
      fullname: 'Kevin Lassale',
      createdAt: new Date('2023-01-07'),
      active: false
    },
  ]
}
