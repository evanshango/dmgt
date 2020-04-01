import React, {Component, Fragment} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import {getAdditionalItemInfo} from "../redux/actions/dataActions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import MyButton from "../util/MyButton";
import EditIcon from "@material-ui/icons/Edit";

const styles = theme => ({
    ...theme.styling,
    gridContent: {
        padding: 8,
        alignItems: 'center'
    }
});

class ViewDetails extends Component {

    componentDidMount() {
        this.props.getAdditionalItemInfo(this.props.infoId);
    }

    render() {
        const {classes, infoType, singleItemInfo} = this.props;
        return (
            <Fragment>
                {singleItemInfo !== undefined ? (
                    <div>
                        {infoType === 'Disasters' && (
                            <Grid container>
                                {singleItemInfo.items.map((item, index) => {
                                    const {disasterName, category} = item;
                                    return (
                                        <Fragment key={index}>
                                            <Grid item sm={12}>
                                                <Grid container className={classes.gridContent}>
                                                    <Grid item sm={1}>
                                                        <Typography variant='body1'>{index + 1}.</Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography variant='body1'>{disasterName}</Typography>
                                                    </Grid>
                                                    <Grid item sm={2}>
                                                        <Typography variant='body2'>{category}</Typography>
                                                    </Grid>
                                                    <Grid item sm={1}>
                                                        <MyButton tip='Edit Content'>
                                                            <EditIcon color='primary'/>
                                                        </MyButton>
                                                    </Grid>
                                                </Grid>
                                                <hr/>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        )}
                        {infoType === 'Educational' && (
                            <Grid container>
                                {singleItemInfo.items.map((item, index) => {
                                    const {infoName, extraInfo} = item;
                                    return (
                                        <Fragment key={index}>
                                            <Grid item sm={12}>
                                                <Grid container>
                                                    <Grid item sm={1}>
                                                        <Typography variant='body2'>{index + 1}.</Typography>
                                                    </Grid>
                                                    <Grid item sm={2}>
                                                        <Typography variant='body2'>{infoName}</Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography className={classes.justifyText} variant='body2'>
                                                            {extraInfo}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={1}>
                                                        <MyButton tip='Edit Content'>
                                                            <EditIcon color='primary'/>
                                                        </MyButton>
                                                    </Grid>
                                                </Grid>
                                                <hr/>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        )}
                        {infoType === 'First Aid' && (
                            <Grid container>
                                {singleItemInfo.items.map((item, index) => {
                                    const {infoName, aidInfo} = item;
                                    return (
                                        <Fragment key={index}>
                                            <Grid item sm={12}>
                                                <Grid container style={{padding: 8}}>
                                                    <Grid item sm={1}>
                                                        <Typography variant='body2'>{index + 1}.</Typography>
                                                    </Grid>
                                                    <Grid item sm={2}>
                                                        <Typography variant='body2'>{infoName}</Typography>
                                                    </Grid>
                                                    <Grid item sm={8}>
                                                        <Typography className={classes.justifyText} variant='body2'>
                                                            {aidInfo}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={1}>
                                                        <MyButton tip='Edit Content'>
                                                            <EditIcon color='primary'/>
                                                        </MyButton>
                                                    </Grid>
                                                </Grid>
                                                <hr/>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        )}
                        {infoType === 'Medical Service' && (
                            <Grid container>
                                {singleItemInfo.items.map((item, index) => {
                                    const {name, hotline} = item;
                                    return (
                                        <Fragment key={index}>
                                            <Grid item sm={12}>
                                                <Grid container className={classes.gridContent}>
                                                    <Grid item sm={1}>
                                                        <Typography variant='body2'>{index + 1}.</Typography>
                                                    </Grid>
                                                    <Grid item sm={3}>
                                                        <Typography variant='body2'>{name}</Typography>
                                                    </Grid>
                                                    <Grid item sm={7}>
                                                        <Typography className={classes.justifyText} variant='body2'>
                                                            {hotline}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item sm={1}>
                                                        <MyButton tip='Edit Content'>
                                                            <EditIcon color='primary'/>
                                                        </MyButton>
                                                    </Grid>
                                                </Grid>
                                                <hr/>
                                            </Grid>
                                        </Fragment>
                                    )
                                })}
                            </Grid>
                        )}
                    </div>) : (<div className={classes.spinnerDiv}>
                    <CircularProgress size={150} thickness={2}/>
                </div>)}
            </Fragment>
        );
    }
}

ViewDetails.propTypes = {
    infoId: PropTypes.string.isRequired,
    infoType: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired,
    getAdditionalItemInfo: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    singleItemInfo: state.data.singleItemInfo
});

export default connect(mapStateToProps, {getAdditionalItemInfo})(withStyles(styles)(ViewDetails));
