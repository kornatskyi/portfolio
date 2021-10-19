import {
  Avatar,
  Grid,
  makeStyles,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Zoom,
  Box,
  Link,
} from "@material-ui/core";
import { useState } from "react";
import ReactTyped from "react-typed";
import clsx from "clsx";
import Image from "next/image";
import simpleIcons from "simple-icons";
import { copyToClipboard } from "./util";

import data from "../data.json";
import { iconify } from "./util";
import Cancel from "@material-ui/icons/Cancel";
import { CopyIcon, MarkGithubIcon, MailIcon } from "@primer/octicons-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { FaBeer } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { withStyles } from "@material-ui/styles";

const { landing } = data;

const professionalDetails = landing.professionalDetails.map(
  ({ alt, icon, link }) => {
    const ic = simpleIcons.get(iconify(icon)) || {
      hex: "424242",
      component: <Cancel color="white" fontSize={36} />,
    };

    return {
      alt,
      color: "white",
      backgroundColor: "#" + ic.hex,
      icon: ic.component || (
        <svg
          role="img"
          width="50"
          height="50"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>{icon}</title>
          <path d={ic.path} fill="white" />
        </svg>
      ),
      link,
    };
  }
);

let iobj = {};
let cobj = {};
professionalDetails.forEach(({ alt, backgroundColor }) => {
  iobj[alt] = { backgroundColor };
});
// Styles for copy icon
professionalDetails.forEach(({ alt, backgroundColor, color }) => {
  cobj["copy" + alt] = { backgroundColor, color };
});
const useStyles = makeStyles((theme) => ({
  cont: {
    minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
    paddingBottom: theme.spacing(10),
  },
  subtitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5),
  },
  avatar: {
    height: theme.spacing(4),
    width: theme.spacing(4),
    padding: theme.spacing(0.6),
    // backgroundColor: "transparent",
  },
  combinedIconsContainer: {
    position: "relative",
    cursor: "pointer",
  },
  copyIcon: {
    position: "absolute",
    height: theme.spacing(1.5),
    width: theme.spacing(1.5),
    right: 0,
    bottom: 0,
  },
  contactsLink: {
    paddingLeft: theme.spacing(1),
  },
  detail: {
    marginTop: theme.spacing(1),
  },
  dp: {
    width: "100%",
    height: "auto",
    boxShadow:
      "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
  },
  ...iobj,
  ...cobj,
}));

export default function Landing() {
  const classes = useStyles();
  const theme = useTheme();
  const mdDown = useMediaQuery(theme.breakpoints.down("sm"));

  const [isCopied, setIsCopied] = useState(false);

  return (
    <Grid
      container
      className={classes.cont}
      direction="row"
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} md={8}>
        <Typography variant={mdDown ? "h2" : "h1"}>{landing.title}</Typography>

        <Typography
          variant={mdDown ? "h5" : "h4"}
          component="h2"
          className={classes.subtitle}
        >
          <ReactTyped
            strings={landing.subtitles}
            typeSpeed={40}
            backSpeed={50}
            loop
          />
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Avatar
          variant="rounded"
          src={landing.photo}
          className={classes.dp}
        ></Avatar>
        <Grid container direction="column" justify="space-between">
          {professionalDetails.map(({ alt, icon, link }, i) => (
            <Grid
              container
              direction="row"
              alignItems="center"
              className={classes.detail}
              key={i}
              wrap="nowrap"
            >
              <Tooltip title={isCopied ? "Copied" : "Copy"} placement="bottom">
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    copyToClipboard(alt);
                    setIsCopied(true);

                    setTimeout(() => {
                      setIsCopied(false);
                    }, 1000);
                  }}
                  className={classes.combinedIconsContainer}
                >
                  {/* Contacts Icons */}

                  <Avatar
                    variant="rounded"
                    className={clsx([classes.avatar, classes[alt]])}
                  >
                    {icon}
                  </Avatar>

                  {/* Copy icon */}
                  <Zoom in={true}>
                    <Avatar
                      variant="rounded"
                      className={clsx([
                        classes.copyIcon,
                        classes["copy" + alt],
                      ])}
                    >
                      <CopyIcon />
                    </Avatar>
                  </Zoom>
                </div>
              </Tooltip>
              <Link
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={clsx([classes.contactsLink])}
                noWrap
              >
                {alt}
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
