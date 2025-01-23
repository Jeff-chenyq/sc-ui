import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { DynamicVirtualList } from '../index'

describe('DynamicVirtualList', () => {
  test('render', async () => {
    const wrapper = mount(DynamicVirtualList)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
