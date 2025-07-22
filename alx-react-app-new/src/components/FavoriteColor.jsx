import { useState } from "react";

function FavoriteColor() {
  const [color, setColor] = useState("red");
  return (
    <div>
        <h1>My favorite color is {color}.</h1>

        <button onClick={()=>setColor("blue")}>Set Blue</button>
    </div>
  );
}

export default FavoriteColor;
