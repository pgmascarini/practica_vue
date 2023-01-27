<template>
  <div class="login">
    <LoadingComponent v-if="isLoading" />
    <div class="row" v-if="!isLoading">
      <div class="col-12 col-md-8 m-auto">
        <CardComponent class="mt-5" title="Acesso a la tienda">
          <AlertMessage v-if="message">{{ message }}</AlertMessage>
          <form @submit.prevent="onSubmit">
            <!-- Email -->
            <div class="form-group mb-3">
              <label class="form-label" for="email">Correo electrónico</label>
              <input
                v-model="v$.form.email.$model"
                :class="{ 'is-invalid': v$.form.email.$errors.length }"
                class="form-control"
                placeholder="email@email.com"
                type="email"
                id="email"
              />
              <!-- error message -->
              <div
                v-for="(error, index) of v$.form.email.$errors"
                :key="index"
                class="p-1 invalid-feedback"
              >
                {{
                  error.$validator === "required"
                    ? "Correo electrónico es un campo requerido."
                    : "Formato incorrecto para correo electrónico."
                }}
              </div>
            </div>

            <!-- password -->
            <div class="form-group mb-3">
              <label class="form-label" for="password">Contraseña</label>
              <input
                v-model="v$.form.password.$model"
                :class="{ 'is-invalid': v$.form.password.$errors.length }"
                class="form-control"
                placeholder="Contraseña"
                type="password"
                id="password"
              />
              <!-- error message -->
              <div
                v-for="(error, index) of v$.form.password.$errors"
                :key="index"
                class="p-1 invalid-feedback"
              >
                {{
                  error.$validator === "required"
                    ? "Contraseña es un campo requerido."
                    : "Contraseña debe tener como minimo 6 caracteres."
                }}
              </div>
            </div>

            <!-- Submit Button -->
            <button
              :disabled="v$.form.$invalid"
              class="btn btn-secondary mt-5"
              style="float: right"
            >
              Login
            </button>
          </form>
        </CardComponent>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import router from "@/router";
import store from "@/store";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";

import AlertMessage from "@/components/AlertMessage.vue";
import CardComponent from "@/components/CardComponent.vue";
import LoadingComponent from "@/components/LoadingComponent.vue";

interface Data {
  form: Login;
  isLoading: boolean;
  message: string;
}

interface Login {
  email: string;
  password: string;
}

export default defineComponent({
  name: "LoginView",
  components: {
    AlertMessage,
    CardComponent,
    LoadingComponent,
  },
  data(): Data {
    return {
      isLoading: false,
      form: {
        email: "",
        password: "",
      },
      message: "",
    };
  },
  methods: {
    onSubmit(): void {
      this.message = "";
      this.isLoading = true;

      store
        .dispatch("login", this.form)
        .then(() => {
          router.push("products");
        })
        .catch(() => {
          this.message = "Correo electrónico o contraseña no válidos.";
        })
        .finally(() => (this.isLoading = false));
    },
  },
  setup() {
    return { v$: useVuelidate() };
  },
  validations() {
    return {
      form: {
        email: {
          required,
          email,
        },
        password: {
          required,
          min: minLength(6),
        },
      },
    };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
