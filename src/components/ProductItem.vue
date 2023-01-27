<template>
  <div class="product-item">
    <CardComponent
      v-if="product"
      :title="product.title"
      :images="carousel ? product.images : [product.images[0]]"
      :side="true"
    >
      <p class="description m-0">{{ product.description }}</p>
      <CurrencyComponent :value="product.price" style="float: right" />
    </CardComponent>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

import CardComponent from "./CardComponent.vue";
import CurrencyComponent from "./CurrencyComponent.vue";

import { Product } from "../models/product";

export default defineComponent({
  props: {
    product: Object as PropType<Product>,
    carousel: Boolean,
  },
  name: "ProductItem",
  components: {
    CardComponent,
    CurrencyComponent,
  },
});
</script>

<!-- global -->
<style lang="scss">
.product-item {
  .card-body {
    padding: 0;
  }
}
</style>
