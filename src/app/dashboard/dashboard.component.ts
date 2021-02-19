import { UserService } from '../user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private us:UserService,private router:Router) { }
  ngOnInit(): void {
  }
  onSubmit(formRef: { value: any; }){
    let userCredObj=formRef.value;
    //console.log(userCredObj)
    //if user
      this.us.loginUser(userCredObj).subscribe(
        res=>{
          if(res["message"]=="success"){
 
            //store token and username in local storasge
            localStorage.setItem("token",res["signedToken"])
            localStorage.setItem("username",res["username"])
            
            //navigate to user dashboard
            this.router.navigateByUrl("/userschedule")
          }
          else{
            alert(res["message"])
          }
        },
        err=>{
          alert("something went wrong in login object")
          console.log(err)
        }
      )
    }
}