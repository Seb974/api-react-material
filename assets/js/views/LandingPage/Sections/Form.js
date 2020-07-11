import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import GridContainer from "../../../components/Grid/GridContainer.js";
import GridItem from "../../../components/Grid/GridItem.js";
import Button from "../../../components/CustomButtons/Button.js";
import CustomInput from "../../../components/CustomInput/CustomInput.js";
import '../custom.css';

class Form extends Component {

  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    error: PropTypes.string
  };

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
                        id: `message_${data.input.name}`,
                        multiline: data.input.name === "content" ? true : false,
                        rows: data.input.name === "content" ? 5 : 1,
                    }}
            />
            {isInvalid && <div className="invalid-feedback">{data.meta.error}</div>}
        </div>
    );
  };

  handleSubmit = e => {
      e.preventDefault();
      this.props.handleSubmit();
      this.props.reset();
  }

  render() {
    return (
        <form onSubmit={ (e) => this.handleSubmit(e) }>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <Field
                    component={this.renderField}
                    labelText="Votre nom"
                    type="text"
                    name="name"
                    placeholder="Votre nom"
                    required={true}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                <Field
                    component={this.renderField}
                    labelText="Votre adresse e-mail"
                    type="email"
                    name="email"
                    placeholder="Votre adresse e-mail"
                    required={true}
                    formControlProps={{
                        fullWidth: true
                    }}
                />
            </GridItem >
            <GridItem xs={12} sm={12} md={6}>
                <Field
                    component={this.renderField}
                    labelText="Votre message"
                    name="content"
                    placeholder="Votre message"
                    required={true}
                    formControlProps={{
                        fullWidth: true,
                        className: "workSection-textArea",
                    }}
                    inputProps={{
                        multiline: true,
                        rows: 5
                    }}
                />
            </GridItem >
            <GridItem xs={12} sm={12} md={4}>
                <Button type="submit" color="primary">Envoyer</Button>
            </GridItem>
        </GridContainer>
    </form>
    );
  }
}

export default reduxForm({
  form: 'message',
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(Form);