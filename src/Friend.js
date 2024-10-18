import { Button } from "./Button";

export function Friend({ friend, onSelection, isSelected }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you {Math.abs(friend.balance)}$
        </p>
      )}
      {friend.balance === 0 && <p>You and your {friend.name} are even</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Deselect" : "Select"}
      </Button>{" "}
    </li>
  );
}
