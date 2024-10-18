import { useState } from "react";

export function AvatarGallery({ selectAvatar }) {
  const style = "micah"; // Avatar style
  const seeds = [
    "Adrian",
    "Eden",
    "Aiden",
    "Aidan",
    "Avery",
    "George",
    "Eliza",
    "Mackenzie",
    "Riley",
    "Kimberly",
  ]; // Seeds
  const [selectedSeed, setSelectedSeed] = useState(null); // Store the selected avatar seed

  // Function to handle avatar click
  function handleAvatarClick(seed) {
    const avatarUrl = `https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`;
    setSelectedSeed(seed); // Set the clicked avatar as selected
    selectAvatar(avatarUrl); // Pass the avatar URL to the parent
  }

  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "15px" }}>
      {seeds.map((seed, index) => (
        <img
          key={index}
          src={`https://api.dicebear.com/9.x/${style}/svg?seed=${seed}`}
          alt={`Avatar for ${seed}`}
          onClick={() => handleAvatarClick(seed)} // Set as selected on click
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            cursor: "pointer",
            border: selectedSeed === seed ? "3px solid blue" : "none", // Highlight selected avatar
            boxShadow:
              selectedSeed === seed ? "0 0 10px rgba(0, 0, 255, 0.5)" : "none", // Optional shadow
          }}
        />
      ))}
    </div>
  );
}
