<template>
  <div class="products">
    <LoadingComponent v-if="isLoading" />
    <AlertMessage v-if="message">{{ message }}</AlertMessage>
    <input
      v-model="filterParam"
      type="text"
      class="form-control mb-3"
      placeholder="Buscar por nombre"
    />
    <AlertMessage
      v-if="!isLoading && filteredList.length === 0"
      type="secondary"
      >No hay ningún producto para mostrar con ese parametro de
      busqueda.</AlertMessage
    >
    <div v-if="filteredList.length > 0" class="row">
      <template v-for="product in filteredList" :key="product.id">
        <div class="col-12 col-sm-6 col-lg-4 mb-2">
          <router-link class="link" :to="`/product/${product.id}`">
            <ProductItem v-if="product" :product="product"></ProductItem>
          </router-link>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store";

import AlertMessage from "@/components/AlertMessage.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";
import ProductItem from "@/components/ProductItem.vue";

import { Product } from "@/models/product";

interface Data {
  isLoading: boolean;
  filterParam: string;
  message: string;
  productsList: Product[];
}

export default defineComponent({
  name: "ProductsView",
  components: {
    AlertMessage,
    LoadingComponent,
    ProductItem,
  },
  computed: {
    filteredList(): Product[] {
      if (this.filterParam.length) {
        return this.productsList.filter((product: Product) =>
          product.title
            .toLocaleLowerCase()
            .includes(this.filterParam.toLocaleLowerCase())
        );
      }

      return this.productsList;
    },
  },
  created(): void {
    this.fetchData();
  },
  data(): Data {
    return {
      isLoading: true,
      filterParam: "",
      message: "",
      productsList: [],
    };
  },
  methods: {
    fetchData(): void {
      store
        .dispatch("fetchProducts")
        .then((productsList: Product[]) => {
          this.productsList = productsList;
        })
        .catch(() => {
          this.message = "Ningún producto encontrado.";
        })
        .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<!-- global -->
<style lang="scss">
.products {
  position: relative;

  .link {
    color: inherit;
    text-decoration: none;
  }

  .currency {
    bottom: 0.3rem;
    position: absolute;
    right: 0.3rem;
  }

  .images {
    height: 150px;
  }
}
</style>
