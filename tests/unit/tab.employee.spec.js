import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TabEmployee from '@/components/TabEmployee/TabEmployee.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('TabEmployee.vue', () => {
  const state = {
    minWage: null
  }
  const store = new Vuex.Store({
    state
  })
  it('checks label', () => {
    const wrapper = mount(TabEmployee, {
      localVue,
      store
    })
    expect(wrapper.text()).toContain(wrapper.vm.label)
  })
})
