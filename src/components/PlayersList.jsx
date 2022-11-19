import { useGetPlayersQuery } from "../api/players";
export function PlayersList() {
  const players = useGetPlayersQuery();
  return (
    <section>
      <h2>Players</h2>
      {players.isLoading ? (
        <h3>loading players...</h3>
      ) : (
        <table>
          <tr>
            <th>{"player name"}</th>
            <th>{"id"}</th>
            <th>{"team"}</th>
            <th>{"scored goals"}</th>
            <th>{"scored goals home"}</th>
            <th>{"scored goals away"}</th>
          </tr>
          {players.data.map((player) => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.id}</td>
              <td>{player.team}</td>
              <td>{player.scored_goals}</td>
              <td>{player.scored_goals_home}</td>
              <td>{player.scored_goals_away}</td>
            </tr>
          ))}
        </table>
      )}
    </section>
  );
}
