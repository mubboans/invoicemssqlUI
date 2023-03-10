import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'primeng-lts/accordion';
import { AvatarModule } from 'primeng-lts/avatar';
import { ButtonModule } from 'primeng-lts/button';
import { CalendarModule } from 'primeng-lts/calendar';
import { CardModule } from 'primeng-lts/card';
import { CarouselModule } from 'primeng-lts/carousel';
import { CheckboxModule } from 'primeng-lts/checkbox';
import { ConfirmDialogModule } from 'primeng-lts/confirmdialog';
import { ContextMenuModule } from 'primeng-lts/contextmenu';
import { DataViewModule } from 'primeng-lts/dataview';
import { DialogModule } from 'primeng-lts/dialog';
import { DropdownModule } from 'primeng-lts/dropdown';
import { DynamicDialogModule } from 'primeng-lts/dynamicdialog';
import { FieldsetModule } from 'primeng-lts/fieldset';
import { FileUploadModule } from 'primeng-lts/fileupload';
import { InputMaskModule } from 'primeng-lts/inputmask';
import { InputNumberModule } from 'primeng-lts/inputnumber';
import { InputSwitchModule } from 'primeng-lts/inputswitch';
import { InputTextModule } from 'primeng-lts/inputtext';
import { InputTextareaModule } from 'primeng-lts/inputtextarea';
import { MenubarModule } from 'primeng-lts/menubar';
import { MultiSelectModule } from 'primeng-lts/multiselect';
import { ProgressBarModule } from 'primeng-lts/progressbar';
import { ProgressSpinnerModule } from 'primeng-lts/progressspinner';
import { RadioButtonModule } from 'primeng-lts/radiobutton';
import { RatingModule } from 'primeng-lts/rating';
import { RippleModule } from 'primeng-lts/ripple';
import { SelectButtonModule } from 'primeng-lts/selectbutton';
import { SidebarModule } from 'primeng-lts/sidebar';
import { SliderModule } from 'primeng-lts/slider';
import { TableModule } from 'primeng-lts/table';
import { TabMenuModule } from 'primeng-lts/tabmenu';
import { TabViewModule } from 'primeng-lts/tabview';
import { TagModule } from 'primeng-lts/tag';
import { TieredMenuModule } from 'primeng-lts/tieredmenu';
import { TimelineModule } from 'primeng-lts/timeline';
import { ToastModule } from 'primeng-lts/toast';
import { ToggleButtonModule } from 'primeng-lts/togglebutton';
import { ToolbarModule } from 'primeng-lts/toolbar';
import { TooltipModule } from 'primeng-lts/tooltip';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { ConfirmationService, MessageService } from 'primeng-lts/api';
import {PasswordModule} from 'primeng-lts/password';
import {OrderListModule} from 'primeng-lts/orderlist';
import {AutoCompleteModule} from 'primeng-lts/autocomplete';
@NgModule({
  declarations: [],
  imports: [
    AutoCompleteModule,
    CommonModule,
    PasswordModule,
    OrderListModule,
    TableModule,
    MultiSelectModule,
    DataViewModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DropdownModule,
   CheckboxModule,
    TabMenuModule,
    AppRoutingModule,
    MenubarModule,
    TieredMenuModule,
    ButtonModule,
    SidebarModule,
    FieldsetModule,
    CommonModule,
    FormsModule,
    CheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputSwitchModule,
    CardModule,
    CarouselModule,
    TooltipModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		ContextMenuModule,
    FormsModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,    
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    TagModule,
    InputMaskModule,
    DynamicDialogModule,
    RippleModule,
    AvatarModule,
    TabViewModule,
    TimelineModule,
    ProgressSpinnerModule,
    ToggleButtonModule,
    AccordionModule,
  ],
  exports:[
    AutoCompleteModule,
    CommonModule,
    OrderListModule,
    TableModule,
    PasswordModule,
    MultiSelectModule,
    DataViewModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DropdownModule,
   CheckboxModule,
    TabMenuModule,
    AppRoutingModule,
    MenubarModule,
    TieredMenuModule,
    ButtonModule,
    SidebarModule,
    FieldsetModule,
    CommonModule,
    FormsModule,
    CheckboxModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputSwitchModule,
    CardModule,
    CarouselModule,
    TooltipModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		ContextMenuModule,
    FormsModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    CheckboxModule,    
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    SelectButtonModule,
    TagModule,
    InputMaskModule,
    DynamicDialogModule,
    RippleModule,
    AvatarModule,
    TabViewModule,
    TimelineModule,
    ProgressSpinnerModule,
    ToggleButtonModule,
    AccordionModule,
  ],
  providers:[MessageService,ConfirmationService]
})
export class ShareModule { }