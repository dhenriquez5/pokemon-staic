import { Card, Grid } from '@nextui-org/react'
import React, { FC } from 'react'
import { FavoriteCard } from './FavoriteCard'

interface Props{
    pokemons:number[]
}

export const Favorites:FC<Props> = ({pokemons}) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
    {
      pokemons.map(id=> (
        <FavoriteCard id={id} key={id} />
      ))
    }
</Grid.Container>
  )
}
