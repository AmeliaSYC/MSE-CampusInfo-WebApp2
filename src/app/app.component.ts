import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LayoutModule } from '@angular/cdk/layout';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MainNavComponent } from "./main-nav/main-nav.component";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2gHlxw6vBpbJP9W2ffh8vuTr7x5nNIYY",
  authDomain: "campusinfowebapp.firebaseapp.com",
  projectId: "campusinfowebapp",
  storageBucket: "campusinfowebapp.firebasestorage.app",
  messagingSenderId: "1096303364112",
  appId: "1:1096303364112:web:ca4de29baf99721341e295"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [
    LayoutModule,
    MainNavComponent
]
})
export class AppComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  title = 'MSE CampusInfoApp';
}
