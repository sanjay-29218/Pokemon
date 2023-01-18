import Link from "next/link";
import React, { useEffect } from "react";
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
const Evolution = ({ evolutionChain }) => {
  const [prevEvolution, setPrevEvolution] = React.useState(null);
  const [nextEvolution, setNextEvolution] = React.useState(null);
  const [prevtypes, setPrevTypes] = React.useState([]);
  const [nexttypes, setNextTypes] = React.useState([]);
  async function getPrevEvolution(url) {
    const response = await fetch(url);
    const data = await response.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    const data2 = await res.json();
    setPrevTypes(data2.types.map((type) => type.type.name));
    setPrevEvolution(data2);
  }
  async function getNextEvolution(url) {
    const response = await fetch(url);
    const data = await response.json();
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${data.id}`);
    const data2 = await res.json();
    setNextTypes(data2.types.map((type) => type.type.name));
    setNextEvolution(data2);
  }
  async function getEvolution() {
    const response = await fetch(evolutionChain);
    const data = await response.json();
    getPrevEvolution(data.chain.species.url);
    getNextEvolution(data.chain.evolves_to[0]?.evolves_to[0]?.species.url);
  }
  useEffect(() => {
    getEvolution();
  }, []);

  return (
    <div className="flex gap-10 items-center justify-center ">
      {prevEvolution && (
        <div className="uppercase flex flex-col items-center justify-center">
          <h1>#{prevEvolution.id}</h1>
          <Link href={`/pokemon/${prevEvolution.name}`}>
            {" "}
            <img
              src={prevEvolution.sprites.other.dream_world.front_default}
              className={`h-[6rem] w-[6rem] ${prevtypes[0]} p-2 rounded-full`}
              alt=""
            />
          </Link>
          <p className="font-mono"> {prevEvolution.name}</p>
        </div>
      )}
      <DoubleArrowIcon/>

      {nextEvolution && (
        <div className="uppercase flex flex-col items-center justify-center">
          <h1>#{nextEvolution.id}</h1>
          <Link href={`/pokemon/${nextEvolution.name}`}>
            {" "}
            <img
              src={nextEvolution.sprites.other.dream_world.front_default}
              className={`h-[6rem] p-2 w-[10rem] ${nexttypes[0]}   rounded-full`}
              alt=""
            />
          </Link>
          <p className="font-mono">{nextEvolution.name}</p>
        </div>
      )}
    </div>
  );
};

export default Evolution;
