<template>
  <div class="home">
    <Month :monthNumber="2" :year="2021" :events="[1, 2, 3]" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Month from "@/components/Month.vue"; // @ is an alias to /src

export default Vue.extend({
  name: "Home",
  components: {
    Month
  }
});
</script>
