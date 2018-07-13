import React from 'react';

const Calendar = (props) => {
  return (
    <div id="calendar">
      <div style={{ fontFamily: 'sans-serif', paddingLeft: '10px', paddingTop: '20px', fontSize: '24px' }}>Choose Dates</div>
      <div id="dateSelection">
        <label hmtlfor="start" style={{ fontFamily: 'sans-serif' }}>Start Date: </label>
        <input type="date" id="start" name="trip" onChange={props.handleStartDateChange}
          // value="2018-07-22"
        min="2018-01-01" max="2018-12-31" style={{ padding: '10px' }}
        />
        <label htmlfor="end" style={{ fontFamily: 'sans-serif' }}>End Date: </label>
        <input type="date" id="end" name="trip" onChange={props.handleEndDateChange}
        // value="2018-07-29"
        min="2018-01-01" max="2018-12-31" style={{ padding: '10px' }}
        />

        <button onClick={props.getHistoricalBPI}>Update Chart</button>
      </div>
    </div>
  );
};

export default Calendar;
