import { Injectable } from '@angular/core';
import {HttpInterceptor,HttpRequest,HttpHandler,HttpEvent} from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutherizationService implements HttpInterceptor{

  constructor() { }
  intercept(req:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
    //get token from localstorage
    let token=localStorage.getItem("token");
    //if token is existed
    if(token){
      //add token to header of req obj
      let transformedReqObj=req.clone({
        headers:req.headers.set("Authorization","Bearer "+token)
      })
      //forward req obj to backend
      return next.handle(transformedReqObj)
    }
    else{
      //forward req obj as it is to backend
      return next.handle(req)
    }
  }
}
