import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { TextEllipsis } from '../index'

describe('TextEllipsis', () => {
  test('render', async () => {
    const wrapper = mount(TextEllipsis)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
