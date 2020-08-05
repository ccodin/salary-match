<template>
  <li class="nav-item">
    <a
      class="nav-link"
      :class="{active}"
      href="#"
      @click.prevent="switchTab(target)">{{ label }}</a>
  </li>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'NavLink',
  props: {
    label: {
      type: String,
      required: true
    },
    target: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
      'switchTab'
    ])
  }
}
</script>
