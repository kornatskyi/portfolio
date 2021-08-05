import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Fade,
  Grid,
  Hidden,
  makeStyles,
  Typography,
} from "@material-ui/core";
import {
  RepoForkedIcon,
  RepoIcon,
  StarIcon,
  LinkIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  cont: {
    minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
  },
  card: {
    height: "100%",
  },
  cardActionArea: {
    display: "flex",
    textAlign: "inherit",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "100%",
    // display: 'grid'
  },
  homepage: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
}));

export default function Projects({ data }) {
  const classes = useStyles();

  const [animate, setAnimate] = useState(false);
  const animRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) setAnimate(true);
    });
    observer.observe(animRef.current);
    return () => observer.unobserve(animRef.current);
  }, []);

  return (
    <Grid
      direction="row-reverse"
      container
      justifyContent="center"
      alignItems="center"
      spacing={10}
      className={classes.cont}
    >
      <Grid item xs={12} lg={6}>
        <Typography variant="h2" gutterBottom align="center" innerRef={animRef}>
          Projects
        </Typography>

      </Grid>
      <Grid container item xs={12} lg={6} direction="row" spacing={1}>
        {!!data &&
          data.map((v, i) => (
            <Grid item sm={6} xs={12} key={i}>
              <Fade in={animate} style={{ transitionDelay: `${200 * i}ms` }}>
                <Card key={i} className={classes.cardActionArea}>
                  <CardHeader
                    title={
                      <>
                        <RepoIcon verticalAlign="middle" /> {v.value.name}
                      </>
                    }
                    subheader={
                      <>
                        {!!v.value.stargazers_count && (
                          <>
                            <StarIcon verticalAlign="middle" />
                            {v.value.stargazers_count}
                          </>
                        )}
                        {!!v.value.forks && (
                          <>
                            <RepoForkedIcon verticalAlign="middle" />
                            {v.value.forks}
                          </>
                        )}
                      </>
                    }
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      {v.value.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Grid container direction="row" spacing={1}>
                      {!!v.value.languages &&
                        v.value.languages.map((lang, i) => (
                          <Grid item key={i}>
                            <Chip key={i} label={lang} size="small" />
                          </Grid>
                        ))}
                    </Grid>
                  </CardActions>
                  <CardContent
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                      padding: 10,
                      paddingRight: 10,
                      paddingLeft: 10,
                    }}
                  >
                    {!!v.value.homepage ? (
                      <Button
                        href={v.value.homepage}
                        target="_blank"
                        style={{ height: 40 }}
                      >
                        <p style={{ paddingRight: 5 }}>Demo</p>
                        <LinkIcon />
                      </Button>
                    ) : (
                      <Button disabled target="_blank" style={{ height: 40 }}>
                        <p style={{ paddingRight: 5 }}>Demo</p>
                        <LinkIcon />
                      </Button>
                    )}

                    <Button
                      href={v.value.html_url}
                      target="_blank"
                      style={{ height: 40 }}
                    >
                      <p style={{ paddingRight: 5 }}>GitHub</p>
                      <MarkGithubIcon />
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
      </Grid>
    </Grid>
  );
}
