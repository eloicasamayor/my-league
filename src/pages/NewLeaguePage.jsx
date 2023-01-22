import { useRef } from "react";
import { PlusIcon } from "../components/icons/PlusIcon";
import { useState } from "react";

export function NewLeaguePage() {
  const teamsRefs = useRef([]);
  const nameRef = useRef();
  const descriptionRef = useRef();
  const [teamsQuantity, setTeamsQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <>
      <h1>New league</h1>
      <ol className="h-8 flex gap-2 m-2">
        <li className=" p-2 btn " onClick={() => setSelectedTab(0)}>
          1. League info
        </li>
        <li className=" p-2 btn" onClick={() => setSelectedTab(1)}>
          2. Teams
        </li>

        <li className=" p-2 btn" onClick={() => setSelectedTab(2)}>
          3. Matchings
        </li>
      </ol>
      {selectedTab === 0 && (
        <section>
          <h2>League info</h2>
          <div>
            <label>{"Name"}</label>
            <input type={"text"} ref={nameRef} />
          </div>
          <div>
            <label>{"Description"}</label>
            <input type={"text"} ref={descriptionRef} />
          </div>
          <div>
            <label>{"Logo"}</label>
            <input type={"file"} />
          </div>
        </section>
      )}
      {selectedTab === 1 && (
        <section>
          <h2>Teams</h2>
          <form>
            {[...Array(teamsQuantity)].map((team, i) => (
              <div>
                <label>{"Team " + i}</label>
                <input
                  type={"text"}
                  ref={(el) => (teamsRefs.current[i] = el)}
                />
              </div>
            ))}
            <button
              onClick={(e) => {
                e.preventDefault();
                setTeamsQuantity((q) => q + 1);
              }}
            >
              <PlusIcon />
            </button>
          </form>
        </section>
      )}
      {selectedTab === 2 && (
        <section>
          <h2>Generate matchings</h2>
          <button>Generate</button>
        </section>
      )}
    </>
  );
}
