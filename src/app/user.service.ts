
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from,Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private hc:HttpClient ) { }
  
  createUser(userObj):Observable<any>{
    return this.hc.post("/user/register",userObj);
  }

  loginUser(userCredObj):Observable<any>{
    return this.hc.post("/user/login",userCredObj);
  }
  
  createNotes(userObj):Observable<any>{
    return this.hc.post("/notes/addnote",userObj);
  }

  getDetails(username):Observable<any>{
    return this.hc.get("/notes/getdetails/"+username);
  }

  deleteNotes(id):Observable<any>{
    return this.hc.delete("/notes/deletenotes/"+id);
  }

  editNotes(notesObj):Observable<any>{
    return this.hc.put("/notes/update",notesObj)
  }

  changePassword(obj){
    return this.hc.post("/user/passwordreset",obj)
  }


  getreminder(time:string):Observable<any>{
    return this.hc.get("/notes/getreminder/"+time);
  }

}
