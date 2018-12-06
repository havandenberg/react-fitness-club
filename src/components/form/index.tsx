import * as R from 'ramda';
import * as React from 'react';

interface Props<FormFields> {
  FormComponent: React.ComponentType<FormComponentProps<FormFields>>;
  initialValues: FormFields;
  id: string;
}

type FormComponentProps<FormFields> = { fields: FormFields } & Handlers<
  FormFields
>;

type OnChangeHandler<FormFields> = <K extends keyof FormFields>(
  s: K,
  a: FormFields[K],
  callback?: () => void,
) => void;

interface Handlers<FormFields> {
  onChange: OnChangeHandler<FormFields>;
}

interface State<FormFields> {
  fields: FormFields;
}

class Form<FormFields> extends React.Component<
  Props<FormFields>,
  State<FormFields>
> {
  constructor(props: Props<FormFields>) {
    super(props);
    this.state = { fields: props.initialValues };
  }

  componentWillReceiveProps(nextProps: Props<FormFields>) {
    if (!R.equals(nextProps.initialValues, this.props.initialValues)) {
      this.setState({ fields: nextProps.initialValues });
    }
    if (this.props.id !== nextProps.id) {
      this.setState({ fields: nextProps.initialValues });
    }
  }

  onChange: OnChangeHandler<FormFields> = (
    field,
    value,
    callback = () => ({}),
  ) => {
    this.setState(
      { fields: R.merge(this.state.fields, { [field]: value }) },
      callback,
    );
  };

  render() {
    const { FormComponent } = this.props;
    const { fields } = this.state;

    return <FormComponent onChange={this.onChange} fields={fields} />;
  }
}
export default Form;
