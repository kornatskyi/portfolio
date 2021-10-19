import {
  Avatar,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
} from "@material-ui/core";
import Cancel from "@material-ui/icons/Cancel";
import clsx from "clsx";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import simpleIcons from "simple-icons";
import data from "../data.json";
import { iconify } from "./util";

const { skills } = data;

const wrapper = (sk = []) =>
  sk.map((v) => {
    const ic = simpleIcons.get(
      typeof v === "string" ? iconify(v) : iconify(v.icon)
    ) || {
      title: v,
      hex: "424242",
      component: <Cancel />,
    };
    return {
      alt: v.alt || v || ic.title,
      backgroundColor: v.backgroundColor || "#" + ic.hex,
      icon: ic.component || (
        <svg
          role="img"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{ic.title}</title>
          <path d={ic.path} fill="white" />
        </svg>
      ),
    };
  });

let wrappedSkills = {};
Object.getOwnPropertyNames(skills).forEach((type) => {
  wrappedSkills[type] = wrapper(skills[type]);
});

let iobj = {};
Object.values(wrappedSkills).forEach((oarr) => {
  oarr.forEach(({ backgroundColor, alt }) => {
    iobj[alt] = { backgroundColor };
  });
});

const useStyles = makeStyles((theme) => ({
  cont: {
    // minHeight: `calc(100vh - ${theme.spacing(1)}px)`,
  },
  skobj: {
    marginBottom: theme.spacing(4),
  },
  avatar: {
    height: theme.spacing(7),
    width: theme.spacing(7),
    padding: theme.spacing(1.5),
  },
  ...iobj,
}));

export default function Skills() {
  const classes = useStyles();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("md"));
  const align = mdDown ? "center" : "flex-start";
  const textAlign = mdDown ? "center" : "left";

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
      container
      justify="center"
      alignItems="center"
      spacing={6}
      className={classes.cont}
    >
      <Grid item ref={animRef}>
        <Typography variant="h2" align="center">
          Skills
        </Typography>
      </Grid>
      <Grid container item direction="column" spacing={1} alignItems={align}>
        {Object.getOwnPropertyNames(wrappedSkills).map((title, id) => (
          <Grid item key={id} className={classes.skobj}>
            <Typography
              variant="h4"
              align={textAlign}
              gutterBottom
              component="p"
            >
              {title}
            </Typography>
            <Grid container item direction="row" spacing={1} justify="center">
              {wrappedSkills[title].map(({ alt, icon }, i) => (
                <Grid item key={i}>
                  <Zoom
                    in={animate}
                    style={{ transitionDelay: `${150 * i}ms` }}
                  >
                    <Tooltip title={alt.replace("_", " ")} placement="top">
                      <Avatar
                        variant="rounded"
                        className={clsx([classes.avatar, classes[alt]])}
                      >
                        {icon}
                      </Avatar>
                    </Tooltip>
                  </Zoom>
                </Grid>
              ))}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
