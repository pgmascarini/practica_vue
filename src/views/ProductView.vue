<template>
  <div class="product">
    <LoadingComponent v-if="isLoading" />
    <div class="row" v-if="!isLoading">
      <div class="col-12 mt-3">
        <AlertMessage v-if="message">{{ message }}</AlertMessage>
        <ProductItem
          v-if="product"
          :product="product"
          :carousel="true"
        ></ProductItem>
        <router-link
          class="btn btn-secondary mt-4"
          style="float: right"
          :to="`/products`"
          >Volver</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

import store from "@/store";

import AlertMessage from "@/components/AlertMessage.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import ProductItem from "@/components/ProductItem.vue";

import { Product } from "@/models/product";

interface Data {
  isLoading: boolean;
  message: string;
  product: Product | null;
}

export default defineComponent({
  name: "ProductView",
  components: {
    AlertMessage,
    LoadingComponent,
    ProductItem,
  },
  created(): void {
    this.fetchData();
  },
  data(): Data {
    return {
      isLoading: true,
      message: "",
      product: null,
    };
  },
  methods: {
    fetchData(): void {
      const route = useRoute();
      store
        .dispatch("fetchProductById", route.params.id)
        .then((product: Product) => {
          this.product = product;
        })
        .catch(() => {
          this.message = "Producto no econtrado.";
        })
        .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<!-- global -->
<style lang="scss">
.product {
  position: relative;

  .currency {
    bottom: 1rem;
    position: absolute;
    right: 1rem;
  }
}
</style>
