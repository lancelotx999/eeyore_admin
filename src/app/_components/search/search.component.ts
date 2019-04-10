import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

import { SearchService, UserService } from '../../_services';
import { User } from '../../_models';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

	public          filters: Observable<string[]>;
	public         allUsers: User[];
	public autoCompleteList: any[];

  public searchControl = new FormControl();

	@ViewChild('autocompleteInput') autocompleteInput: ElementRef;
	@Output() onSelectedOption = new EventEmitter();

  constructor(
    private searchService: SearchService,
    private   userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data: User[]) => {
      this.allUsers = data; // change to services
    });

  	this.searchControl.valueChanges.subscribe(userInput => {
  		this.autoCompleteExpenseList(userInput);
  	});
  }

  private autoCompleteExpenseList(input) {
  	let categoryList = this.filterCategoryList(input);
  	this.autoCompleteList = categoryList;
  }

  // this is where filtering the data happens according to you typed value
  filterCategoryList(val) {
  	var categoryList = [];
  	if (typeof val != "string") { return []; }
  	if (val === '' || val === null) { return []; }
  	return val ? this.allUsers.filter( s => 
  		s.name.toLowerCase().indexOf(val.toLowerCase()) != -1) : this.allUsers;
  }

  // after you clicked an autosuggest option, 
  // this function will show the field you want to show in input
  displayFn(user: User) {
  	let k = user ? user.name : user;
  	return k;
  }

  filterList(event) {
  	var users = event.source.value;
  	if (!users) { 
  		this.searchService.searchOptions = []; 
  	} else {
  		this.searchService.searchOptions.push(users);
  		this.onSelectedOption.emit(this.searchService.searchOptions);
  	}
  	
  	this.focusOnPlaceInput();
  }

  removeOption(option) {
  	let index = this.searchService.searchOptions.indexOf(option);
  	if (index => 0) { 
  		this.searchService.searchOptions.splice(index, 1); 
  	}

  	this.focusOnPlaceInput();
  	this.onSelectedOption.emit(this.searchService.searchOptions);
  }

  // focus the input field and remove any unwanted text
  focusOnPlaceInput() {
  	this.autocompleteInput.nativeElement.focus();
  	this.autocompleteInput.nativeElement.value = '';
  }

}
