import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { Button } from '../index'

describe('Button', () => {
  test('render', async () => {
    const wrapper = mount(Button)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
