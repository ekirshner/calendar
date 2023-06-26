import { memo } from 'react';
import '../App.css';

export const Day = memo(({day, handleDateClick, selected}) => ( //memoized to avoid rerenders
    day ?
        <div id={selected ? 'date-selected' : 'date'} onClick={() => handleDateClick(day)}>
            <p style={{textAlign: 'center'}}>{day}</p>
        </div>
        : 
        <div id='empty-date'></div>
    )
)