module.exports = {
  elementByLabel: label => {
    return element(by.text(label))
  },
  elementById: id => {
    return element(by.id(id))
  },
  getBackButton: () => {
    if (device.getPlatform() === 'ios') {
      return element(by.type('_UIBackButtonContainerView'))
    } else {
      return element(by.label('Navigate Up'))
    }
  },
}
