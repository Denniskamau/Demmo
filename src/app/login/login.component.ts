import { Component,ElementRef, ViewChild  } from "@angular/core";
import { User } from "../services/user.model";

import { Page } from "tns-core-modules/ui/page/page";
import { alert, prompt } from "tns-core-modules/ui/dialogs";
import { RouterExtensions } from "nativescript-angular/router";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css']
})
export class LoginComponent { 

    isLoggingIn = true;
    loginStatus = false;
    phoneNumberValidity = false;
    user : User;
    processing = false;
    @ViewChild("password", {static: false}) password: ElementRef;
    @ViewChild("confirmPassword", {static: false}) confirmPassword: ElementRef;
    

    constructor(private page: Page, private routerExtensions: RouterExtensions){
        
        // this.page.actionBarHidden = true;
        this.user = new User();
        this.user.email = "dennis@gmail.com";
        this.user.password = "password";
        this.user.phoneNumber = "123-345-3456"
        
    }

    toggleForm(){
        this.isLoggingIn = !this.isLoggingIn;
    }

    submit(){
        if (!this.user.email || !this.user.password) {
            this.alert("Please provide both an email address and password.");
            return;
        }
        this.processing = true;
        if(this.isLoggingIn){
            this.login();
        }else{
            this.register();
        }

    }
    login() {
        if(this.user){
            this.processing = false;
            if (this.validatePhoneNumber(this.user.phoneNumber)){
                this.loginStatus = true;
                this.routerExtensions.navigate(["/home"], { clearHistory: true });
            }
            else{
                this.loginStatus = false;
                this.alert("Invalid phone number");
            }
          
        }else{
            this.processing = false;
            this.loginStatus = false;
            this.alert("Unfortunately we could not find your account.");
        }
     
    }
    register(){
        if (this.user.password != this.user.confirmPassword) {
            this.alert("Your passwords do not match.");
            this.processing =false;
            return;
        }else{
            this.processing = false;
            this.alert("Your account was successfully created.");
            this.isLoggingIn = true;
        }
    }

    validatePhoneNumber(phone){
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if(phoneno.test(phone)) {
            this.phoneNumberValidity = true;
          return true;
        }
        else {
          this.phoneNumberValidity = false
          return false;
        }

    }

    alert(message: string) {
        return alert({
            title: "APP NAME",
            okButtonText: "OK",
            message: message
        });
    }

    focusPassword() {
        this.password.nativeElement.focus();
    }
    focusConfirmPassword() {
        if (!this.isLoggingIn) {
            this.confirmPassword.nativeElement.focus();
        }
    }

    forgotPassword(){
        console.log('forgot password')
    }
}
