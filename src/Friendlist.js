import { Friend } from "./Friend";

export function Friendlist({ friends, onSelection, selectedFriends }) {
  return (
    <>
      {friends.length === 0 ? (
        <ul style={{ display: "flex", alignItems: "center" }}>
          <p style={{ marginRight: 12, color: "red" }}>Start</p>
        </ul>
      ) : (
        <ul>
          {friends.map((friend) => (
            <Friend
              friend={friend}
              onSelection={onSelection}
              isSelected={selectedFriends.some((f) => f.id === friend.id)}
            ></Friend>
          ))}
        </ul>
      )}
    </>
  );
}
