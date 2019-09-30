import { ProcessHttpMsgService } from './process-http-msg.service';
import { baseURL } from './../shared/baseurl';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {LEADERS} from './../shared/leaders';
import {Leader} from './../shared/leader';
import {of, Observable} from 'rxjs';
import { delay, catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor(
    private http:HttpClient,
    private processHttpMsgService: ProcessHttpMsgService,
  ) { }


  getLeaders() : Observable<Leader[]>{
    return this.http.get<Leader[]>(
      baseURL + 'leadership'
    ).pipe(catchError(this.processHttpMsgService.handleError));
  }
  getFeaturedLeader() : Observable<Leader> {
    return this.http.get<Leader[]>(
      baseURL + "leadership?featured=true"
    ).pipe(map(leaders=>leaders[0]))
    .pipe(catchError(this.processHttpMsgService.handleError));
  }
}
