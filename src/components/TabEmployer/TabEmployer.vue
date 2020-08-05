<template>
  <tab
    :label="label"
    :defaultWage="maxWage"
    :setWage="setMaxWage"/>
</template>
<script>
import Tab from '@/components/Tab/Tab'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'TabEmployer',
  components: {
    Tab
  },
  data () {
    return {
      label: 'Maximum wage'
    }
  },
  computed: {
    ...mapState([
      'maxWage'
    ])
  },
  methods: {
    ...mapMutations([
      'setMaxWage'
    ])
  }
}
</script>
