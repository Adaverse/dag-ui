import Form from '@rjsf/chakra-ui';
import validator from '@rjsf/validator-ajv8';

const schema = {
    // title: 'Todo',
    type: 'object',
    required: ['title'],
    properties: {
      title: { type: 'string', title: 'Title', default: 'A new task' },
      done: { type: 'boolean', title: 'Done?', default: false },
    },
  };

const log = (type) => console.log.bind(console, type);

const JSONForm = () => {
    return (
        <Form
            schema={schema}
            validator={validator}
            onChange={log('changed')}
            onSubmit={log('submitted')}
            onError={log('errors')}
        />
    )
}

export default JSONForm;
// render(<JSONForm />, document.getElementById('app'));