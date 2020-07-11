import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import GridContainer from "../../components/Grid/GridContainer.js";
import GridItem from "../../components/Grid/GridItem.js";
import Button from "../../components/CustomButtons/Button.js";
import CustomInput from "../../components/CustomInput/CustomInput.js";

class Form extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  constructor(props) {
    super(props);
    // this.state = {
    //     checkIn: new Date(),
    //     checkOut: new Date()
    // };
  }

  // onDateTimeChange = (dateTime, input) => {
  //   this.setState({[input.name]: dateTime});
  //   setTimeout(() => {console.log(this.state[input.name])}, 300);
  // }

  renderField = data => {
    // data.input.className = 'form-control';

    const isInvalid = data.meta.touched && !!data.meta.error;
    if (isInvalid) {
      data.input.className += ' is-invalid';
      data.input['aria-invalid'] = true;
    }

    if (this.props.error && data.meta.touched && !data.meta.error) {
      data.input.className += ' is-valid';
    }

    return (
      data.type === 'datetime' ? 
          <div className={`form-group`}>
              <DatePicker data={data} /> {/* onChange={this.onDateTimeChange} />  value={data.input.name === 'checkIn' ? this.state.checkIn : this.state.checkOut} /> */}
          </div>
      : 
          <div className={`form-group`}>
            <CustomInput
                labelText={data.labelText}
                formControlProps={data.formControlProps}
                inputProps={{
                        ...data.input,
                        type: data.type,
                        step: data.step,
                        name: data.input.name,
                        required: data.required,
                        placeholder: "",
                        id: `booking_${data.input.name}`,
                    }}
              />
            {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
          </div>
    );
  };

  render() {
    return (
      <form onSubmit={this.props.handleSubmit}>
          <Field
              component={this.renderField}
              labelText="Email"
              type="email"
              name="email"
              placeholder="Adresse Email"
              required={true}
              formControlProps={{
                  fullWidth: true
              }}
          />
          <Field
              component={this.renderField}
              name="checkIn"
              type="datetime"
              placeholder="Date d'arrivée"
              // labelText="Arrivée"
              required={true}
              formControlProps={{
                  fullWidth: true
              }}
              // value={this.state.checkIn}
              autoComplete="new-password"
          />
          <Field
              component={this.renderField}
              name="checkOut"
              type="datetime"
              placeholder="Date de départ"
              // labelText="Départ"
              required={true}
              formControlProps={{
                  fullWidth: true
              }}
              // value={this.state.checkOut}
              autoComplete="new-password"
          />

          <button type="submit" className="btn btn-success">
              Enregistrer
          </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'booking',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);
