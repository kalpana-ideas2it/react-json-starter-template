import React, { Component } from 'react';
import { reduxForm, Field, propTypes, fieldPropTypes } from 'redux-form';
import * as _ from 'underscore';
import { required, email, match, password } from 'utils/validation';

// import memoize from 'lru-memoize';
// import { createValidator, required, email, match } from 'utils/validation';

// console.log('before component ');
// const registerValidation = () => createValidator({
//   email: [required, email],
//   password: required,
//   password_confirmation: [required, match('password')]
// });
// const validator = memoize(10)(registerValidation);


const getValidation = rules => {
  const validation = [];
  _.each(rules, rule => {
    switch (rule.method) {
      case 'required':
        validation.push(required);
        break;
      case 'email':
        validation.push(email);
        break;
      case 'password':
        validation.push(password);
        break;
      case 'match':
        validation.push(match(rule.param));
        break;
      default:
        break;
    }
  });
  console.log('VALIDATION ====> ', validation);
  return validation;
};


const Input = ({
  input, label, type, meta: { touched, error }
}) => (
  <div className={`form-group ${error && touched ? 'has-error' : ''}`}>
    <label htmlFor={input.name} className="col-sm-2">
      {label}
    </label>
    <div className="col-sm-10">
      <input {...input} type={type} className="form-control" />
      {error && touched && <span className="glyphicon glyphicon-remove form-control-feedback" />}
      {error &&
        touched && (
          <div className="text-danger">
            <strong>{error}</strong>
          </div>
        )}
    </div>
  </div>
);

Input.propTypes = fieldPropTypes;

@reduxForm({
  form: 'create'
})
export default class UserForm extends Component {
  static propTypes = {
    ...propTypes
  };

  static defaultProps = {
    jsonData: {}
  };

  componentWillMount() {
    console.log('component will mount');
  }

  render() {
    const { jsonData, handleSubmit, formData } = this.props;
    const value = 'dsvkjhkdsnkjnfdkv';
    console.log('CREATE DATA ======= > ', jsonData);
    return (
      <div>
        <form
          className="form-horizontal"
          onSubmit={handleSubmit}
        >
          {jsonData.fields.map(field => (
            <Field
              name={field.name}
              type={field.type}
              component={Input}
              label={field.label}
              validate={field.validation && getValidation(field.validation)}
              // value={field.name}
            />
          ))}
          <button className="btn btn-success" type="submit">
            <i className="fa fa-sign-in" /> {jsonData.process}
          </button>
        </form>
      </div>
    );
  }
}
