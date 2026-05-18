import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { Sidebar } from './components/sidebar/sidebar';
import { Header } from './components/header/header';
import { Loader } from './components/loader/loader';
import { FormInput } from './components/form-input/form-input';
import { FormField } from './components/form-field/form-field';

// ng-zorro Modules
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDrawerModule, } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
const icons = [UserOutline, TeamOutline, FileOutline, MenuFoldOutline, MenuUnfoldOutline, SettingOutline];
import {
  UserOutline,
  TeamOutline,
  FileOutline,
  MenuFoldOutline,
  MenuUnfoldOutline,
  SettingOutline
} from '@ant-design/icons-angular/icons';
import { Tabs } from './components/tabs/tabs';
import { Drawer } from './components/drawer/drawer';
import { Settings } from './components/settings/settings';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@NgModule({
  declarations: [Header, Sidebar, Loader, FormInput, FormField, Tabs, Drawer, Settings],
  imports: [
    // Angular
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // ng-zorro
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTagModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzDropdownModule,
    NzTooltipModule,
    NzSwitchModule,
    NzBreadCrumbModule,
    NzSelectModule,
    NzTabsModule,
    NzDrawerModule,
    NzFormModule,
    NzFlexModule


  ],
  providers: [{ provide: NZ_ICONS, useValue: icons }],
  exports: [
    // Components
    Header,
    Sidebar,
    Loader,
    FormInput,
    FormField,
    Tabs,
    Drawer,
    Settings,
    // ng-zorro icons
    // Angular (re-export so feature modules don't need to re-import)
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // ng-zorro (re-export so any module importing SharedModule gets them)
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule,
    NzTagModule,
    NzButtonModule,
    NzInputModule,
    NzDividerModule,
    NzDropdownModule,
    NzTooltipModule,
    NzSwitchModule,
    NzBreadCrumbModule,
    NzSelectModule,
    NzTabsModule,
    NzDrawerModule,
    NzFormModule,
    NzFlexModule
  ],
})
export class SharedModule { }
