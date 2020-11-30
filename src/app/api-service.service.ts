import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = 'https://api.spacexdata.com/v3/launches'
  constructor(
    private http: HttpClient
  ) { 
    
  }

  getLaunches(limit, queryParams?) {
    // if(queryParams && queryParams.launch_year) {
    //   queryParams['launch_year'] = queryParams.launch_year
    // }
    // if(queryParams && queryParams.land_success) {
    //   queryParams['land_succes'] = queryParams.land_succes
    // }
    if(queryParams) {
      const URL = this.baseUrl + `?limit=${limit}`;
      return this.http.get(URL, {params: queryParams});
    } else {
      const URL = this.baseUrl + `?limit=${limit}`
      return this.http.get(URL);
    }
  }
}
