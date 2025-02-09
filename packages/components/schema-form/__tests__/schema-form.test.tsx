import { nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { SchemaForm } from '../index'

describe('SchemaForm', () => {
  test('render', async () => {
    const wrapper = mount(SchemaForm)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
