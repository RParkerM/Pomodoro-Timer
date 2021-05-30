import React from "react";
import { minutesToDuration } from "../utils/duration";

function DurationSettings({ durations, session, updateDurations, disabled }) {
  return (
    <div className='row'>
      <div className='col'>
        <div className='input-group input-group-lg mb-2'>
          <span className='input-group-text' data-testid='duration-focus'>
            Focus Duration: {minutesToDuration(durations.focus)}
          </span>
          <div className='input-group-append'>
            <button
              type='button'
              className='btn btn-secondary'
              data-testid='decrease-focus'
              data-modifies='focus'
              data-action='decrease'
              disabled={disabled}
              onClick={updateDurations}
            >
              <span className='oi oi-minus' />
            </button>
            <button
              type='button'
              className='btn btn-secondary'
              data-modifies='focus'
              disabled={disabled}
              data-testid='increase-focus'
              onClick={updateDurations}
              data-action='increase'
            >
              <span className='oi oi-plus' />
            </button>
          </div>
        </div>
      </div>
      <div className='col'>
        <div className='float-sm-right'>
          <div className='input-group input-group-lg mb-2'>
            <span className='input-group-text' data-testid='duration-break'>
              Break Duration: {minutesToDuration(durations.break)}
            </span>
            <div className='input-group-append'>
              <button
                type='button'
                className='btn btn-secondary'
                disabled={disabled}
                data-modifies='break'
                data-action='decrease'
                data-testid='decrease-break'
                onClick={updateDurations}
              >
                <span className='oi oi-minus' />
              </button>
              <button
                type='button'
                className='btn btn-secondary'
                disabled={disabled}
                data-modifies='break'
                data-action='increase'
                data-testid='increase-break'
                onClick={updateDurations}
              >
                <span className='oi oi-plus' />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DurationSettings;
