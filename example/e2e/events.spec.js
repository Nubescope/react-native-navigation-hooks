const { elementByLabel, elementById, getBackButton } = require('./utils')
const { TestIDs, TestLabels } = require('../src/testIDs')

describe('RNNHooks Example', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('handles componentDidAppear', async () => {
    await expect(elementByLabel(TestLabels.DID_APPEAR)).toBeVisible()
  })

  it('handles componentDidDisappear', async () => {
    await elementById(TestIDs.PUSH_BTN).tap()
    await expect(elementByLabel(TestLabels.DID_DISAPPEAR)).toBeVisible()
  })

  it('handles NavigationScreenPop', async () => {
    await elementById(TestIDs.PUSH_BTN).tap()
    await elementByLabel(TestLabels.OK).tap()
    await getBackButton().tap()
    await expect(elementByLabel(TestLabels.POPPED)).toBeVisible()
  })

  it('handles NavigationBottomTabPress', async () => {
    await elementById(TestIDs.SECONDARY_TAB).tap()
    await expect(elementByLabel(TestLabels.BOTTOM_TAB_PRESSED)).toBeVisible()
  })

  it('handles NavigationBottomTabSelect', async () => {
    await elementById(TestIDs.SECONDARY_TAB).tap()
    await elementByLabel(TestLabels.OK).tap()
    await expect(elementByLabel(TestLabels.SECONDARY_TAB_SELECTED)).toBeVisible()
  })

  it('handles NavigationBottomTabLongPress', async () => {
    await elementById(TestIDs.SECONDARY_TAB).longPress()
    await expect(elementByLabel(TestLabels.BOTTOM_TAB_LONG_PRESSED)).toBeVisible()
  })

  it('handles NavigationCommand', async () => {
    await elementById(TestIDs.MODAL_BTN).tap()
    await elementByLabel(TestLabels.DISMISS).tap()
    await expect(elementByLabel(TestLabels.NAV_COMMAND)).toBeVisible()
  })

  it('handles NavigationCommandComplete', async () => {
    await elementById(TestIDs.MODAL_BTN).tap()
    await expect(elementByLabel(TestLabels.NAV_COMMAND_COMPLETED)).toBeVisible()
  })

  it('handles NavigationCommandModalDismiss', async () => {
    await elementById(TestIDs.MODAL_BTN).tap()
    await elementByLabel(TestLabels.DISMISS).tap()
    await expect(elementByLabel(TestLabels.MODAL_DISMISSED)).toBeVisible()
  })

  it('handles NavigationButtonPress', async () => {
    await elementById(TestIDs.NAV_BAR_BTN).tap()
    await expect(elementByLabel(TestLabels.NAV_BAR_BUTTON_PRESSED)).toBeVisible()
  })
})
