import { useState } from "react";
import { Button } from "./Button";
import { FormAddFriend } from "./FormAddFriend";
import { FormSplitBill } from "./FormSplitBill";
import { Friendlist } from "./Friendlist";
import { Title } from "./Title";

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);

  function handleSplitBill({ payer, contributions }) {
    setFriends((prevFriends) =>
      prevFriends.map((friend) => {
        const contribution = contributions[friend.name] || 0; // Get how much this friend contributed
        const totalContribution = contributions["You"] || 0; // Your contribution

        if (payer === "You") {
          return {
            ...friend,
            balance: friend.balance + contribution, // They owe you
          };
        } else if (payer === friend.name) {
          return {
            ...friend,
            balance: friend.balance - totalContribution, // You owe this friend
          };
        }
        return friend; // Return unchanged for others
      })
    );

    setSelectedFriends([]);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSetSelectedFriend(friend) {
    setSelectedFriends((selectedFriends) => {
      if (selectedFriends.includes(friend)) {
        // Deselect friend if already selected
        return selectedFriends.filter((f) => f.id !== friend.id);
      } else {
        // Select the friend
        return [...selectedFriends, friend];
      }
    });
  }

  function handleShowAddFriend() {
    setShowAddFriend(!showAddFriend);
  }

  return (
    <>
      <Title></Title>
      <div
        className="app"
        style={
          friends.length === 0
            ? {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }
            : {}
        }
      >
        <div className="sidebar">
          <Friendlist
            friends={friends}
            onSelection={handleSetSelectedFriend}
            selectedFriends={selectedFriends}
          />
          {showAddFriend && (
            <FormAddFriend friends={friends} onAddFriend={handleAddFriend} />
          )}
          <Button handleShowAddFriend={handleShowAddFriend}>
            {showAddFriend ? "Close" : "AddFriend"}
          </Button>
        </div>
        {selectedFriends.length === 0 ? (
          <></>
        ) : (
          <FormSplitBill
            friends={selectedFriends}
            onSplitBill={handleSplitBill}
          ></FormSplitBill>
        )}
      </div>
    </>
  );
}
