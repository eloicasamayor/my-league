// Dependencies
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

// Api
import { useUpdateLeagueMutation, useGetLeaguesQuery } from "../api/leagues";
import { useUpdateMatchMutation } from "../api/matches";

export function EditMatchForm({ id, localTeam, visitorTeam, played, localGoals, visitorGoals, localScorers, visitorScorers }) {
  const [updateMatch, requestResult] = useUpdateMatchMutation();
  const [playedValue, setPlayedValue] = useState();
  const [localGoalsValue, setLocalGoalsValue] = useState();
  const [visitorGoalsValue, setVisitorGoalsValue] = useState();

  useEffect(() => {
    setLocalGoalsValue(localGoals);
    setVisitorGoalsValue(visitorGoals);
    setPlayedValue(played);
  }, [id]);

  
  const idRef = useRef();
  const localScorersRef = useRef([]);
  const visitorScorersRef = useRef([]);
  
  function renderScorersInputs(goals, scorersList, refList){
    var elements = [];
    for(let i =0; i < goals; i++){
        elements.push(
        <input 
          type={'text'}
          key={i} 
          ref={(el) => (refList.current[i] = el)}
          defaultValue={scorersList.length && scorersList[i]}>
        </input>);
    }
    return elements;
  }
  
  return (
    <><h2>Edit Match</h2>
      <form>
        <label htmlFor={"id"}>Id:</label>
        <input type={"text"} id={"id"} name={"id"} defaultValue={id} ref={idRef} disabled/>
        <br />
        <div><label htmlFor={"played"}>Played:</label>
        <input type={"checkbox"} id={"played"} name={"played"} checked={playedValue} onChange={(e)=> {setPlayedValue(e.target.checked) }}/>
        </div>
        {playedValue &&
        <>
          <label htmlFor={"localGoals"}>{'Local team: '+localTeam}</label>
          <input
            type={"number"}
            id={"localGoals"}
            name={"localGoals"}
            placeholder={'local goals'}
            onChange={(e)=>{setLocalGoalsValue(parseInt(e.target.value))}}
            value={localGoalsValue}
          />
         
          {localGoalsValue && 
          <div>
            <label>{'local scorers:'}</label>
            {renderScorersInputs(localGoalsValue, localScorers, localScorersRef)}
          </div>}
         
          <label htmlFor={"description"}>{'Visitor team: '+visitorTeam}</label>
          <input
            type={"number"}
            id={"visitorGoals"}
            name={"visitorGoals"}
            value={visitorGoalsValue}
            onChange={(e)=>{setVisitorGoalsValue(parseInt(e.target.value))}}
            placeholder={'visitor scorers'}
          />
          {visitorGoalsValue && 
          <div>
            <label>{'visitor scorers:'}</label>
            {renderScorersInputs(visitorGoalsValue, visitorScorers, visitorScorersRef)}
          </div>}
        </>}
        <br />
        <button
          type={"button"}
          onClick={(e) => {
            e.preventDefault();
            updateMatch({
              id,
              played: playedValue,
              local_goals: localGoalsValue,
              visitor_goals: visitorGoalsValue,
              local_scorers: localScorersRef.current.map(ref=>ref.value),
              visitor_scorers: visitorScorersRef.current.map(ref=>ref.value)
            });
          }}
        >
          submit
        </button></form>
        
    </>
  );
}
