import { Component } from '@angular/core';
import { University } from '../pages/university/university';
import { Group } from '../pages/group/group';
import { InstituteCreation } from '../pages/institute-creation/institute-creation';

@Component({
  selector: 'app-academic-config-tabs',
  standalone: false,
  templateUrl: './academic-config-tabs.html',
  styleUrl: './academic-config-tabs.css',
})
export class AcademicConfigTabs {
  myTabs = [
    {
      title: 'University',
      component: University,
    },
    {
      title: 'Group',
      component: Group,
    },
    {
      title: 'Institute Creation',
      component: InstituteCreation
    }
  ];
}
