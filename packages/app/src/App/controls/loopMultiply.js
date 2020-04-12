/* @flow */
import type { LaunchpadDevice } from '../../'
import type { Modifier } from '../ModifierSidebar'
import type { ChannelControl } from '@mixxx-launchpad/mixxx'

export default (gridPosition: [number, number]) => (deck: ChannelControl) => (_: Modifier) => (device: LaunchpadDevice) => {
  const onMount = (k) => (dk: null, { bindings }: Object) => {
    bindings[k].button.sendColor(device.colors.lo_yellow)
  }
  const onAttack = (amount: 0.5 | 2.0) => () => {
    deck.loop_scale.setValue(amount)
  }
  return {
    bindings: {
      halve: {
        type: 'button',
        target: gridPosition,
        mount: onMount('halve'),
        attack: onAttack(0.5)
      },
      double: {
        type: 'button',
        target: [gridPosition[0] + 1, gridPosition[1]],
        mount: onMount('double'),
        attack: onAttack(2.0)
      }
    }
  }
}
