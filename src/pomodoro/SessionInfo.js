import React from "react";
import { secondsToDuration } from "../utils/duration";

function getPercentageComplete(session) {
  if (!session) return 0;
  return (1 - session.timeRemaining / session.maxTime) * 100;
}

function SessionInfo({ session }) {
  return (
    session && (
      <>
        <div className='row mb-2'>
          <div className='col'>
            <h2 data-testid='session-title'>
              {session?.label} for {secondsToDuration(session?.maxTime)} minutes
            </h2>
            <p className='lead' data-testid='session-sub-title'>
              {secondsToDuration(session?.timeRemaining)} remaining
            </p>
          </div>
        </div>
        <div className='row mb-2'>
          <div className='col'>
            <div className='progress' style={{ height: "20px" }}>
              <div
                className='progress-bar'
                role='progressbar'
                aria-valuemin='0'
                aria-valuemax='100'
                aria-valuenow={`${getPercentageComplete(session)}`}
                style={{
                  width: `${getPercentageComplete(session)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default SessionInfo;
