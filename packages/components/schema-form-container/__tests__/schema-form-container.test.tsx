import { mount } from '@vue/test-utils'
import { describe, test, expect } from 'vitest'
import { nextTick } from 'vue'
import { SchemaFormContainer } from '../index'

describe('SchemaFormContainer', () => {
  test('render', async () => {
    const wrapper = mount(SchemaFormContainer)
    await nextTick()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
