import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import { tw } from 'twin.macro';
import LinearProgress from "@mui/material/LinearProgress";
import Evolution from "../../com/Evolution";
import Navbar from "../../com/Navbar";
import Skeleton from "@mui/material/Skeleton";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
import InfoIcon from "@mui/icons-material/Info";
import { colorslice } from "../../utils/store";
const PokemonScreen = ({ name }) => {
  const router = useRouter();
  const [pokemon, setPokemon] = useState(null);
  const [types, setTypes] = useState(null);
  const [styles, setStyles] = useState(null);
  const [species, setSpecies] = useState(null);
  const [bio, setBio] = useState("");
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [value, setValue] = React.useState("recents");
  const [state, setState] = useState({
    info: true,
    stat: false,
    evolution: false,
  });
  const handleChange = (event, newValue) => {
    if (newValue === "info") {
      setState({
        info: true,
        stat: false,
        evolution: false,
      });
    }
    if (newValue === "stat") {
      setState({
        info: false,
        stat: true,
        evolution: false,
      });
    }
    if (newValue === "evolution") {
      setState({
        info: false,
        stat: false,
        evolution: true,
      });
    }

    setValue(newValue);
  };
  const handlePokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1000`);
    const data = await res.json();
    const requiredPokemon = data.results.filter((pokemon) => {
      return pokemon.name === name;
    });
    const requiredurl = requiredPokemon[0]?.url;
    const res2 = await fetch(requiredurl);
    const data2 = await res2.json();
    setTypes(data2.types.map((type) => type.type.name));
    setPokemon(data2);
    handleSpecies(data2.id);
  };
  const handleSpecies = async (id) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
    const data = await res.json();
    const species = data.genera.filter((genus) => {
      return genus.language.name === "en";
    });
    setEvolutionChain(data.evolution_chain?.url);
    setSpecies(species);
    const englishFlavorText = data.flavor_text_entries.filter((flavor) => {
      return flavor.language.name === "en";
    });
    setBio(englishFlavorText[0]?.flavor_text);
  };

  useEffect(() => {
    handlePokemon();
  }, [router.isReady, name]);
  return (
    <div className="">
      <Navbar />
      {pokemon && types ? (
        <div
          style={{
            backgroundColor: colorslice.getInitialState()[`${types[0]}`],
            background: `linear-gradient(90deg, ${
              colorslice.getInitialState()[`${types[0]}`]
            } 0%, ${colorslice.getInitialState()[`${types[1]}`]} 100%)`,
          }}
          className={`    flex md:h-screen min:h-screen   md:p-[8rem] `}
        >
          <div className=" hidden md:flex   p-5 gap-10  bg-slate-100 w-[90%] justify-between items-center ">
            {/* image section of the pokemon */}
            <div>
              <h1 className="text-center">#{pokemon.id}</h1>
              <img
                className={`w-[30vw] h-[30vh]  ${types[0]}`}
                src={pokemon && pokemon.sprites.other.dream_world.front_default}
                alt=""
              />

              <h1 className="text-center uppercase font-mono ">
                {pokemon.name}
              </h1>
              {/* <div className="font-extrabold">Types:</div> */}
              <div className="flex justify-between">
                {types.map((type, i) => (
                  <div
                    style={{
                      backgroundColor:
                        colorslice.getInitialState()[`${types[i]}`],
                    }}
                    className={`${types[i]} px-10 p-2 font-semibold`}
                    key={i}
                  >
                    {type}
                  </div>
                ))}
              </div>
            </div>
            {/* Secondary stat with scrolling */}
            <div className=" flex flex-col gap-10 h-[100%] overflow-scroll w-[50%] overflow-x-hidden b">
              <div className="">
                <p className="font-thin font-mono py-5">{bio}</p>
                <h1>Bio</h1>
                <hr />
                <table>
                  <tbody>
                    <tr>
                      <td className="pr-[5rem] font-semibold">Genus</td>
                      <td>
                        {" "}
                        {species &&
                          species.map((genus, i) => (
                            <li className="list-none " key={i}>
                              {genus.genus}
                            </li>
                          ))}
                      </td>
                    </tr>
                    <tr>
                      <td className="pr-[5rem] font-semibold">Height</td>
                      <td>{pokemon.height}</td>
                    </tr>
                    <tr>
                      <td className="pr-[5rem] font-semibold">Weight</td>
                      <td>{pokemon.weight}</td>
                    </tr>
                    <tr>
                      <td className="pr-[5rem] font-semibold">Abilities</td>
                      <td>
                        {pokemon.abilities.map((ability, i) => (
                          <li className="list-none " key={i}>
                            {ability.ability.name}
                          </li>
                        ))}
                      </td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex gap-3 items-center"></div>

              <div className="  ">
                <h1 className="font-bold  ">Stats</h1>
                <hr />
                <table>
                  <tbody>
                    <tr>
                      <td className="font-bold pr-5">HP</td>

                      <td className="">
                        <LinearProgress
                          className="w-[10rem]"
                          variant="determinate"
                          value={pokemon.stats[0].base_stat}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-5">Attack</td>
                      <td>
                        <LinearProgress
                          variant="determinate"
                          value={pokemon.stats[1].base_stat}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-5">Defense</td>
                      <td>
                        <LinearProgress
                          variant="determinate"
                          value={pokemon.stats[2].base_stat}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="font-bold pr-5">Special Attack</td>
                      <td>
                        <LinearProgress
                          variant="determinate"
                          value={pokemon.stats[3].base_stat}
                        />
                      </td>
                    </tr>

                    <tr>
                      <td className="font-bold ">Abilities:</td>
                      <td>
                        {/* {pokemon.abilities.map((ability, i) => (
                        <li className="list-none " key={i}>
                          {ability.ability.name}
                        </li>
                      ))} */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <h1 className="">Moves</h1>
                <hr />
                <ul className="flex flex-wrap">
                  {pokemon &&
                    pokemon.moves.slice(0, 6).map((move, i) => (
                      <li className="w-[10rem]" key={i}>
                        {move.move.name}
                      </li>
                    ))}
                </ul>
              </div>
              <div>
                <h1 className="">Abilities</h1>
                <hr />
                <ul className="flex flex-wrap">
                  {pokemon &&
                    pokemon.abilities.map((ability, i) => (
                      <li className="w-[10rem]" key={i}>
                        {ability.ability.name}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            {/* Primary bio section */}
            <div className="w-[30%] ">
              <h1 className="absolute top-[30%]">Evolution</h1>
              <div>
                {evolutionChain && (
                  <Evolution evolutionChain={evolutionChain} />
                )}
              </div>
            </div>
          </div>
          {/* Info section mobile view */}
          <div className="md:hidden  flex pb-[5rem] flex-col w-screen  items-center gap-4">
            <h1># {pokemon.id}</h1>
            <img
              className={`h-[30vh]   `}
              src={pokemon && pokemon.sprites.other.dream_world.front_default}
              alt=""
            />
            <h1 className="uppercase text-center ">{pokemon.name}</h1>
            <div className="text-justify p-4">{bio}</div>
            {state.stat ? (
              <div className="flex flex-col  items-center w-[80%] p-4 justify-center  opacity-70   bg-slate-100">
                <div className="flex justify-center gap-6 items-center"></div>
                <div className="  ">
                  <table>
                    <tbody>
                      <tr>
                        <td className="font-bold pr-5">HP</td>

                        <td className="">
                          <LinearProgress
                            className="w-[10rem]"
                            variant="determinate"
                            value={pokemon.stats[0].base_stat}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-5">Attack</td>
                        <td>
                          <LinearProgress
                            variant="determinate"
                            value={pokemon.stats[1].base_stat}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-5">Defense</td>
                        <td>
                          <LinearProgress
                            variant="determinate"
                            value={pokemon.stats[2].base_stat}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="font-bold pr-5">Special Attack</td>
                        <td>
                          <LinearProgress
                            variant="determinate"
                            value={pokemon.stats[3].base_stat}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : state.info ? (
              <div className="flex flex-col gap-3   w-[80%] p-4 justify-center  opacity-70   bg-slate-100 shadow-lg rounded-lg text-black">
                <div className="flex justify-center gap-6 items-center">
                  <div className="font-bold">W: {pokemon.weight / 10}KG</div>
                  {types.map((type, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor:
                          colorslice.getInitialState()[`${types[0]}`],
                        background: `linear-gradient(90deg, ${
                          colorslice.getInitialState()[`${types[0]}`]
                        } 0%, ${
                          colorslice.getInitialState()[`${types[1]}`]
                        } 100%)`,
                      }}
                      className={`${types[i]} rounded-full w-4 h-4`}
                    ></div>
                  ))}
                  <div className="font-bold">H: {pokemon.height / 10}M</div>
                  <div className="  "></div>
                </div>
                <div className="  ">
                  <table>
                    <tbody>
                      <tr>
                        <td className="pr-[5rem] font-semibold">Abilities</td>
                        <td>
                          {pokemon.abilities.map((ability, i) => (
                            <li className="list-none " key={i}>
                              {ability.ability.name}
                            </li>
                          ))}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td className="font-semibold pr-[3rem] ">Moves</td>
                      <td>
                        <ul>
                          {pokemon &&
                            pokemon.moves.slice(0, 3).map((move, i) => (
                              <li className="list-none" key={i}>
                                {move.move.name}
                              </li>
                            ))}
                        </ul>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div></div>
              </div>
            ) : (
              <div className="flex flex-col  items-center w-[80%] p-4 justify-center  opacity-70   bg-slate-100">
                <div className="w-[30%] ">
                  <div>
                    {evolutionChain && (
                      <Evolution evolutionChain={evolutionChain} />
                    )}
                  </div>
                </div>
              </div>
            )}
            {/* footer */}
            <div className="fixed bottom-0 w-full">
              <BottomNavigation sx={{}} value={value} onChange={handleChange}>
                <BottomNavigationAction
                  label="Info"
                  value="info"
                  icon={<InfoIcon />}
                />
                <BottomNavigationAction
                  label="Stat"
                  value="stat"
                  icon={<ElectricBoltIcon />}
                />
                <BottomNavigationAction
                  label="Evolution"
                  value="evolution"
                  icon={<ChangeCircleIcon />}
                />
              </BottomNavigation>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-screen justify-center items-center">
          <div className="md:flex gap-2 items-center w-[70%] p-5 ">
            {/* For variant="text", adjust the height via font-size */}
            
            <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            {/* For other variants, adjust the size with `width` and `height` */}
            <Skeleton className="" variant="rectangular" width={210} height={300} />
            <Skeleton className="hidden md:block" variant="rectangular" width={510} height={300} />
            <div>
              <div className="flex">
                <Skeleton className="hidden md:block" variant="circular" width={80} height={80} />
                <Skeleton className="hidden md:block" variant="circular" width={80} height={80} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export const getServerSideProps = async (context) => {
  const { name } = context.params;
  return {
    props: {
      name,
    },
  };
};

export default PokemonScreen;
