import React from 'react';
import { Route } from 'react-router-dom';
import { List, Create, Update, Show } from '../views/Booking/';

export default [
  <Route path="/bookings/create" component={Create} exact key="create" />,
  <Route path="/bookings/edit/:id" component={Update} exact key="update" />,
  <Route path="/bookings/show/:id" component={Show} exact key="show" />,
  <Route path="/bookings/" component={List} exact strict key="list" />,
  <Route path="/bookings/:page" component={List} exact strict key="page" />
];
