import { useState } from "react";
import { AvatarGallery } from "./AvatarGallery";
import { Button } from "./Button";

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  function handleSelectAvatar(avatarUrl) {
    setImg(avatarUrl); // Updates the img state with the selected avatar URL
  }

  function handleSubmit(e) {
    e.preventDefault();

    //Conditions
    if (!name || !img) return;

    const id = crypto.randomUUID();
    //New Friend Object that will receive the values of each event of the form when submitted
    const newFriend = {
      name,
      image: img,
      balance: 0,
      id,
    };
    onAddFriend(newFriend);

    setName("");
    setImg("https://i.pravatar.cc/48");
  }

  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="👩🏻👨🏾 Friend Name"
      ></input>
      <p>📷 Avatar</p>
      <AvatarGallery selectAvatar={handleSelectAvatar}></AvatarGallery>
      <Button>Add</Button>
    </form>
  );
}
