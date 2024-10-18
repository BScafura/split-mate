import { useState } from "react";
import { Button } from "./Button";

export function FormSplitBill({ friends, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("You");
  const [friendExpense, setFriendExpense] = useState({}); // To store each friend's expense

  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !paidByUser) return; // Ensure the bill and paidByUser are entered

    // Build the contributions object, including "You"
    const contributions = {
      You: Number(paidByUser), // Your contribution
      ...friendExpense, // Friends' contributions
    };

    // Pass the total bill, who paid, and the contributions to the parent component
    onSplitBill({
      payer: whoIsPaying, // Who paid: You or a friend
      amount: Number(bill), // The total bill amount
      contributions, // The object with everyone's contributions
    });
  }

  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>
        Split the bill with{" "}
        {friends.map((friend, index) => (
          <span>
            {index === friends.length - 1 && friends.length !== 1
              ? `and ${friend.name}`
              : friend.name}{" "}
          </span>
        ))}{" "}
      </h2>
      <div>
        <label>💰 Bill value</label>
        <input
          type="text"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        ></input>
      </div>
      <div>
        <label> 🫵🏻 Your expense</label>
        <input
          max={bill}
          type="text"
          value={paidByUser}
          onChange={(e) =>
            setPaidByUser(
              Number(e.target.value) > bill
                ? paidByUser
                : Number(e.target.value)
            )
          }
        ></input>
      </div>
      {friends.map((friend, index) => (
        <div key={friend.name}>
          <label> 🧑‍🤝‍👩🏻 {friend.name}'s expense</label>
          <input
            type="number"
            value={friendExpense[friend.name] || ""} // Get the current value from state or default to an empty string
            onChange={(e) => {
              const newExpense = Number(e.target.value);
              setFriendExpense({
                ...friendExpense,
                [friend.name]: newExpense,
              });
            }}
            max={
              index === 0 // For the first friend
                ? bill - paidByUser
                : bill - paidByUser - (friendExpense[friends[0].name] || 0) // For the second friend, subtract the first friend's expense
            }
          />
        </div>
      ))}
      <div>
        <label>🫰🏻 Who is paying?</label>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option>You</option>
          {friends.map((friend) => (
            <>
              {" "}
              <option key={friend.name} value={friend.name}>
                {" "}
                {friend.name}{" "}
              </option>
            </>
          ))}
        </select>
      </div>
      <Button type="submit">Split</Button>
    </form>
  );
}
