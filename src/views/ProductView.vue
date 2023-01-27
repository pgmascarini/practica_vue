<template>
  <div class="product">
    <LoadingComponent v-if="isLoading" />
    <hr />
    <div class="row" v-if="!isLoading">
      <AlertMessage v-if="message">{{ message }}</AlertMessage>
      <div v-if="product" class="col-12 col-sm-8 col-lg-6 m-auto mt-3">
        <ProductItem :product="product" />
        <router-link class="btn btn-secondary" :to="`/products`"
          >Volver</router-link
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ProductItem from "@/components/ProductItem.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import AlertMessage from "@/components/AlertMessage.vue";
import store from "@/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ProductView",
  data() {
    return {
      isLoading: true,
      product: null,
      filterParam: "",
      message: "",
    };
  },
  methods: {
    fetchData() {
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
  components: {
    ProductItem,
    LoadingComponent,
    AlertMessage,
  },
  created() {
    this.fetchData();
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
