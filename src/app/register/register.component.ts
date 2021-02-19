import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  //inject user sevice
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(formRef: { value: any }){
    let userObj=formRef.value;
    //console.log(userObj);
    this.us.createUser(userObj).subscribe(
      res=>{

        if(res["message"]=="user existed"){
          alert("username is already exists")

        }
        if(res["message"]=="user created"){
          alert("successfully registered");

          //navigate to login component
          this.router.navigateByUrl("/dashboard")
        }


      },
      err=>{
        alert("something went wrong in user creation")
        console.log(err)

      }
    )

  }

}