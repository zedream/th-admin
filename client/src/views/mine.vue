<template>
<div class="container">
  wode
</div>
</template>

<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo
    })
  },
  created() {
    this.$store.dispatch('userDetail', {
      id: this.userInfo.id
    }).then((res) => {
      console.log(res)
    })
  },
  methods: {

  }
}
</script>
