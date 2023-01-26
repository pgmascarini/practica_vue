<template>
  <div class="row">
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
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AlertMessage from "./AlertMessage.vue";
import CardComponent from "./CardComponent.vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import store from "@/store";
import router from "@/router";

export default defineComponent({
  name: "LoginForm",
  components: { AlertMessage, CardComponent },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      message: "",
      form: {
        email: "",
        password: "",
      },
    };
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
  methods: {
    onSubmit() {
      this.message = "";
      store
        .dispatch("login", this.form)
        .then(() => {
          router.push("products");
        })
        .catch(() => {
          this.message = "Correo electrónico o contraseña no válidos.";
        });
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
