import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Tab from '@/components/Tab/Tab.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Tab.vue', () => {
  let actions, mutations, state
  let store

  beforeEach(() => {
    actions = {
      resetWages: jest.fn()
    }
    state = {
      currency: '$'
    }
    mutations = {
      setMinWage: jest.fn(),
      setMaxWage: jest.fn(),
      setMaxIsGtMin: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn()
    }
    store = new Vuex.Store({
      actions,
      mutations,
      state
    })
  })
  it('commit "setMinWage" when form is "submit"', () => {
    const label = 'Your expected wage'
    const setWage = mutations.setMinWage
    const wrapper = shallowMount(Tab, {
      store,
      propsData: {
        label,
        setWage
      },
      localVue
    })
    const input = wrapper.find('input')
    const form = wrapper.find('form')
    input.element.value = '9999'
    form.trigger('submit')
    expect(mutations.setMinWage).toHaveBeenCalled()
  })

  it('renders props.label when passed', () => {
    const label = 'Your expected wage'
    const setWage = mutations.setMinWage
    const wrapper = shallowMount(Tab, {
      store,
      propsData: {
        label,
        setWage
      },
      localVue
    })
    expect(wrapper.text()).toMatch(label)
  })

  it('renders state.currency', () => {
    const label = 'Your expected wage'
    const setWage = mutations.setMinWage
    const wrapper = shallowMount(Tab, {
      store,
      propsData: {
        label,
        setWage
      },
      localVue
    })
    expect(wrapper.text()).toMatch(state.currency)
  })
})
