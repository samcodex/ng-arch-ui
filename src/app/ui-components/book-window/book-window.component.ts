import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-book-window',
  templateUrl: './book-window.component.html',
  styleUrls: ['./book-window.component.css']
})
export class BookWindowComponent implements OnInit, OnDestroy, AfterViewInit {
  title: string;

  constructor() { }

  ngOnInit() {
    console.log('BookWindowComponent - ngOnInit');
  }

  ngAfterViewInit() {
    console.log('BookWindowComponent - ngAfterViewInit');
  }

  ngOnDestroy() {
    console.log('BookWindowComponent - Destroy');
  }
}
