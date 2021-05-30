import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import SessionInfo from "./SessionInfo";
import DurationSettings from "./DurationSettings";
import PausePlay from "./PausePlay";

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
        maxTime: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      maxTime: focusDuration * 60,
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {
  const defaultDurations = { focus: 25, break: 5 };
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);
  const [durations, setDurations] = useState({ ...defaultDurations });

  const timeAdjustmentStep = { break: 1, focus: 5 };
  const timeBounds = {
    break: {
      max: 15,
      min: 1,
    },
    focus: {
      max: 60,
      min: 5,
    },
  };

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(
    /// ToDo: achange isTimer running back to 1000
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(durations.focus, durations.break));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: durations.focus * 60,
              maxTime: durations.focus * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  const updateDurations = ({ target }) => {
    const button = target.tagName === "SPAN" ? target.parentNode : target;
    const valueToUpdate = button.dataset.modifies;
    const action = button.dataset.action;

    const value =
      action === "increase"
        ? Math.min(
            timeBounds[valueToUpdate].max,
            durations[valueToUpdate] + timeAdjustmentStep[valueToUpdate]
          )
        : action === "decrease"
        ? Math.max(
            timeBounds[valueToUpdate].min,
            durations[valueToUpdate] - timeAdjustmentStep[valueToUpdate]
          )
        : durations[valueToUpdate];
    setDurations((durations) => {
      return { ...durations, [valueToUpdate]: value };
    });
  };

  const stopHandler = () => {
    setIsTimerRunning(false);
    setSession(null);
  };

  return (
    <div className='pomodoro'>
      <DurationSettings
        durations={durations}
        disabled={!!session}
        updateDurations={updateDurations}
      />
      <PausePlay
        session={session}
        stopHandler={stopHandler}
        isTimerRunning={isTimerRunning}
        playPause={playPause}
      />
      <SessionInfo session={session} />
    </div>
  );
}

export default Pomodoro;
