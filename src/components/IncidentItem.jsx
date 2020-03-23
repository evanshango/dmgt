import React, {Component} from 'react';
import CardContent from "@material-ui/core/CardContent";
import {Card} from "@material-ui/core";

class IncidentItem extends Component {
    render() {
        return (
            <Card>
                <CardContent>
                    <h3>Rendering Incident Item</h3>
                </CardContent>
            </Card>
        );
    }
}

export default IncidentItem;
