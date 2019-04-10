import { Injectable } from '@angular/core';

import { User } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

	public searchOptions = [];
	public usersData: User[];

  constructor() { }

  filteredListOptions() {
  	let users = this.usersData;
  	let filteredList = [];

  	for (let user of users) {
  		for(let options of this.searchOptions) {
  			if (options.name === user.name) {
  				filteredList.push(user);
  			}
  		}
  	}

  	console.log(filteredList);
  	return filteredList;
  }

}
