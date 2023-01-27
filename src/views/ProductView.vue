<template>
  <div class="product">
    <LoadingComponent v-if="isLoading" />
    <div class="row" v-if="!isLoading">
      <div class="col-12 col-sm-8 col-lg-6 m-auto mt-3">
        <AlertMessage v-if="message">{{ message }}</AlertMessage>
        <ProductItem v-if="product" :product="product"></ProductItem>
        <router-link class="btn btn-secondary" :to="`/products`"
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
        .then((product) => {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.product {
  position: relative;

  .btn {
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
}
</style>
