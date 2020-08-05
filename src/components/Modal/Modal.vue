<template>
  <div class="modal" :class="{'d-block': isModalOpen}" tabindex="-1" role="dialog">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :style="{color: degreeColor}"><img :src="weatherIcon" />{{weatherCity}}, {{weatherDeg | degreeUnit}}</h5>
          </div>
          <div class="modal-body" v-html="feedback">
          </div>
          <div class="modal-footer">
            <button data-cy="modal:close" type="button" class="btn btn-primary" @click="close">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import Axios from 'axios'
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Modal',
  props: {
    feedback: {
      type: String,
      default: ''
    },
    onClose: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      weatherCity: '',
      weatherDeg: '',
      weatherIcon: ''
    }
  },
  computed: {
    degreeColor () {
      const degree = isNaN(this.weatherDeg) ? 0 : this.weatherDeg
      const blueRatio = degree > 0 ? (degree / 5) : 255
      const greenRatio = degree > 0 ? (9 / degree) : 1

      const red = Math.min(255, degree * 7)
      const green = Math.min(255, degree * greenRatio)
      const blue = Math.min(255, parseInt(255 / blueRatio))
      return `rgb(${red},${green},${blue})`
    },
    ...mapState([
      'isModalOpen'
    ])
  },
  filters: {
    degreeUnit (val) {
      return val + '°C'
    }
  },
  created () {
    this.getWeather()
  },
  methods: {
    ...mapMutations([
      'closeModal'
    ]),
    getWeather () {
      Axios.get('data/2.5/find?q=London&units=metric&appid=439d4b804bc8187953eb36d2a8c26a02')
        .then((payload) => {
          const info = payload?.data?.list[0]
          const icon = info?.weather[0]?.icon

          this.weatherCity = info.name || 'N/A'
          this.weatherDeg = info.main?.temp || 'N/A'
          this.weatherIcon = `http://openweathermap.org/img/wn/${icon}.png` || 'N/A'
        })
    },
    close () {
      this.closeModal()
      this.onClose()
    }
  }
}
</script>
