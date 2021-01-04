module.exports = {
  stories: ['../stories/*.js'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-knobs',
    'storybook-addon-react-docgen',
    './registerMko'
  ]
};
