import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import '../styles/InfoCard.scss';
import numeral from 'numeral'

export const prettyPrintStat = (stat) =>
    stat ? `+${numeral(stat).format("0.0a")}` : "+0";

function InfoCard({ title, cases, total, active, isRed, ...props }) {
    return (

        <Card onClick={props.onClick}
            className={`infoCard ${active && "infoCard__selected"} ${isRed && "infoCard__red"
                }`}>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <h2 className={`infoCard__cases ${!isRed && "infoCard__cases__green"}`}>
                    {prettyPrintStat(cases)}
                </h2>

                <Typography className="infoCard__total" color="textSecondary">
                    {prettyPrintStat(total)} Total
                </Typography>
            </CardContent>
        </Card>

    )
}

export default InfoCard
