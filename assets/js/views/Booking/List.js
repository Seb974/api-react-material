import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { list, reset } from '../../actions/booking/list';
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import './custom.css';

const dashboardRoutes = [];

class List extends Component {
  static propTypes = {
    retrieved: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    eventSource: PropTypes.instanceOf(EventSource),
    deletedItem: PropTypes.object,
    list: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.props.list(
      this.props.match.params.page &&
        decodeURIComponent(this.props.match.params.page)
    );
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match.params.page !== nextProps.match.params.page)
      nextProps.list(
        nextProps.match.params.page &&
          decodeURIComponent(nextProps.match.params.page)
      );
  }

  componentWillUnmount() {
    this.props.reset(this.props.eventSource);
  }

  render() {
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
                  <h2>Liste des réservations</h2>

                  {this.props.loading && (
                    <div className="alert alert-info">Loading...</div>
                  )}
                  {this.props.deletedItem && (
                    <div className="alert alert-success">
                      {this.props.deletedItem['@id']} deleted.
                    </div>
                  )}
                  {this.props.error && (
                    <div className="alert alert-danger">{this.props.error}</div>
                  )}

                  <p>
                    <Link to="create" className="btn btn-primary">
                      Créer
                    </Link>
                  </p>

                  <table className="table table-responsive table-striped table-hover">
                    <thead>
                      <tr>
                        {/* <th>id</th> */}
                        <th>Email</th>
                        <th>Arrivée</th>
                        <th>Départ</th>
                        <th colSpan={2} />
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.retrieved &&
                        this.props.retrieved['hydra:member'].map(item => (
                          <tr key={item['@id']}>
                            {/* <th scope="row">
                              <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                                {item['@id']}
                              </Link>
                            </th> */}
                            <td>{item['email']}</td>
                            <td>{(new Date(item['checkIn'])).getDate() + '/' + (parseInt((new Date(item['checkIn'])).getMonth()) + 1) + '/' + (new Date(item['checkIn'])).getFullYear()}</td>
                            <td>{(new Date(item['checkOut'])).getDate() + '/' + (parseInt((new Date(item['checkOut'])).getMonth()) + 1) + '/' + (new Date(item['checkOut'])).getFullYear()}</td>
                            <td>
                              <Link to={`show/${encodeURIComponent(item['@id'])}`}>
                                <span className="fa fa-search" aria-hidden="true" />
                                <span className="sr-only">Show</span>
                              </Link>
                            </td>
                            <td>
                              <Link to={`edit/${encodeURIComponent(item['@id'])}`}>
                                <span className="fa fa-pencil" aria-hidden="true" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  </GridItem>
                </GridContainer>
            </div>
          {this.pagination()}
        <Footer />
      </div>
    );
  }

  pagination() {
    const view = this.props.retrieved && this.props.retrieved['hydra:view'];
    if (!view) return;

    const {
      'hydra:first': first,
      'hydra:previous': previous,
      'hydra:next': next,
      'hydra:last': last
    } = view;

    return (
      <nav aria-label="Page navigation">
        <Link
          to="."
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&lArr;</span> First
        </Link>
        <Link
          to={
            !previous || previous === first ? '.' : encodeURIComponent(previous)
          }
          className={`btn btn-primary${previous ? '' : ' disabled'}`}
        >
          <span aria-hidden="true">&larr;</span> Previous
        </Link>
        <Link
          to={next ? encodeURIComponent(next) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Next <span aria-hidden="true">&rarr;</span>
        </Link>
        <Link
          to={last ? encodeURIComponent(last) : '#'}
          className={`btn btn-primary${next ? '' : ' disabled'}`}
        >
          Last <span aria-hidden="true">&rArr;</span>
        </Link>
      </nav>
    );
  }

  renderLinks = (type, items) => {
    if (Array.isArray(items)) {
      return items.map((item, i) => (
        <div key={i}>{this.renderLinks(type, item)}</div>
      ));
    }

    return (
      <Link to={`../${type}/show/${encodeURIComponent(items)}`}>{items}</Link>
    );
  };
}

const mapStateToProps = state => {
  const {
    retrieved,
    loading,
    error,
    eventSource,
    deletedItem
  } = state.booking.list;
  return { retrieved, loading, error, eventSource, deletedItem };
};

const mapDispatchToProps = dispatch => ({
  list: page => dispatch(list(page)),
  reset: eventSource => dispatch(reset(eventSource))
});

export default connect(mapStateToProps, mapDispatchToProps)(List);
