module.exports = {
  "extends": ["airbnb", "prettier"],
  "globals": {
    "fetch": "false",
    "localStorage": "false",
    "describe": "false",
    "it": "false",
    "beforeEach": "false",
    "before": "false",
    "expect": "false",
  },
  "rules": {
    "no-console": 0,
    "camelcase": 0,
    "react/jsx-filename-extension": 0,
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "class-methods-use-this": "off",
    "jsx-a11y/media-has-caption": "off",
    "react/prop-types": "off",
    "jsx-a11y/label-has-for": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "prefer-destructuring": "off",
    "jsx-a11y/anchor-is-valid": "off",
    "no-shadow": "off",
    "no-unused-vars": "off",
    "no-unused-expressions": "off",
    "no-restricted-syntax": "off",
  },
  "plugins": ["react", "jsx-a11y", "import"],
};
