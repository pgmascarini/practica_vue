<template>
  <div class="card">
    <h5 v-if="title" class="card-header">{{ title }}</h5>
    <div class="card-body">
      <div class="row">
        <div
          :class="{ 'col-6': side, 'col-12': !side }"
          v-if="images && images.length > 0"
        >
          <div class="carousel slide">
            <div v-if="images.length > 1" class="carousel-indicators">
              <button
                v-for="(image, index) in images"
                :key="index"
                :class="{ active: current === index }"
                @click="current = index"
                class="carousel-indicators-btn"
                type="button"
              ></button>
            </div>
            <div class="carousel-inner">
              <div
                v-for="(image, index) in images"
                :key="index"
                :style="{ 'background-image': `url(${image}` }"
                class="images carousel-item"
                :class="{ active: current === index }"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>
        <div :class="{ 'col-6': side, 'col-12': !side }" class="py-2">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CardComponent",
  data() {
    return {
      current: 0,
    };
  },
  props: {
    title: String,
    images: Array as PropType<string[]>,
    side: Boolean,
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.images {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  height: 400px;
  width: 100%;
}

.carousel-indicators-btn {
  background: #fff;
  border: 1px solid #666;
  height: 3px;
  margin: 0 1px;
  width: 30px;

  &.active {
    height: 6px;
  }
}
</style>
