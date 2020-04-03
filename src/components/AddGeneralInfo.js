import React, {Component} from 'react';
import {withStyles} from "@material-ui/core";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import DisasterForm from "./DisasterForm";
import EducationalForm from "./EducationalForm";
import FirstAidForm from "./FirstAidForm";
import MedicalServiceForm from "./MedicalServiceForm";

const styles = theme => ({
    ...theme.styling,
});

class AddGeneralInfo extends Component {

    render() {
        const {info: {infoType, infoId}} = this.props;
        return (
            <div>
                {infoType === 'Disasters' && (
                    <DisasterForm infoId={infoId} infoType={infoType}/>
                )}
                {infoType === 'Educational' && (
                    <EducationalForm infoId={infoId} infoType={infoType}/>
                )}
                {infoType === 'Medical Service' && (
                    <MedicalServiceForm infoId={infoId} infoType={infoType}/>
                )}
                {infoType === 'First Aid' && (
                    <FirstAidForm infoId={infoId} infoType={infoType}/>
                )}
            </div>
        );
    }
}

AddGeneralInfo.propTypes = {
    classes: PropTypes.object.isRequired,
    info: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    UI: state.UI,
});

export default connect(mapStateToProps)(withStyles(styles)(AddGeneralInfo));
