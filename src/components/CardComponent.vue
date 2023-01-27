<template>
  <div class="card">
    <img
      v-if="imgUrl"
      :src="imgUrl"
      :alt="imgDescription || title"
      class="card-img-top"
    />
    <h5 v-if="title" class="card-header">{{ title }}</h5>
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "CardComponent",
  props: {
    title: String,
    imgUrl: String,
    imgDescription: String,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
