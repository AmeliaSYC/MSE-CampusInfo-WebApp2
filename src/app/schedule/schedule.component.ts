import { ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FullCalendarModule } from '@fullcalendar/angular';
import { Calendar } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule }  from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DOCUMENT } from '@angular/common';
import { Data } from '@angular/router';
import { render } from '@fullcalendar/core/preact';

export interface DialogData {
  title: string;
  name: string;
  text: string;
  time: string;
  location: string;
  mode: string;
  type: string;
}

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [
    HttpClientModule,
    FullCalendarModule, 
    FormsModule, 
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatSelectModule, 
    MatInputModule,
    MatDialogModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css',
})

export class ScheduleComponent {

//Selector
  profileCtr = new FormControl('');

  form = new FormGroup({profile: this.profileCtr});

//Calendar
//constructor(@Inject(DOCUMENT) private document: Document, private http: HttpClient, private dialog: MatDialog){
  //This prevents the "ReferenceError: document is not defined", but then the default selector doesn't work.
  constructor(private http: HttpClient, private dialog: MatDialog){ //This triggers the "ReferenceError: document is not defined", but the default selector works.
    function MSECalendar() {
      let selector: HTMLInputElement = document.querySelector("#selector")!;
      let calendarEl = document.getElementById('calendar')!;
      /* Create function to initialize the correct view */
      function mobileCheck() {
        if (window.innerWidth >= 768 ) {
            return false;
        } else {
            return true;
        }
    };

      let fcRecurSources = {
        AUT24Events: function(info, successCallback, failureCallback) {
          let AUT24Events: any [] = [];
          http.get('./assets/module_AUT24_WeekDay.json').subscribe((data: any) => {
            data.AUT24.forEach((event: any) => {
              AUT24Events.push({
                title: event.id,
                daysOfWeek: event.dayNum,
                startTime: event.startTime,
                endTime: event.endTime,
                startRecur: event.startDate,
                endRecur: event.endDate ,
                extendedProps: {
                  timeSlot: event.weekDay + ', ' + event.startTime + ' - ' + event.endTime,
                  duration: event.startTime + ' - ' + event.endTime,
                  room: event.room,
                  buildingRoom: event.venue + '  ' + event.room,
                  modeType: event.modeType
                },
              })
            }),
            successCallback(AUT24Events)
          })
        },

        SPR24ComWeek: function(info, successCallback, failureCallback){
          http.get('./assets/compensationWeek_SPR24.json').subscribe((data: any) => {
            let SPR24ComWeek: any[] = [];
            data.SPR24ComWeek.forEach((event: any) => {
              SPR24ComWeek.push({
                title: event.id,
                start: event.comStartTime,
                end: event.comEndTime,
                extendedProps: {
                  timeSlot: event.weekDay + ', ' + event.startTime + ' - ' + event.endTime,
                  duration: event.startTime + ' - ' + event.endTime,
                  room: event.room,
                  buildingRoom: event.venue + '  ' + event.room,
                  modeType: event.modeType,
                  profile_1: event.profile_1,
                  profile_2: event.profile_2,
                  profile_3: event.profile_3,
                  profile_4: event.profile_4,
                  profile_5: event.profile_5,
                  profile_6: event.profile_6,
                  profile_7: event.profile_7,
                  profile_8: event.profile_8,
                  profile_9: event.profile_9,
                  profile_10: event.profile_10,
                  profile_11: event.profile_11,
                  profile_12: event.profile_12,
                  profile_13: event.profile_13,
                  profile_14: event.profile_14
                },
              })
            }),
            successCallback(SPR24ComWeek)
          })
        },

        SPR24Events: function(info, successCallback, failureCallback) {
          http.get('./assets/module_SPR24_WeekDay.json').subscribe((data: any) => {
            let SPR24Events: any[] = [];
            data.SPR24.forEach((event: any) => {
              SPR24Events.push({
                title: event.id,
                daysOfWeek: event.dayNum,
                startTime: event.startTime,
                endTime: event.endTime,
                startRecur: event.startDate,
                endRecur: event.endDate,
                extendedProps: {
                  timeSlot: event.weekDay + ', ' + event.startTime + ' - ' + event.endTime,
                  duration: event.startTime + ' - ' + event.endTime,
                  room: event.room,
                  buildingRoom: event.venue + '  ' + event.room,
                  modeType: event.modeType,
                  profile_1: event.profile_1,
                  profile_2: event.profile_2,
                  profile_3: event.profile_3,
                  profile_4: event.profile_4,
                  profile_5: event.profile_5,
                  profile_6: event.profile_6,
                  profile_7: event.profile_7,
                  profile_8: event.profile_8,
                  profile_9: event.profile_9,
                  profile_10: event.profile_10,
                  profile_11: event.profile_11,
                  profile_12: event.profile_12,
                  profile_13: event.profile_13,
                  profile_14: event.profile_14
                },
              })
            }),
            successCallback(SPR24Events)
          })
        }
      };
      
      let calendar = new Calendar(calendarEl, { 
        plugins: [dayGridPlugin, timeGridPlugin,listPlugin, interactionPlugin],
        initialView: mobileCheck() ? 'timeGridDay' : 'timeGridWeek',
            /* Check if window resize and add the new view */
            windowResize: function(view) {
                if (window.innerWidth >= 768 ) {
                    calendar.changeView('timeGridWeek');
                } else {
                    calendar.changeView('timeGridDay');
                }
            },
        timeZone: 'Europe/Zurich',
        themeSystem: 'Spacelab',
        headerToolbar: {
          center: 'prev title next',
          start: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek today',
          end: ''
          },
        handleWindowResize: true,
        height: 700,
        slotEventOverlap: true,
        aspectRatio: 2,

        firstDay: 1,
        stickyHeaderDates: true,
        weekNumbers: true,
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          meridiem: false,
        },
        slotDuration: '00:15:00',
        slotMinTime: '08:00:00',
        slotMaxTime: '22:00:00',
        nowIndicator: true,
        allDaySlot: false,
        initialDate: '2024-05-01',

        eventDidMount: function(arg) {
          let val = selector.value;
          if (!(val == arg.event.extendedProps['profile_1'] || val == arg.event.extendedProps['profile_2'] 
              || val == arg.event.extendedProps['profile_3'] || val == arg.event.extendedProps['profile_4'] 
              || val == arg.event.extendedProps['profile_5'] || val == arg.event.extendedProps['profile_6'] 
              || val == arg.event.extendedProps['profile_7'] || val == arg.event.extendedProps['profile_8'] 
              || val == arg.event.extendedProps['profile_9'] || val == arg.event.extendedProps['profile_10'] 
              || val == arg.event.extendedProps['profile_11'] || val == arg.event.extendedProps['profile_12'] 
              || val == arg.event.extendedProps['profile_13'] || val == arg.event.extendedProps['profile_14'] 
              || val == "all")) 
          //{arg.el.style.display = "none";} //Setting property is done using event.setProp('display','none'), event.display = none will not work
          {arg.event.setProp('display','none')} //Event object has its display property set to 'none' before eventContent executes
        },

        eventClick: function(info) {
          dialog.open(DialogComponent, {
            data: {
              title: info.event.title,
              name: info.event.extendedProps['moduleName'],
              mode: info.event.extendedProps['modeType'],
              time: info.event.extendedProps['timeSlot'],
              location: info.event.extendedProps['buildingRoom']
            },
          });
        },

        eventSources: [
          fcRecurSources.AUT24Events,
          fcRecurSources.SPR24ComWeek,
          //fcRecurSources.SPR24CS,
          //fcRecurSources.SPR24Avi
          fcRecurSources.SPR24Events
          //fcRecurSources.mProfileEvents
        ],

        views: {
          //month
          month: {
            eventContent: function(eventInfo){
              return { 
                html: eventInfo.event.extendedProps['duration'] + '&nbsp;' +
                      '<b>' + eventInfo.event.title + '</b>' + '<br>' 
              }
            },
          },
          week: {
            eventContent: function(eventInfo){
              return { 
                html: '<b>' + eventInfo.event.title + '</b>' + '<br>' + 
                      eventInfo.event.extendedProps['room'] + '<br>' + 
                      eventInfo.event.extendedProps['duration']
              }
            },
          },
          day: {
            eventContent: function(eventInfo){
              return { 
                html: '<b>' + eventInfo.event.title + '</b>' + '<br>' + 
                      eventInfo.event.extendedProps['room'] + '<br>' + 
                      eventInfo.event.extendedProps['duration']
              }
            },
          },
          list: {
            displayEventTime: false,
            eventContent: function(eventInfo){
              return { 
                html: '<b>' + eventInfo.event.title + '</b>' + '<br>' + 
                      eventInfo.event.extendedProps['modeType'] + '<br>' + 
                      eventInfo.event.extendedProps['duration'] + '<br>' + 
                      eventInfo.event.extendedProps['room']
              }
            },
          }
        },
      });
      
      selector.addEventListener('change', function() {calendar.refetchEvents()});

      calendar.render();
    }

    if (document.readyState == 'interactive') {
      document.addEventListener('DOMContentLoaded', function() {
        MSECalendar();
      });
    } else {
      document.addEventListener('click', function() {
        //window.location.href = '/schedule'
        //MSECalendar();
        window.location.reload(); //better performance than .href due to the reload time 
      });
    }
  }
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  constructor(public dialog: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData){};
}

