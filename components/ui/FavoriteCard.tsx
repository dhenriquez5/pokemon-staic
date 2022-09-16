import { Card, Grid } from '@nextui-org/react';
import React, { FC } from 'react'
import { useRouter } from 'next/router';
interface Props{
    id:number;
}
export const FavoriteCard:FC<Props> = ({id}) => {

  const router = useRouter()
  const onFavoriteClick=() => {
    router.push("/pokemon/"+id);
  }

  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
    <Card isHoverable isPressable css={{padding:10}} onClick={onFavoriteClick}>
        <Card.Image src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
          width="100%"
          height={140}
         />
    </Card>
</Grid>
  )
}
