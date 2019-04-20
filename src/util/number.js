module.exports = {
  numberFormat: value => {
    if (!value) {
      return 0;
    }

    if (value > 999999) {
      return `${(value / 1000000).toFixed(1)}m`;
    }

    if (value > 999) {
      return `${(value / 1000).toFixed(1)}k`;
    }

    return value.toFixed(2);
  }
};
