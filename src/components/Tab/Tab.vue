<template>
  <div>
    <form ref="form" @submit.prevent="onSubmit" class="needs-validation border-top-0 border p-4" novalidate>
      <div class="form-row">
        <div class="col-md-6">
          <label for="wage">{{ label }}</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text">{{ currency }}</span>
            </div>
            <input
              min="1"
              max="500000"
              @keydown="onKeydown"
              v-model="wage"
              type="number"
              required
              class="form-control"
              :placeholder="placeholder">
            <div class="invalid-feedback">{{ invalidFeedback }}</div>
          </div>
        </div>
      </div>
      <div class="form-row mt-3">
        <div class="col-md-6">
          <button data-cy="submit" type="submit" class="btn btn-primary">{{ submitLabel }}</button>
        </div>
      </div>
    </form>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Tab',
  props: {
    label: {
      type: String,
      required: true
    },
    invalidFeedback: {
      type: String,
      default: 'Please type a valid number for your wage (between 1 and 500 000)'
    },
    submitLabel: {
      type: String,
      default: 'Submit'
    },
    placeholder: {
      type: String,
      default: 'e.g: 60000'
    },
    setWage: {
      type: Function,
      required: true
    },
    defaultWage: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      wage: ''
    }
  },
  computed: {
    ...mapState([
      'currency',
      'isModalOpen'
    ])
  },
  created () {
    this.wage = this.defaultWage
  },

  methods: {
    onSubmit (event) {
      this.$refs.form.classList.add('was-validated')
      if (this.$refs.form.checkValidity() === false) {
        event.preventDefault()
        event.stopPropagation()
        return
      }

      this.setWage(this.wage)
    },
    onKeydown (e) {
      if (isNaN(Number(e.key)) && e.key !== 'Backspace') {
        e.preventDefault()
      }
    }
  },

  watch: {
    defaultWage (newVal) {
      this.wage = newVal
    },
    isModalOpen (newVal) {
      if (newVal === false) {
        this.$refs.form.classList.remove('was-validated')
      }
    }
  }
}
</script>
