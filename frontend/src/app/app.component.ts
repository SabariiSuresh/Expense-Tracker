import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AutoLogoutService } from './auto-logout.service';
import { LoaderService } from './loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , AfterViewInit{

  isLoading = false;
  
  constructor(private autoLogService : AutoLogoutService , private loaderService: LoaderService , private cdref: ChangeDetectorRef ){}

  ngAfterViewInit(): void {
    this.cdref.detectChanges();
  }

   ngOnInit(): void {
    this.loaderService.loder$.subscribe((status) => {
  
      Promise.resolve().then(() => {
        this.isLoading = status;
      });
    });

    this.autoLogService.startwatching();
  }


}
