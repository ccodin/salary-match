import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import TabEmployer from '@/components/TabEmployer/TabEmployer.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('TabEmployer.vue', () => {
  const state = {
    minWage: null
  }
  const store = new Vuex.Store({
    state
  })
  it('checks label', () => {
    const wrapper = mount(TabEmployer, {
      localVue,
      store
    })
    expect(wrapper.text()).toContain(wrapper.vm.label)
  })
})
