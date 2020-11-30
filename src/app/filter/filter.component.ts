import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  @Output() public linkedClicked = new EventEmitter<String>();
  @Output() public successLaunche = new EventEmitter<String>();
  @Output() public successLand = new EventEmitter<String>();

  activeYear: any;
  activeLandFilter: any;
  activeLaunchFilter: any;
  filterValue = [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
  constructor() { }

  ngOnInit(): void {
    
  }


  setStateAsActive(year) {
    this.activeYear = year;
    this.linkedClicked.emit(year);

  }
  successLaunchFilter(state) {
    this.activeLaunchFilter = state;
    this.successLaunche.emit(state);

  }


  onLinkedClicked() {
    console.log('on click child');
    this.linkedClicked.emit('collapsed');
}

successLandFilter(state) {
  this.activeLandFilter = state;
  this.successLand.emit(state);
}
}
