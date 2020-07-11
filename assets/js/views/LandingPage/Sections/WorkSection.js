import React from "react";
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create, reset } from '../../../actions/message/create';
import Form from './Form';
import '../custom.css';

class WorkSection extends React.Component {

  static propTypes = {
      error: PropTypes.string,
      loading: PropTypes.bool.isRequired,
      created: PropTypes.object,
      create: PropTypes.func.isRequired,
      reset: PropTypes.func.isRequired
  };

  componentWillUnmount() {
      this.props.reset();
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.create(this.props);
    this.props.reset();
  }

  render() {
    return (
      <div className="workSection-section">
             <GridContainer justify="center">
               <GridItem cs={12} sm={12} md={8}>
                 <h2 className="title workSection-title">Confiez nous vos travaux !</h2>
                 <h4 className="workSection-description">
                   Contactez nous à travers ce formulaire pour obtenir un devis ou davantage 
                   d'informations sur nos prestations.
                 </h4>
                 <Form onSubmit={this.props.create} values={this.props.item} />
              </GridItem>
            </GridContainer>
          </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.message.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(WorkSection);