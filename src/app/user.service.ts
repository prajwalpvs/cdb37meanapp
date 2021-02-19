import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //inject httpClient obj
  constructor(private hc:HttpClient) { }

  //userregisteration
  createUser(userObj: any):Observable<any>{

   return  this.hc.post("/user/register",userObj)
   
  }
  loginUser(userCredObj: any):Observable<any>{
    return this.hc.post("/user/dashboard",userCredObj)
  }

createactivity(useractivityObj:object):Observable<any>{​​​​​​​​
return this.hc.post("/user/activity",useractivityObj)
  }​​​​​​​​
 
getactivity():Observable<any>{​​​​​​​​
return this.hc.get("/user/getactivity")
  }​​​​​​​​


}