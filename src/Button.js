export function Button({ children, handleShowAddFriend, onClick }) {
  return (
    <button onClick={onClick || handleShowAddFriend} className="button">
      {children}
    </button>
  );
}
