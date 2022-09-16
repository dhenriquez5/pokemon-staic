import { Card, Container, Grid, Image, Text } from '@nextui-org/react'
import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { Favorites, NoFavorites } from '../../components/ui'
import { localFavorites } from '../../utils'

const FavoritesPage: NextPage = () => {
  const [pokemons, setPokemons] = useState<number[]>([]);

  useEffect(() => {
    setPokemons(localFavorites.pokemons());
  }, [])

  return (
    <Layout title='Pokemon Favoritos'>
      {pokemons && pokemons.length === 0 &&
        <NoFavorites />
      }

      {pokemons && pokemons.length > 0 && (
        <Favorites pokemons={pokemons} />
      )}

    </Layout>
  )
}

export default FavoritesPage