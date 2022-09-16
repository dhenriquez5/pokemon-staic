import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces/Pokemon-full';
import pokeApi from '../../services/pokeApi';
import { localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
   
    const [isFavorite, setIsFavorite] = useState(false);
    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsFavorite(!isFavorite)
    }
    useEffect(() => {
        setIsFavorite(localFavorites.existInFavorites(pokemon.id))
    }, [pokemon.id])
    

    return (
        <Layout title={pokemon.name} >
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable isPressable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} alt={pokemon.name} width="100%" height={200} />
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}-{isFavorite}</Text>
                            <Button color="gradient" ghost={!isFavorite} onClick={onToggleFavorite}>{isFavorite ? 'Quitar Favorito' :'Guardar Favorito'}</Button>

                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites: </Text>
                            <Container direction='row' display='flex' gap={0} wrap='nowrap'> 
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width="100%" height={100} />
                                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width="100%" height={100} />
                                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width="100%" height={100} />
                                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width="100%" height={100} />

                            </Container>
                        </Card.Body>
                    </Card>

                </Grid>

            </Grid.Container>
        </Layout>
    )
}

// The data comes from a headless CMS
// The data comes from a database
// The data comes from the filesystem
// The data can be publicly cached (not user-specific)
// The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance
// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes
export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemon151 = [...Array(151)].map((value, index) => `${index + 1}`)
    return {
        paths: pokemon151.map(id => ({
            params: { id }
        })),
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { id } = params as { id: string };
    const { data } = await pokeApi.get<Pokemon>('/pokemon/' + id);
    console.log(data);
    return {
        props: {
            pokemon: data
        }
    }
}


export default PokemonPage;