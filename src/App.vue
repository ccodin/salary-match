<template>
  <div id="app" class="container d-flex flex-column justify-content-center align-items-center">
    <h1 class="headline">Salary match</h1>
    <modal
      :feedback="feedback"
      :on-close="onModalClose"
    />
    <tabs/>
  </div>
</template>

<script>
import Tabs from './components/Tabs/Tabs.vue'
import Modal from './components/Modal/Modal.vue'
import { mapState, mapActions, mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    Tabs,
    Modal
  },
  data () {
    return {
      feedback: ''
    }
  },
  computed: {
    ...mapState([
      'maxIsGtMin',
      'minWage',
      'maxWage',
      'currency'
    ])
  },
  methods: {
    ...mapMutations([
      'openModal',
      'switchTab'
    ]),
    ...mapActions([
      'resetWages'
    ]),
    onModalClose () {
      this.resetWages()
      // Uncomment if you want to go back to Employee tab. if you do it, e2e have to be updated
      // this.switchTab('TabEmployee')
    }
  },
  watch: {
    maxIsGtMin (val, old) {
      if (val === null) return
      let intro, color

      if (val) {
        intro = 'Success !'
        color = 'text-success'
      } else {
        intro = 'Failure !'
        color = 'text-danger'
      }
      this.feedback = `${intro} Candidate wishes <span class="${color}">${this.minWage}${this.currency}</span> and company offers <span class="${color}">${this.maxWage}${this.currency}</span>`
      this.openModal()
    }
  }
}
</script>

<style lang="scss">
@import './assets/main.scss';
</style>
