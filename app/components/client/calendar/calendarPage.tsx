'use client'
import React, { useRef, useEffect, useState } from 'react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

export default function CalendarPage() {
    const calendarRef:any = useRef(null);

    useEffect(() => {
        const calendar = new Calendar(calendarRef.current, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            initialView: 'dayGridMonth',
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,listWeek'
            }
        });

        const eventsToCalendar = (taskDates:any) => {
            for(var i=0 ; i < taskDates.length; i++){
                console.log(taskDates[i])
                if(taskDates[i].task_status == 0){
                    calendar.addEvent({
                        title: taskDates[i].task_detail_name,
                        start: taskDates[i].task_deadline,
                        allDay: true,
                        url: `/taskDetails?task_id=${taskDates[i].task_id}`
                    })
                }
            }
        }

        const getTaskDates = async () => {
            const response = await fetch('/api/getTasksDates')
            const result = await response.json()
            console.log(result)
            eventsToCalendar(result)
        }

        getTaskDates()
        calendar.render();
    }, []);

    return (
        <>
            <div ref={calendarRef} id='calendarDiv'></div>
        </>
    );
}