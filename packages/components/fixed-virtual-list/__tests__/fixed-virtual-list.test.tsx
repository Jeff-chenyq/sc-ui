import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { FixedVirtualList } from '../index'

describe('FixedVirtualList', () => {
  test('render', async () => {
    const wrapper = mount(FixedVirtualList)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
