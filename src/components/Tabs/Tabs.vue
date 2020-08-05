<template>
  <div class="col-lg-7">
    <ul class="nav nav-tabs">
      <nav-link
        v-for="link in links"
        :key="link.target"
        :label="link.label"
        :target="link.target"
        :active="currentTab === link.target"
        />
    </ul>
    <component :is="currentTab" />
  </div>
</template>
<script>

import TabEmployee from '@/components/TabEmployee/TabEmployee'
import TabEmployer from '@/components/TabEmployer/TabEmployer'
import NavLink from '@/components/NavLink/NavLink'
import { mapState } from 'vuex'

export default {
  name: 'Tabs',
  components: {
    TabEmployee,
    TabEmployer,
    NavLink
  },
  data () {
    return {
      links: [
        {
          label: 'Employee',
          target: 'TabEmployee'
        },
        {
          label: 'Employer',
          target: 'TabEmployer'
        }
      ]
    }
  },
  computed: {
    ...mapState([
      'currentTab'
    ])
  }
}
</script>
