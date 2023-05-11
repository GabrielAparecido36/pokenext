import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Image from "next/image";
import PokeCard from "./components/PokeCard";

export async function getStaticProps() {
  const maxPokemons = 251;
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon/?limit=${maxPokemons}`
  );
  const data = await res.json();

  const newData = data.results.map((dt, index) => {
    return { id: index + 1, ...dt };
  });

  return {
    props: { pokemons: newData },
  };
}

export default function Home({ pokemons }) {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>
          {" "}
          Poke<span>Next</span>
        </h1>
        <Image
          src="/images/pokeball.png"
          height="50"
          width="50"
          alt="Pokenext"
        />
      </div>
      <div className={styles.pokemonContainer}>
        {pokemons.map((pokemon) => {
          return <PokeCard key={pokemon.id} pokemon={pokemon} />;
        })}
      </div>
    </div>
  );
}
