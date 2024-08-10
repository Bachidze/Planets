import { Link } from "react-router-dom";
import data from "../../data.json";

export default function Home() {
  return (
    <>
      <h1>HomePage</h1>
      {data.map((el) => (
        <div key={el.name}>
          <Link to={`/`}>
            <h1>{el.name}</h1>
          </Link>
        </div>
      ))}
    </>
  );
}
