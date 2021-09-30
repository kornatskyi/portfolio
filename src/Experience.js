import { Avatar, Card, CardActionArea, CardHeader, Grid, makeStyles, Typography, useMediaQuery, useTheme } from "@material-ui/core";
import Image from 'next/image'
import { DateRange, LocationCity, Assignment } from '@material-ui/icons';
import { experience } from '../data.json'
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles(theme => ({
    cont: {
        minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
    },
    card: {
        height: '100%',
    },
    cardHeader: {
        paddingTop: 0
    },
    cardActionArea: {
        height: '100%',
    },
    expObj: {
        marginBottom: theme.spacing(4)
    },
    certificateLink: {
        color: 'rgba(0, 0, 0, 0.54)',


    }
}))

const getHumanDiff = (startDate, endDate) => {
    let str = ""
    const start = new Date(startDate)
    const end = !!endDate ? new Date(endDate) : new Date()
    let years = end.getFullYear() - start.getFullYear()
    let months = end.getMonth() - start.getMonth()

    if (months < 0) {
        years -= 1;
        months += 12;
    }

    if (years > 0) {
        str += years + " year"
        if (years > 1)
            str += "s"
    }

    if (str.length > 0)
        str += ", "

    if (months > 0) {
        str += months + " month"
        if (months > 1)
            str += "s"
    }

    return str;
}

export default function Experience() {

    const classes = useStyles()
    const theme = useTheme()
    const mdDown = useMediaQuery(theme.breakpoints.down('md'))
    const align = mdDown ? "center" : "flex-end"
    const textAlign = mdDown ? "center" : "right"

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

    return (
        <Grid direction="row" container justify="center" alignItems="center" spacing={10} className={classes.cont}>
            <Grid item xs={12} lg={6}>
                <Typography variant="h2" gutterBottom align="center">
                    Education and certification
                </Typography>

            </Grid>
            <Grid container item xs={12} lg={6} direction="column" spacing={1} >
                {
                    Object.getOwnPropertyNames(experience).map((title, id) =>
                        <Grid style={{ width: "100%", marginLeft: "auto" }} item key={id} className={classes.expObj}  >
                            <Typography variant="h4" align={textAlign} gutterBottom component="p">
                                {title}
                            </Typography>
                            <Grid container item direction="row" spacing={1} justify="center">
                                {
                                    experience[title].map(({
                                        organization,
                                        role,
                                        type,
                                        startDate,
                                        endDate,
                                        city,
                                        country,
                                        url,
                                        thumbnail,
                                        certificate
                                    }, i) =>
                                        <Grid style={{ marginLeft: "auto" }} item xs={12} sm={6} key={i}>
                                            <Card className={classes.card}>
                                                <CardActionArea
                                                    className={classes.cardActionArea}
                                                    // href={url}
                                                    // target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar variant="rounded">
                                                                <Image
                                                                    alt={`${organization} logo`}
                                                                    src={thumbnail}
                                                                    layout="fill"
                                                                />
                                                            </Avatar>
                                                        }
                                                        title={organization}
                                                        subheader={role + " - " + type}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            window.open(url, "_blank")

                                                        }}
                                                    />
                                                    <CardHeader
                                                        avatar={<DateRange />}
                                                        title={getHumanDiff(startDate, endDate)}
                                                        subheader={`${startDate} - ${endDate}`}
                                                        className={classes.cardHeader}
                                                    />
                                                    <CardHeader
                                                        avatar={<LocationCity />}
                                                        subheader={`${city}, ${country}`}
                                                        className={classes.cardHeader}
                                                    />


                                                    {
                                                        (() => {
                                                            if (title === "Certification" || title === "Awards") {
                                                                if (certificate) {

                                                                    return (
                                                                        <CardHeader
                                                                            avatar={<Assignment />}
                                                                            subheader={
                                                                                (
                                                                                    <div onClick={(e) => {
                                                                                        e.preventDefault()

                                                                                        //open in new tab
                                                                                        window.open(certificate, '_blank')

                                                                                    }}
                                                                                    >See certificate</div>
                                                                                )

                                                                            }
                                                                            className={classes.cardHeader}
                                                                        />
                                                                    )
                                                                } else {
                                                                    //return no certificate
                                                                    return (
                                                                        <CardHeader
                                                                            avatar={<Assignment />}
                                                                            subheader={
                                                                                (
                                                                                    <div
                                                                                    >No certificate yet</div>
                                                                                )

                                                                            }
                                                                            className={classes.cardHeader}
                                                                        />)
                                                                }
                                                            }
                                                        }

                                                        )()
                                                    }

                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                }
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
            <div ref={animRef}></div>
        </Grid>
    )
}