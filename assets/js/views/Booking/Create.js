import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { create, reset } from '../../actions/booking/create';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import './custom.css';

const dashboardRoutes = [];

class Create extends Component {
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

  render() {
    if (this.props.created)
      return (
        <Redirect
          to={`edit/${encodeURIComponent(this.props.created['@id'])}`}
        />
      );

    return (
      <div>
        <Header
            color="primary"
            routes={dashboardRoutes}
            brand="Accueil"
            rightLinks={<HeaderLinks />}
            fixed
            {...this.props.rest}
        />
        <div className="under-header" ></div>
          <div className="container landingpage-mainRaised">
              <GridContainer justify="center" >
                    <GridItem xs={8} sm={8} md={8}>
                        <h2>Nouvelle réservation</h2>

                        {this.props.loading && (
                          <div className="alert alert-info" role="status">
                            Chargement...
                          </div>
                        )}
                        {this.props.error && (
                          <div className="alert alert-danger" role="alert">
                            <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                            {this.props.error}
                          </div>
                        )}

                        <Form onSubmit={this.props.create} values={this.props.item} />
                        <Link to="." className="btn btn-primary">
                          Retourner à la liste
                        </Link>
                        <div className="under-header" ></div>
                    </GridItem>
                </GridContainer>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { created, error, loading } = state.booking.create;
  return { created, error, loading };
};

const mapDispatchToProps = dispatch => ({
  create: values => dispatch(create(values)),
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(Create);
