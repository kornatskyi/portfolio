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
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import {
  RepoForkedIcon,
  RepoIcon,
  StarIcon,
  LinkIcon,
  MarkGithubIcon,
} from "@primer/octicons-react";
import Carousel from "./components/Carousel.jsx";

import { useEffect, useRef, useState } from "react";
import { groupElementsByN } from "./util.js";

const useStyles = makeStyles((theme) => ({
  cont: {
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
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down("sm"));

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
      justify="center"
      alignItems="center"
      spacing={10}
      className={classes.cont}
    >
      <Grid item>
        <Typography variant="h2" align="center" innerRef={animRef}>
          Projects
        </Typography>
      </Grid>
      <Grid container item direction="row" spacing={1}>
        <Grid item xs={12}>
          <Carousel autoPlay={false}>
            {!!data &&
              //Group elements in group by 3 to correctly display inside the slider
              groupElementsByN(
                data.map((v, i) => (
                  <Grid item xs={12} md={4} key={i}>
                    <Fade
                      key={i}
                      in={animate}
                      style={{ transitionDelay: `${200 * i}ms` }}
                    >
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
                            <Button
                              disabled
                              target="_blank"
                              style={{ height: 40 }}
                            >
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
                )),
                3
              ).map((group, i) => (
                <Grid
                  container
                  direction="row"
                  item
                  xs={12}
                  spacing={1}
                  alignItems="stretch"
                  key={i}
                >
                  {group}
                </Grid>
              ))}
          </Carousel>
        </Grid>
      </Grid>
    </Grid>
  );
}
