import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from './Form';
import { retrieve, update, reset } from '../../actions/booking/update';
import { del } from '../../actions/booking/delete';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import './custom.css';

const dashboardRoutes = [];

class Update extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    retrieveLoading: PropTypes.bool.isRequired,
    retrieveError: PropTypes.string,
    updateLoading: PropTypes.bool.isRequired,
    updateError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleteError: PropTypes.string,
    updated: PropTypes.object,
    deleted: PropTypes.object,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    del: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  del = () => {
    if (window.confirm('Are you sure you want to delete this item?'))
      this.props.del(this.props.retrieved);
  };

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.updated ? this.props.updated : this.props.retrieved;

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
              <h2>Modifier la réservation de {item && item['email']}</h2>

              {this.props.created && (
                <div className="alert alert-success" role="status">
                  {this.props.created['@id']} créé.
                </div>
              )}
              {this.props.updated && (
                <div className="alert alert-success" role="status">
                  {this.props.updated['@id']} est à jour.
                </div>
              )}
              {(this.props.retrieveLoading ||
                this.props.updateLoading ||
                this.props.deleteLoading) && (
                <div className="alert alert-info" role="status">
                  Chargement...
                </div>
              )}
              {this.props.retrieveError && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.retrieveError}
                </div>
              )}
              {this.props.updateError && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.updateError}
                </div>
              )}
              {this.props.deleteError && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.deleteError}
                </div>
              )}

              {item && (
                <Form
                  onSubmit={values => this.props.update(item, values)}
                  initialValues={item}
                />
              )}
              <Link to=".." className="btn btn-primary">
                  Retourner à la liste
              </Link>
              <button onClick={this.del} className="btn btn-danger">
                Supprimer
              </button>
              <div className="under-header" ></div>
            </GridItem>
          </GridContainer>
        </div>
       <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  retrieved: state.booking.update.retrieved,
  retrieveError: state.booking.update.retrieveError,
  retrieveLoading: state.booking.update.retrieveLoading,
  updateError: state.booking.update.updateError,
  updateLoading: state.booking.update.updateLoading,
  deleteError: state.booking.del.error,
  deleteLoading: state.booking.del.loading,
  eventSource: state.booking.update.eventSource,
  created: state.booking.create.created,
  deleted: state.booking.del.deleted,
  updated: state.booking.update.updated
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  update: (item, values) => dispatch(update(item, values)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(Update);
