import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  
  constructor( private us: UserService , private router: Router, private ts:ToastrService) { }

  ngOnInit(): void {
    this.registerForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      email:new FormControl(null,Validators.required),
      password:new FormControl(null,Validators.required)
    });
  }

  onSubmit()
  {
    let userObj=this.registerForm.value;
    
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"]=="user already exists"){
          this.ts.success('Username already exists','Please choose another Username');
          //alert("username already exists take another username");
        }
        if(res["message"]=="user created"){
          this.ts.success('User created Successfully..!!!');
         // alert("user created");
          this.router.navigateByUrl("/login");
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err);
      }
    )
  }

  
  onChange(){
    this.router.navigateByUrl("/login")
  }


}
