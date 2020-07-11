import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Camera from "@material-ui/icons/Camera";
import Palette from "@material-ui/icons/Palette";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import Button from "../../components/CustomButtons/Button.js";
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import NavPills from "../../components/NavPills/NavPills.js";
import Parallax from "../../components/Parallax/Parallax.js";

import profile from "../../../img/faces/christian.jpg";

import sol1 from "../../../img/examples/sol1.jpg";
import sol2 from "../../../img/examples/sol2.jpg";
import sol3 from "../../../img/examples/sol3.jpg";
import sol4 from "../../../img/examples/sol4.jpg";
import sol5 from "../../../img/examples/sol5.jpg";
import mur1 from "../../../img/examples/mur1.jpg";
import mur2 from "../../../img/examples/mur2.jpg";
import mur3 from "../../../img/examples/mur3.jpg";
import mur4 from "../../../img/examples/mur4.jpg";
import mur5 from "../../../img/examples/mur5.jpg";
import piscine1 from "../../../img/examples/piscine1.jpg";
import piscine2 from "../../../img/examples/piscine2.jpg";
import piscine3 from "../../../img/examples/piscine3.jpg";
import piscine4 from "../../../img/examples/piscine4.jpg";
import piscine5 from "../../../img/examples/piscine5.jpg";

import styles from "../../../jss/material-kit-react/views/profilePage.js";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        color="transparent"
        // brand="Material Kit React"
        brand="Accueil"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("../../../img/profile-carreaux.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Christian Louboutin</h3>
                    <h6>Directeur</h6>
                    {/* <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-twitter"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button justIcon link className={classes.margin5}>
                      <i className={"fab fa-facebook"} />
                    </Button> */}
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                "La pose du carrelage constitue l'une des dernières étapes avant la livraison d'un bâtiment.
                Notre métier apporte LA couche de design du bâtiment et c'est pourquoi notre équipe de passionnés
                s'attache à le faire avec une grande minutie."
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "sol",
                      tabIcon: Camera,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={sol1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={sol2}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={sol5}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={sol4}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "mur",
                      tabIcon: Palette,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={mur1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={mur2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={mur3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={mur4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={mur5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Piscine",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={piscine4}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={piscine3}
                              className={navImageClasses}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <img
                              alt="..."
                              src={piscine2}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={piscine1}
                              className={navImageClasses}
                            />
                            <img
                              alt="..."
                              src={piscine5}
                              className={navImageClasses}
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
