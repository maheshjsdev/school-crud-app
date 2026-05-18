import { Component, Input, OnInit } from '@angular/core';

interface MenuItem {
  key: string;
  title: string;
  icon: string;
  badge?: number;
  badgeColor?: string;
  children?: MenuItem[];
  disabled?: boolean;
  tag?: string;
  tagColor?: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar implements OnInit {
  @Input() isCollapsed = false;
  userOpen = false;

  ngOnInit(): void {
    const savedState = localStorage.getItem('sidebarCollapsed');

    if (savedState !== null) {
      this.isCollapsed = JSON.parse(savedState);
    }
  }

  toggleCollapse(value: boolean): void {

    this.isCollapsed = value;

    localStorage.setItem(
      'sidebarCollapsed',
      JSON.stringify(this.isCollapsed)
    );
  }

  

}