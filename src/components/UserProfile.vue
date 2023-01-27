<template>
  <LoadingComponent v-if="isLoading" />
  <hr v-if="!isLoading" />
  <div class="row">
    <div class="col-12 col-sm-8 col-lg-6 m-auto">
      <AlertMessage v-if="message">{{ message }}</AlertMessage>
      <CardComponent
        v-if="!isLoading && !message && user.name"
        :title="user?.name"
        :imgUrl="user?.avatar"
        class="text-center"
      >
        <p>{{ user?.email }}</p>
        <p>Rol: {{ user?.role }}</p>
      </CardComponent>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import CardComponent from "./CardComponent.vue";
import LoadingComponent from "./LoadingComponent.vue";
import AlertMessage from "./AlertMessage.vue";
import store from "@/store";

import { User } from "../models/user";

export default defineComponent({
  name: "UserProfile",
  components: { CardComponent, AlertMessage, LoadingComponent },
  methods: {
    fetchData() {
      store
        .dispatch("fetchLoggedUser")
        .then((user: PropType<User>) => {
          this.user = user;
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
      user: Object as PropType<User>,
      message: "",
    };
  },
  created() {
    this.fetchData();
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
