// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    media: "",
    onchange: null,
    addListener: function () {}, // Deprecated
    removeListener: function () {}, // Deprecated
    addEventListener: function () {},
    removeEventListener: function () {},
    dispatchEvent: function () {},
  };
};