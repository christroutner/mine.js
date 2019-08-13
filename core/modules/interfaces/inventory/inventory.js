import Helpers from '../../../utils/helpers'

import classes from './inventory.module.css'
import Hotbar from './hotbar/hotbar'

class Inventory {
  constructor(playerId, worldId, container, cursor, data, resourceManager) {
    const { hotbar } = this.digestInventory(data)
    this.playerId = playerId
    this.worldId = worldId

    this.hotbar = new Hotbar(cursor, hotbar, resourceManager)
    this.initDom(container)
  }

  initDom = container => {
    const wrapper = document.createElement('div')

    wrapper.appendChild(this.hotbar.getGui())

    Helpers.applyStyle(wrapper, classes.wrapper)

    container.appendChild(wrapper)
  }

  select = itemBoxId => {
    this.hotbar.select(itemBoxId)
  }

  getHotbar = () => this.hotbar

  getCursor = () => this.cursor

  digestInventory = data => {
    // Default data: "ARMOR:(0;) * 4|BACKPACK:(0,0;) * 27|HOTBAR:(0,0;) * 9"
    const inventory = data.split('|')

    const armor = inventory[0]
      .split(':')[1]
      .split(';')
      .filter(ele => ele)
      .map(ele => parseInt(ele, 0))

    const backpack = inventory[1]
      .split(':')[1]
      .split(';')
      .filter(ele => ele)
      .map(ele => {
        const splitted = ele.split(',').map(e => parseInt(e, 0))
        return { type: splitted[0], count: splitted[1] }
      })

    const hotbar = inventory[2]
      .split(':')[1]
      .split(';')
      .filter(ele => ele)
      .map(ele => {
        const splitted = ele.split(',').map(e => parseInt(e, 0))
        return { type: splitted[0], count: splitted[1] }
      })

    return { armor, backpack, hotbar }
  }
}

export default Inventory
