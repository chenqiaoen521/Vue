<template>
  <div style="width: 100%;height: 100%">
    <pdf></pdf>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import pdf from '@/pages/pdf/pdfContent.vue'
const { mapState, mapActions, mapGetters } = createNamespacedHelpers('demo')

export default {
  name: 'demo_index',
  components: { pdf },
  data () {
    return {
      lang: 'zh'
    }
  },
  mounted () {
    // this.$bar.start()
    // setTimeout(() => this.$bar.finish(), 2000)
  },
  computed: {
    ...mapState(['code']),
    ...mapGetters(['precode'])
  },
  methods: {
    ...mapActions(['changeCode'])
  }
}
</script>
