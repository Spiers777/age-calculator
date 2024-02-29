import moment from 'moment';
import React from 'react';
import { useState } from 'react';
import "./css/Calculator.css";
import arrowImage from './assets/images/icon-arrow.svg';

function Calculator() {
  const [days, setDays] = useState("--")
  const [months, setMonths] = useState("--")
  const [years, setYears] = useState("--")

  const [dayError, setDayError] = useState(null);
  const [monthError, setMonthError] = useState(null);
  const [yearError, setYearError] = useState(null);

  const calculateAge = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const day = formData.get("day");
    const month = formData.get("month");
    const year = formData.get("year");
    const today = moment();
    const birthDate = moment(`${year}-${month}-${day}`, "YYYY-MM-DD");

    let hasErrors = false;
    setDayError("");
    setMonthError("");
    setYearError("");

    const daysInMonth = moment(`${year}-${month}`, "YYYY-MM").daysInMonth() || 31;

    if (!day) {
      setDayError("Day is required");
      hasErrors = true;
    } else {
      if (day > daysInMonth || day < 1) {
        setDayError("Invalid day");
        hasErrors = true;
      }
    }

    if (!month) {
      setMonthError("Month is required");
      hasErrors = true;
    } else {
      if (month > 12 || month < 1) {
        setMonthError("Invalid month");
        hasErrors = true;
      }
    }

    if (!year) {
      setYearError("Year is required");
      hasErrors = true;
    } else {
      if (!moment(year, "YYYY", true).isValid()) {
        setYearError("Invalid year");
        hasErrors = true;
      } else {
        if (moment(year, "YYYY").isAfter(today)) {
          setYearError("Year must be in the past");
          hasErrors = true;
        }
      }
    }

    if (!hasErrors) {
      const years = today.diff(birthDate, 'years');
      birthDate.add(years, 'years');

      const months = today.diff(birthDate, 'months');
      birthDate.add(months, 'months');

      const days = today.diff(birthDate, 'days');
      setYears(years);
      setMonths(months);
      setDays(days);
    } else {
      setYears("--");
      setMonths("--");
      setDays("--");
    }
  }

  return (
    <>
      <div className='calculator-container'>
        <form onSubmit={calculateAge} className='input-form'>
          <div className='inputs'>
            <div className='input-container'>
              <label htmlFor="day" className={dayError ? "error-msg" : ""}>DAY</label>
              <input type="number" id="day" name="day" className={dayError ? "error-box" : ""} />
              <p className='error-msg'>{dayError}</p>
            </div>

            <div className='input-container'>
              <label htmlFor="month" className={monthError ? "error-msg" : ""}>MONTH</label>
              <input type="number" id="month" name="month" className={monthError ? "error-box" : ""} />
              <p className='error-msg'>{monthError}</p>
            </div>
            <div className='input-container'>
              <label htmlFor="year" className={yearError ? "error-msg" : null}>YEAR</label>
              <input type="number" id="year" name="year" className={yearError ? "error-box" : ""} />
              <p className='error-msg'>{yearError}</p>
            </div>
          </div>
          <div className='submit-divider'>
            <button type="submit" className='submit-btn'>
              <img src={arrowImage} alt="Submit" />
            </button>
          </div>
        </form>
        <div className="output">
          <h1><span>{years}</span>years</h1>
          <h1><span>{months}</span>months</h1>
          <h1><span>{days}</span>days</h1>
        </div>
      </div>
    </>
  )
}

export default Calculator
