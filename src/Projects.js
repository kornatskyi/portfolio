import { Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Chip, Fade, Grid, Hidden, makeStyles, Typography } from "@material-ui/core";
import { Link } from "@material-ui/icons";
import { RepoForkedIcon, RepoIcon, StarIcon } from '@primer/octicons-react';
import Image from 'next/image'
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
    },
    card: {
        height: '100%',

    },
    cardActionArea: {
        display: 'flex',
        textAlign: 'inherit',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '100%',
        // display: 'grid'
    },
    homepage: {
        display:'flex',
        justifyContent:'space-between',
        width:'100%'
    }
}))

export default function Projects({ data }) {

    const classes = useStyles()

    const [animate, setAnimate] = useState(false)
    const animRef = useRef()

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if (entries.some(entry => entry.isIntersecting))
                setAnimate(true)
        })
        observer.observe(animRef.current)
        return () => observer.unobserve(animRef.current)
    }, [])

    console.log("🚀 ~ data.homepage", data[0].value.homepage)


    return (
        <Grid direction="row-reverse" container justify="center" alignItems="center" spacing={10} className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h2" gutterBottom align="center" innerRef={animRef}>
                    Projects
                </Typography>
                <Hidden mdDown>
                    <Fade in={animate} style={{ transitionDelay: '250ms' }}>
                        <div>
                            <Image
                                alt="Projects"
                                src="/projects.svg"
                                width="1144"
                                height="617.32"
                            />
                        </div>
                    </Fade>
                </Hidden>
            </Grid>
            <Grid container item xs={12} lg={6} direction="row" spacing={1}>
                {
                    !!data && data.map((v, i) =>
                        <Grid item sm={6} xs={12} key={i}>
                            <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                                <Card key={i} className={classes.card}>
                                    <CardActionArea
                                        className={classes.cardActionArea}
                                        href={v.value.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <CardHeader

                                            title={<><RepoIcon verticalAlign='middle' /> {v.value.name}</>}
                                            subheader={
                                                <>
                                                    {
                                                        !!v.value.stargazers_count &&
                                                        <>
                                                            <StarIcon verticalAlign='middle' />
                                                            {v.value.stargazers_count}
                                                        </>
                                                    }
                                                    {
                                                        !!v.value.forks &&
                                                        <>
                                                            <RepoForkedIcon verticalAlign='middle' />
                                                            {v.value.forks}
                                                        </>
                                                    }
                                                </>
                                            }
                                        />
                                        <CardContent>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {v.value.description}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Grid container direction="row" spacing={1}>
                                                {
                                                    !!v.value.languages &&
                                                    v.value.languages.map((lang, i) =>
                                                        <Grid item key={i}>
                                                            <Chip
                                                                key={i}
                                                                label={lang}
                                                                size="small"
                                                            />
                                                        </Grid>
                                                    )
                                                }
                                            </Grid>
                                        </CardActions>
                                        <CardActions className={classes.homepage} >
                                            <Button href="https://kornatskyi.github.io/artway/" color="primary">
                                                Demo
                                            </Button>
                                            <Button href="https://kornatskyi.github.io/artway/" color="primary">
                                                GitHub
                                            </Button>
                                        </CardActions>
                                    </CardActionArea>
                                </Card>
                            </Fade>
                        </Grid>
                    )
                }
            </Grid>
        </Grid>
    )
}