import React, { useContext } from 'react';
import { AppBar, Container, IconButton, makeStyles, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import { ThemeContext } from '../src/theme';
import Landing from '../src/Landing';
import Skills from '../src/Skills';
import Projects from '../src/Projects';
import About from '../src/About';
import Experience from '../src/Experience';
import { name, projects } from '../data.json';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    boxShadow: "none",
  }
}))



// This function gets called at build time
export async function getStaticProps() {
  const baseURI = projects.baseURI
  const repos = projects.repositories


  const reqInit = {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  }





  // Call an external API endpoint to get projects
  const fullRepoData = await Promise.allSettled(
    repos.map(
      async name => {
        const repo = await fetch(baseURI + name, reqInit).then(res => res.json());
        const langs = await fetch(baseURI + name + "/languages", reqInit).then(res => res.json())
        return {
          ...repo,
          languages: Object.getOwnPropertyNames(langs)
        };
      }
    )
  );

  // By returning { props: { projects } }, the Projects component
  // will receive `projects` as a prop at build time
  return {
    props: {
      projects: fullRepoData
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 60 seconds
    revalidate: 60
  }
}

export default function Index({ projects }) {



  const classes = useStyles()

  const { theme, toggleTheme } = useContext(ThemeContext)

  const trigger = useScrollTrigger({ disableHysteresis: true })

  return (
    <div className={classes.root}>
      <AppBar color={!trigger ? "transparent" : "inherit"} className={classes.appBar} position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.root}>
            {name}
          </Typography>
          <IconButton edge="end" color="inherit" onClick={toggleTheme}>
            {theme.palette.type === "dark" ? "☀️" : "🌑"}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Toolbar className={classes.toolbar} />
      <Container>
        <Landing />
        <Skills />
        <Projects data={projects} />
        <Experience />
        <About />

      </Container>
    </div>
  );
}
