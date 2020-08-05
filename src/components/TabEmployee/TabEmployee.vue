<template>
  <tab
    :label="label"
    :defaultWage="minWage"
    :setWage="setMinWage"/>
</template>
<script>
import Tab from '@/components/Tab/Tab'
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'TabEmployee',
  components: {
    Tab
  },
  data () {
    return {
      label: 'Your expected wage'
    }
  },
  computed: {
    ...mapState([
      'minWage'
    ])
  },
  methods: {
    ...mapMutations([
      'setMinWage'
    ])
  }
}
</script>
