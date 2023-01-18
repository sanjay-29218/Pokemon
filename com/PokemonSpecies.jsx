import React from 'react'

const PokemonSpecies = ({name,url}) => {
    const [pokemon, setPokemon] = useState(null)
    const handlePokemon = async() =>{
        const res = await fetch(url);
        const data = await res.json();
        const {id} = data
        const res2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data2 = await res2.json()
        setPokemon(data2)
    }

  return (
    <div className=' ' >
        <h1 >{name}</h1>
        <img src={pokemon?.sprites?.front_default} alt={name} />
        
    </div>
  )
}

export default PokemonSpecies