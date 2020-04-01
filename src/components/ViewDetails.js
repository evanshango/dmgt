import React, {Component} from 'react';
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';

const styles = theme => ({
    ...theme.styling,
});

class ViewDetails extends Component {

    render() {
        const {classes, infoId} = this.props;
        return (
            <div>
               <p>{infoId}</p>
            </div>
        );
    }
}

ViewDetails.propTypes = {
    infoId: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

});

export default connect(mapStateToProps)(withStyles(styles)(ViewDetails));
