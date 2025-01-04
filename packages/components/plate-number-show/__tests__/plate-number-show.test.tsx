import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { PlateNumberShow } from '../index'

describe('PlateNumberShow', () => {
  test('render', async () => {
    const wrapper = mount(PlateNumberShow)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
