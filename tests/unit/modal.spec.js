import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Modal from '@/components/Modal/Modal.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('Modal.vue', () => {
  let mutations, state
  let store

  beforeEach(() => {
    state = {
      isModalOpen: true
    }
    mutations = {
      setMinWage: jest.fn(),
      setMaxWage: jest.fn(),
      setMaxIsGtMin: jest.fn(),
      openModal: jest.fn(),
      closeModal: jest.fn()
    }
    store = new Vuex.Store({
      mutations,
      state
    })
  })

  it('commit "closeModal" on close()', () => {
    const feedback = 'This is a custom feedback'
    const onClose = mutations.closeModal
    const wrapper = shallowMount(Modal, {
      store,
      propsData: {
        feedback,
        onClose
      },
      localVue
    })
    wrapper.vm.close()
    expect(mutations.closeModal).toHaveBeenCalled()
  })

  it('changes degrees color depending on weather', () => {
    const feedback = 'This is a custom feedback'
    const onClose = mutations.closeModal
    const wrapper = shallowMount(Modal, {
      store,
      propsData: {
        feedback,
        onClose
      },
      localVue
    })
    wrapper.vm.weatherDeg = 30
    const rgbPattern = /rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/
    expect(wrapper.vm.degreeColor).toMatch(rgbPattern)
    const rgb = wrapper.vm.degreeColor.match(rgbPattern)

    expect(+rgb[1]).toBeLessThanOrEqual(255)
    expect(+rgb[2]).toBeLessThanOrEqual(255)
    expect(+rgb[3]).toBeLessThanOrEqual(255)
  })

  it('returns 0 if weatherDeg is not a number', () => {
    const feedback = 'This is a custom feedback'
    const onClose = mutations.closeModal
    const wrapper = shallowMount(Modal, {
      store,
      propsData: {
        feedback,
        onClose
      },
      localVue
    })
    wrapper.vm.weatherDeg = 'N/A'
    expect(wrapper.vm.degreeColor).toBe('rgb(0,0,1)')
  })
})
