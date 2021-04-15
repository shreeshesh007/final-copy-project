import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
 
  userObj;
  constructor( private us: UserService ,private router : Router,private ts:ToastrService) { }

  ngOnInit(): void {
    this.loginForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });
  }

  
  onSubmit()
  {
    let userCredObj=this.loginForm.value;

    
  
     this.us.loginUser(userCredObj).subscribe(
      res=>{
        if(res["message"]===["success"]){
          localStorage.setItem("token",res["signedToken"])
          localStorage.setItem("username",res["username"])

          this.router.navigateByUrl("/notes");
          this.ts.success('User logged in..!!!')
        }
        else{
          alert(res["message"])
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err)
      }
    )



  }


  onChange(){
    this.router.navigateByUrl("/register")
  }

  moveToPasswordReset(){
    this.router.navigateByUrl("/passwordreset")

  }
}
