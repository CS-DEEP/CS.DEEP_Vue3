<template>
  <el-container class="el-container container">
    <card-section-comp></card-section-comp>
    <div class="button">
      <button @click="toResultView">
        <p>画像测评结果</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </button>
    </div>
  </el-container>
</template>

<script setup lang="ts">
import CardSectionComp from '@/components/persona/CardSectionComp.vue'
import router from '@/router'

const toResultView = () => {
  router.push('/persona/result')
}
</script>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

button {
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  cursor: pointer;
}

button {
  --primary-color: #111;
  --hovered-color: #c84747;
  position: relative;
  display: flex;
  font-weight: 550;
  font-size: 23px;
  gap: 0.5rem;
  align-items: center;
}

button p {
  margin: 0;
  position: relative;
  font-size: 23px;
  color: var(--primary-color);
  transition: 0.3s ease-out;

  &:hover {
    color: var(--hovered-color);
  }
}

button::after {
  position: absolute;
  content: "";
  width: 0;
  left: 0;
  bottom: -7px;
  background: var(--hovered-color);
  height: 2px;
  transition: 0.3s ease-out;
}

button p::before {
  position: absolute;
  /*   box-sizing: border-box; */
  width: 0;
  inset: 0;
  color: var(--hovered-color);
  overflow: hidden;
  transition: 0.3s ease-out;
}

button:hover::after {
  width: 100%;
  color: var(--hovered-color);
}

button:hover p::before {
  width: 100%;
  color: var(--hovered-color);
}

button:hover svg {
  transform: translateX(4px);
  color: var(--hovered-color);
}

button svg {
  color: var(--primary-color);
  transition: 0.2s;
  position: relative;
  width: 15px;
  transition-delay: 0.2s;
}
</style>