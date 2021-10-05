import { onSnapshot, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "./firebase";
import Dot from "./Dot";
import {
  handleNew,
  handleEdit,
  handleDelete,
  handleQueryDelete,
} from "./utils";

export default function App() {
  const [colors, setColors] = useState([{ name: "Loading...", id: "initial" }]);

  useEffect(
    () =>
      onSnapshot(collection(db, "colors"), (snapshot) =>
        setColors(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      ),
    []
  );

  return (
    <div className="root">
      <button className="button" onClick={handleNew}>
        New
      </button>
      <button className="button" onClick={handleQueryDelete}>
        Query Delete
      </button>

      <ul>
        {colors.map((color) => (
          <li key={color.id}>
            <button className="button2" onClick={() => handleEdit(color.id)}>
              edit
            </button>
            <button className="button2" onClick={() => handleDelete(color.id)}>
              delete
            </button>
            <Dot color={color.value} /> {color.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
