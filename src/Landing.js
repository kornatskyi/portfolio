import { Avatar,  Grid,  makeStyles, Tooltip, Typography, useMediaQuery, useTheme, Zoom } from "@material-ui/core";
import { useState } from "react";
import ReactTyped from "react-typed";
import clsx from "clsx";
import Image from 'next/image'
import simpleIcons from 'simple-icons'
import { landing } from '../data.json'
import { iconify } from "./util";
import Cancel from "@material-ui/icons/Cancel";
import {
    CopyIcon
} from "@primer/octicons-react"

const professionalDetails = landing.professionalDetails.map(({ alt, icon, link }) => {
    const ic = simpleIcons.get(iconify(icon)) || {
        hex: '424242',
        component: <Cancel color="white" fontSize={36} />
    }
    return {
        alt,
        backgroundColor: '#' + ic.hex,
        icon: ic.component || <svg role="img" width="50" height="50" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>{icon}</title>
            <path d={ic.path} fill="white" />
        </svg>,
        link
    }
})

let iobj = {}
professionalDetails.forEach(({ alt, backgroundColor }) => {
    iobj[alt] = { backgroundColor }
})

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
        paddingBottom: theme.spacing(10)
    },
    subtitle: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(5)
    },
    avatar: {
        height: theme.spacing(8),
        width: theme.spacing(8),
        padding: theme.spacing(2)
    },

    copyIcon: {
        position: 'relative',
        bottom: 20,
        left: 40,
        width: 20,
        height: 20
    },
    ...iobj
}))


export default function Landing() {

    const classes = useStyles();
    const theme = useTheme();
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    const [isCopied, setIsCopied] = useState(false)

    return (
        <Grid container justify="center" alignItems="center" className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant={mdDown ? "h2" : "h1"}>
                    {landing.title}
                </Typography>
                <Typography variant={mdDown ? "h5" : "h4"} component="h2" className={classes.subtitle}>

                    <ReactTyped
                        strings={landing.subtitles}
                        typeSpeed={40}
                        backSpeed={50}
                        loop
                    />
                </Typography>

               
                <Grid container direction="row" spacing={2}>
                    {
                        professionalDetails.map(({ alt, icon, link }, i) =>
                            <Grid item key={i}>
                                <a href={link} target="_blank" rel="noopener noreferrer">
                                    <Zoom in={true} style={{ transitionDelay: `${100 * i}ms` }}>
                                        <Tooltip title={alt} placement="top">
                                            <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
                                                {icon}
                                            </Avatar>
                                        </Tooltip>
                                    </Zoom>

                                    <div onClick={(e) => {
                                        e.preventDefault();

                                        //copy text to clipboard function
                                        function copyToClipboard(text) {
                                            if (window.clipboardData && window.clipboardData.setData) {
                                                // Internet Explorer-specific code path to prevent textarea being shown while dialog is visible.
                                                return window.clipboardData.setData("Text", text);

                                            }
                                            else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                                                var textarea = document.createElement("textarea");
                                                textarea.textContent = text;
                                                textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
                                                document.body.appendChild(textarea);
                                                textarea.select();
                                                try {
                                                    return document.execCommand("copy");  // Security exception may be thrown by some browsers.
                                                }
                                                catch (ex) {
                                                    console.warn("Copy to clipboard failed.", ex);
                                                    return false;
                                                }
                                                finally {
                                                    document.body.removeChild(textarea);
                                                }
                                            }
                                        }
                                        copyToClipboard(alt)
                                        setIsCopied(true)
                                        setTimeout(() => {
                                            setIsCopied(false)
                                        }, 5000)
                                    }}>
                                        <Zoom in={true}>
                                            <Tooltip title={isCopied ? "copied" : "copy"} placement="bottom">
                                                <Avatar variant="rounded" className={clsx([classes.copyIcon, classes[alt]])}>
                                                    <CopyIcon />
                                                </Avatar>
                                            </Tooltip>
                                        </Zoom>
                                    </div>
                                </a>
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>


        </Grid >
    )
}