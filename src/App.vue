<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-lg">
      <div class="navbar-brand"><i class="bi-shop-window"></i> Fake Shop</div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="collapse navbar-collapse"
        id="navbarNav"
        v-if="store.state.token"
      >
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/products" class="nav-link">Productos</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">Perfil</router-link>
          </li>
          <li class="nav-item">
            <button
              @click="store.commit('logout')"
              class="btn btn-link d-block d-lg-none p-0 nav-link"
              type="button"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div class="d-none d-lg-flex" v-if="store.state.token">
        <button
          @click="store.commit('logout')"
          class="btn btn-outline-secondary"
          type="button"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
  <div class="container-lg">
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
});
</script>

<!-- global styles -->
<style lang="scss"></style>
