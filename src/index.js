import './Mixxx/console-polyfill'
import 'string.prototype.startswith'

import { MidiBus as LaunchpadBus } from './Launchpad'
import { Timer, ControlBus } from './Mixxx'
import { Screen } from './App/Screen'
import { Component } from './Component'

const Mapping = (component) => {
  const modul = { }
  modul.init = () => { component.mount(modul) }
  modul.shutdown = () => { component.unmount() }
  return modul
}

module.exports = Mapping(new Component({
  onMount () {
    const timer = Timer.create(this.target)
    const controlBus = ControlBus.create(this.target)
    const launchpadBus = LaunchpadBus.create(this.target)
    this.screen = Screen('main')(timer)

    this.screen.mount({ controlBus, launchpadBus })
  },
  onUnmount () {
    this.screen.unmount()
  }
}))
