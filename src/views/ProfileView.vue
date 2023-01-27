<template>
  <div class="profile">
    <UserProfile />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import UserProfile from "@/components/UserProfile.vue";

export default defineComponent({
  name: "ProfileView",
  components: {
    UserProfile,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>
