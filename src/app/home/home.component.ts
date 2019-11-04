import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";


@Component({
    selector: "app-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public counter: number = 16;
    message = "You have successfully authenticated. This is where you build your core application functionality.";

    constructor( private routerExtensions: RouterExtensions) {
    }


    ngOnInit(): void {
    }

    logout() {
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
    }

    public get getMessage():string{
        if(this.counter > 0){
            return this.counter + " taps left";
        }else{
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }

    public onTap(){
        this.counter--;
    }


}


