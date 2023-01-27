<template>
  <CardComponent
    v-if="product"
    :title="product.title"
    :imgDescription="product.title"
    :imgUrl="product.images[0]"
  >
    <p>{{ product.description }}</p>
    <CurrencyComponent :value="product.price" style="float: right" />
  </CardComponent>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import CardComponent from "./CardComponent.vue";
import CurrencyComponent from "./CurrencyComponent.vue";

import { Product } from "../models/product";

export default defineComponent({
  props: {
    product: Object as PropType<Product>,
  },
  name: "ProductItem",
  components: {
    CardComponent,
    CurrencyComponent,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
