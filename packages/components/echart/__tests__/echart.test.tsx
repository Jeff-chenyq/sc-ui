import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Echart } from '../index'

describe('Echart', () => {
  test('render', async () => {
    const wrapper = mount(Echart)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
