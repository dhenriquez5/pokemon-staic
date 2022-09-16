import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import { GetStaticProps, NextPage, GetStaticPaths } from 'next';
import { useEffect, useState } from 'react';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces/Pokemon-full';
import { PokemonList } from '../../interfaces/PokemonList';
import pokeApi from '../../services/pokeApi';
import { localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonNamePage: NextPage<Props> = ({ pokemon }) => {
   
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
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button ghost={!isFavorite} onClick={onToggleFavorite} color='gradient' >{isFavorite?'Quitar Favorito':'Guardar Favorito'}</Button>
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
    const { data } = await pokeApi.get<PokemonList>("/pokemon?limit=151");
    const pokemon151= data.results.map(poke=> poke.name)
    return {
        paths: pokemon151.map(name => ({
            params: { name }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    let pokemon;
    try {
        const { data } = await pokeApi.get<Pokemon>('/pokemon/' + name);
        pokemon = data;
    } catch (error) {
        pokemon = null;
    }

    if(!pokemon){
        return {
            redirect:{
                destination:'/',
                permanent:false
            }
        }
    }
    
    return {
        props: {
            pokemon: pokemon
        },
        revalidate: 86400
    }
}


export default PokemonNamePage;