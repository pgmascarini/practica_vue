<template>
  <LoadingComponent v-if="isLoading" />
  <AlertMessage v-if="message">{{ message }}</AlertMessage>
  <input
    v-model="filterParam"
    type="text"
    class="form-control"
    placeholder="Buscar por nombre"
  />
  <hr />
  <AlertMessage v-if="!isLoading && filteredList.length === 0" type="secondary"
    >No hay ningún producto para mostrar.</AlertMessage
  >
  <div v-if="filteredList.length > 0" class="row">
    <template v-for="product in filteredList" :key="product.id">
      <div class="col-12 col-sm-6 col-lg-4 mb-2">
        <router-link class="link" :to="`/product/${product.id}`">
          <ProductItem :product="product" />
        </router-link>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import LoadingComponent from "./LoadingComponent.vue";
import AlertMessage from "./AlertMessage.vue";
import ProductItem from "./ProductItem.vue";
import store from "@/store";
import { Product } from "@/models/product";

export default defineComponent({
  name: "ProductList",
  components: { LoadingComponent, AlertMessage, ProductItem },
  methods: {
    fetchData() {
      store
        .dispatch("fetchProducts")
        .then((productsList) => {
          this.productsList = productsList;
        })
        .catch(() => {
          this.message = "Algo no ha ido bien, intentelo mas tarde.";
        })
        .finally(() => (this.isLoading = false));
    },
  },
  data() {
    return {
      isLoading: true,
      productsList: [],
      filterParam: "",
      message: "",
    };
  },
  computed: {
    filteredList(): Product[] {
      if (this.filterParam.length) {
        return this.productsList.filter((product: Product) => {
          return product.title
            .toLocaleLowerCase()
            .includes(this.filterParam.toLocaleLowerCase());
        });
      }

      return this.productsList;
    },
  },
  created() {
    this.fetchData();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.link {
  color: inherit;
  text-decoration: none;
}
</style>
