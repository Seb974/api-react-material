import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { create, reset } from '../../actions/message/create';
import './custom.css';

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import Parallax from "../../components/Parallax/Parallax.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import TeamSection from "./Sections/TeamSection.js";
import WorkSection from "./Sections/WorkSection.js";

const dashboardRoutes = [];

class LandingPage extends React.Component {

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
    return (
        <div>
            <Header
              color="transparent"
              routes={dashboardRoutes}
              // brand="Material Kit React"
              brand="Accueil"
              rightLinks={<HeaderLinks />}
              fixed
              changeColorOnScroll={{
                height: 400,
                color: "white"
              }}
              {...this.props.rest}
            />
            <Parallax filter image={require("../../../img/landing-carreaux.jpg")}>
              <div className="container landingpage-container">
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <h2 className="title landingpage-title">Nous faisons de vos rêves une réalité.</h2>
                    <h4>
                    Notre équipe d'experts vous propose la pose de carrelage de sol, de piscine ou des murs de vos pièces d’eau. 
                    À votre écoute, nous tenons compte du style de pose que vous souhaitez pour votre satisfaction. 
                    Minutieux, nous garantissons de belles finitions.
                    </h4>
                    <br />
                    <Button
                      color="danger"
                      size="lg"
                      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fas fa-play" />
                      Watch video
                    </Button>
                  </GridItem>
                </GridContainer>
              </div>
            </Parallax>
            <div className="landingpage-main landingpage-mainRaised">
              <div className="container landingpage-container">
                <ProductSection />
                <TeamSection />
                <WorkSection />
              </div>
            </div>
            <Footer />
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);