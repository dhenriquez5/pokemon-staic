import { Container, Image, Text } from '@nextui-org/react'
import React from 'react'

export const NoFavorites = () => {
    return (
        <Container css={{ display: 'flex', flexDirection: 'column', height: 'calc(100vh - 100px)', alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
            <Text>No Hay Favoritos</Text>
            <Image src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/150.svg'
                width={300} height={300} alt="Pokemon" css={{ opacity: 0.8 }} />
        </Container>
    )
}
