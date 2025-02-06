import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { Magnifier } from '../index'

describe('Magnifier', () => {
  test('render', async () => {
    const wrapper = mount(Magnifier)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
