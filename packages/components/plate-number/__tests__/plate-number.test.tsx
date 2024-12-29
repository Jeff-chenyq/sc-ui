import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { PlateNumber } from '../index'

describe('PlateNumber', () => {
  test('render', async () => {
    const wrapper = mount(PlateNumber)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
