<template>
  <div class="profile">
    <LoadingComponent v-if="isLoading" />
    <div class="row" v-if="!isLoading">
      <div class="col-12 col-sm-8 col-lg-6 m-auto mt-3">
        <AlertMessage v-if="message">{{ message }}</AlertMessage>
        <CardComponent
          v-if="user"
          :title="user.name"
          :imgUrl="user.avatar"
          :imgDescription="user.name"
          class="text-center"
        >
          <p>{{ user.email }}</p>
          <p>Rol: {{ user.role }}</p>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import store from "@/store";

import AlertMessage from "@/components/AlertMessage.vue";
import CardComponent from "@/components/CardComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

import { User } from "@/models/user";

interface Data {
  isLoading: boolean;
  message: string;
  user: User | null;
}

export default defineComponent({
  name: "ProfileView",
  components: {
    AlertMessage,
    CardComponent,
    LoadingComponent,
  },
  created(): void {
    this.fetchData();
  },
  data(): Data {
    return {
      isLoading: true,
      message: "",
      user: null,
    };
  },
  methods: {
    fetchData(): void {
      store
        .dispatch("fetchLoggedUser")
        .then((user: User) => {
          this.user = user;
        })
        .catch(() => {
          this.message = "Algo no ha ido bien, intentelo mas tarde.";
        })
        .finally(() => (this.isLoading = false));
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
