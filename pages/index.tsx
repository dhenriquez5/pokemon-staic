import type { NextPage } from 'next'
import { Button, Card, Grid, Row, Text } from '@nextui-org/react';
import { Layout } from '../components/layouts';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='PokemonApp'>
      {/* <Button color="gradient" >Click me</Button> */}
      <Grid.Container gap={2} justify="flex-start">
        {
          pokemons.map(p => (
            <PokemonCard key={p.id} pokemon={p} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.
import { GetStaticProps } from 'next'
import pokeApi from '../services/pokeApi';
import { PokemonList, SmallPokemon } from '../interfaces/PokemonList';
import { PokemonCard } from '../components/pokemon/PokemonCard';

//Ejecutado en el Servidor
export const getStaticProps: GetStaticProps = async (ctx) => {
  //const { data } = await  // your fetch function here 
  const { data } = await pokeApi.get<PokemonList>("/pokemon?limit=151");
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage
