import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-passwordreset',
  templateUrl: './passwordreset.component.html',
  styleUrls: ['./passwordreset.component.css']
})
export class PasswordresetComponent implements OnInit {
  passwordForm:FormGroup;
  status=false;
  constructor(private us:UserService,private router:Router , private ts:ToastrService) { }

  ngOnInit(): void {
    this.passwordForm=new FormGroup({
      username:new FormControl(null,Validators.required),
      password1:new FormControl(null,Validators.required),
      password2:new FormControl(null,Validators.required)
    });
  }

  
onSubmit(){
  let obj=this.passwordForm.value;
  console.log("pass is",this.passwordForm.value)

  if(obj.password1===obj.password2){
    console.log("passwords are same")
this.us.changePassword(obj).subscribe(
  res=>{
    if(res["message"]==="success"){
      this.ts.success('Password reset Successful...!!!');
      this.router.navigateByUrl("/login");
    }
  }
)
  }
  else{
    this.status=true
  }
}



}
