import { Component, OnInit } from '@angular/core';
import {​​​​​​​​ Router }​​​​​​​​ from'@angular/router';
import {​​​​​​​​ UserService }​​​​​​​​ from'../user.service';



@Component({
  selector: 'app-userschedule',
  templateUrl: './userschedule.component.html',
  styleUrls: ['./userschedule.component.css']
})
export class UserscheduleComponent implements OnInit {
 
  activities=[];
  username1:any;
 
  constructor(private  us:UserService, private router:Router) { }
 
  ngOnInit(): void {
    this.username1=localStorage.getItem("username")
 
    this.us.getactivity().subscribe(
      res=>{
         this.activities=res["message"]
        //  console.log("message")
      },
      err=>{
        console.log(err)
      }
    )
  }
  userLogout(){
    //clear local storage
    localStorage.clear();
    //navigate to home
    this.router.navigateByUrl("/register")
  }
  onSubmit(formRef: { value: any; }){
    let userObj=formRef.value;
    //console.log(userObj)
    this.us.createUser(userObj).subscribe(
      res=>{
           
            if(res["message"]==" user activity created"){
              alert("Registration success")
 
              //navigate to login component
              
            }
 
      },
      err=>{
        alert("Something went wrong in user creation")
        console.log(err)
      }
    )
  }
 
}
