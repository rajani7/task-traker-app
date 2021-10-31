export const createTaskFormInputs = [
  {
    attrs: {
      id: 'taskName',
      name: 'taskName',
      type: 'text',
      required: true,
    },
    label: 'Task Name',
  },
  {
    attrs: {
      id: 'projectName',
      name: 'projectName',
      type: 'select',
      required: true,
    },
    label: 'Project Name',
    options: [
      {
        name: 'Tesla',
        value: 'tesla',
      },
      {
        name: 'NeuralLink',
        value: 'neurallink',
      },
      {
        name: 'SpaceX',
        value: 'spacex',
      },
    ],
  },
  {
    attrs: {
      id: 'comments',
      name: 'comments',
      type: 'textarea',
      className: 'comments',
      rows: '4',
      required: true,
    },
    label: 'Comments',
  },
]
