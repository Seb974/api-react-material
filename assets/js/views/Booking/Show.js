import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { retrieve, reset } from '../../actions/booking/show';
import { del } from '../../actions/booking/delete';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Modal from './Modal';
import './custom.css';

const dashboardRoutes = [];

class Show extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    retrieve: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    deleteError: PropTypes.string,
    deleteLoading: PropTypes.bool.isRequired,
    deleted: PropTypes.object,
    del: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.retrieve(decodeURIComponent(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  onValidate = validate => {
    if (validate) 
        this.props.del(this.props.retrieved);
  }

  render() {
    if (this.props.deleted) return <Redirect to=".." />;

    const item = this.props.retrieved;

    return (
      <div>
        <Header
        color="primary"
        routes={dashboardRoutes}
        // brand="Material Kit React"
        brand="Accueil"
        rightLinks={<HeaderLinks />}
        fixed
        {...this.props.rest}
      />
      <div className="under-header" ></div>
        <div className="container landingpage-mainRaised">
          <GridContainer justify="center" >
            <GridItem xs={12} sm={12} md={6}>
              <h2>Voir la réservation de {item && item['email']}</h2>

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
              {this.props.deleteError && (
                <div className="alert alert-danger" role="alert">
                  <span className="fa fa-exclamation-triangle" aria-hidden="true" />{' '}
                  {this.props.deleteError}
                </div>
              )}

              {item && (
                <table className="table table-responsive table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Champ</th>
                      <th>Valeur</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">email</th>
                      <td>{item['email']}</td>
                    </tr>
                    <tr>
                      <th scope="row">Arrivée</th>
                      <td>{item['checkIn']}</td>
                    </tr>
                    <tr>
                      <th scope="row">Départ</th>
                      <td>{item['checkOut']}</td>
                    </tr>
                  </tbody>
                </table>
              )}
              <Link to=".." className="btn btn-primary">
                Retourner à la liste
              </Link>
              {item && (
                <Link to={`/bookings/edit/${encodeURIComponent(item['@id'])}`}>
                  <button className="btn btn-warning">Modifier</button>
                </Link>
              )}
              <Modal onClick={ this.onValidate }/>
              <div className="under-header" ></div>
            </GridItem>
          </GridContainer>
        </div>
        <Footer />
      </div>
    );
  }

  renderLinks = (type, items) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../../${type}/show/${encodeURIComponent(items)}`}>
        {items}
      </Link>
    );
  };
}

const mapStateToProps = state => ({
  retrieved: state.booking.show.retrieved,
  error: state.booking.show.error,
  loading: state.booking.show.loading,
  eventSource: state.booking.show.eventSource,
  deleteError: state.booking.del.error,
  deleteLoading: state.booking.del.loading,
  deleted: state.booking.del.deleted
});

const mapDispatchToProps = dispatch => ({
  retrieve: id => dispatch(retrieve(id)),
  del: item => dispatch(del(item)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(Show);
