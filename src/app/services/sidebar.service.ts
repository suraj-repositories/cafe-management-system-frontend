import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isSidebarOpen = new BehaviorSubject<boolean>(window.innerWidth >= 992);
  isSidebarOpen$ = this.isSidebarOpen.asObservable();

  setSidebarState(isOpen: boolean) {
    this.isSidebarOpen.next(isOpen);
  }


}
