import { data } from "autoprefixer";
import React, { useEffect } from "react";
import { colorslice } from "../utils/store";
import { useState } from "react";
const Pokemon = ({ name, url }) => {
  const [types, setTypes] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const handlePokemon = async () => {
    const res = await fetch(url);
    const data = await res.json();
    const varieties = await fetch(data.varieties[0].pokemon.url);
    const varietiesData = await varieties.json();
    setTypes(varietiesData.types.map((type) => type.type.name));
    setPokemon(varietiesData);
  };
  useEffect(() => {
    handlePokemon();
  }, [url]);

  {
   return pokemon && (
      <div
        style={{
          backgroundColor: colorslice.getInitialState()[`${types[0]}`],
          background: `linear-gradient(90deg, ${
            colorslice.getInitialState()[`${types[0]}`]
          } 0%, ${colorslice.getInitialState()[`${types[1]}`]} 100%)`,
        }}
        className="md:h-[10rem] md:w-[10rem] flex flex-col  items-center  uppercase cursor-pointer p-3
         md:m-2 rounded-xl"
      >
        <div className="text-center font-bold">#{pokemon?.id}</div>
        <img src={pokemon?.sprites?.front_default} alt={name} />
        <div className="md:font-semibold">{name}</div>
      </div>
    );
  }
};

export default Pokemon;
