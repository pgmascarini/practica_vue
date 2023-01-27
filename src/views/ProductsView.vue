<template>
  <div class="products">
    <ProductsList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductsList from "@/components/ProductsList.vue";

export default defineComponent({
  name: "ProductsView",
  components: {
    ProductsList,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
