import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight, faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons'
import { Day } from './Day';
import { useState, useCallback } from 'react';
import { DateTime } from "luxon";
import '../App.css';

const weekdays = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']

export const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(DateTime.local())
    const totalDaysInMonth = currentDate.daysInMonth
    //index of the day of the week that the first day of the month lands on
    const firstOfMonthWeekdayIndex = DateTime.fromObject({month: currentDate.month, year: currentDate.year, day: 1}).weekday
    //add "empty day" placeholders to number of days in month
    const numOfDayPlaceholders = totalDaysInMonth + firstOfMonthWeekdayIndex 

    const daysArr = Array.from(Array(numOfDayPlaceholders), 
        (_,x) => {
            ++x //base 1 index                      //subtract the number of "empty day" placeholders from the current index to get the date
            return ({dayOfMonth: x < firstOfMonthWeekdayIndex ? undefined : x - firstOfMonthWeekdayIndex, key: x}) 
        }
    )

    console.log('The selected date is ' + currentDate.toFormat('MMMM dd yyyy'))

    const handleMonthChange = (type) => {
        setCurrentDate(prevDate => type === 'back' ? prevDate.minus({ month: 1 }) : prevDate.plus({ month: 1 }))
    }

    const handleYearChange = (type) => {
        setCurrentDate(prevDate => type === 'back' ? prevDate.minus({ year: 1 }) : prevDate.plus({ year: 1 }))
    }

    const handleDateClick = useCallback(date => {
        setCurrentDate(prevDate => prevDate.set({day: date}))
    }, [])

    const handleTodayClick = () => {
        setCurrentDate(DateTime.local())
    }


    return (
        <div id='calendar-wrapper'>
            <h2 id='erica-header'>Erica's Fabulous Calendar</h2>

            <div id='calendar-header'>
                <FontAwesomeIcon icon={faAngleDoubleLeft} onClick={() => handleYearChange('back')} />
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => handleMonthChange('back')} />
                {currentDate.toFormat('MMMM')} {currentDate.year}
                <FontAwesomeIcon icon={faArrowRight} onClick={() => handleMonthChange('forward')} />
                <FontAwesomeIcon icon={faAngleDoubleRight} onClick={() => handleYearChange('forward')} />
            </div>
            
            <div id='calendar-weekday-header'>
                {weekdays.map(day => (<div key={day} style={{width: '52px'}}>{day}</div>))}
            </div>

            <div id='calendar-days-wrapper'>
                {daysArr.map(({dayOfMonth, key}) => <Day key={key} handleDateClick={handleDateClick} selected={currentDate.day === dayOfMonth} day={dayOfMonth} />)}
            </div>
            <div id='today-button' onClick={handleTodayClick}>Today</div>
        </div>
    )
}