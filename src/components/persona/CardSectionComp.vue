<template>
  <main class="page-content">
    <div class="card">
      <div class="content">
        <h2 class="title">在线自主学习能力</h2>
        <p class="copy">包括技术及目标计划制定、学习内容及材料利用、学习过程调控、学习效果评价四个维度</p>
        <button class="btn" @click="toQueryView(0)">前往测评</button>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2 class="title">在线协作学习能力</h2>
        <p class="copy">包括小组积极情绪评价、小组积极情绪回应、小组积极情绪表达、师生互动沟通四个维度</p>
        <button class="btn" @click="toQueryView(1)">前往测评</button>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2 class="title">数字化学习能力</h2>
        <p class="copy">包括数字化学习意识、数字化学习行为、数字化学习管理、数字化学习评价四个维度</p>
        <button class="btn" @click="toQueryView(2)">前往测评</button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import router from '@/router'

const toQueryView = (id: number) => {
  router.push('/persona/query/' + id)
}
</script>

<style scoped lang="scss">
$imageIds: '1517021897933-0e0319cfbc28', '1533903345306-15d1c30952de', '1545243424-0ce743321e11', '1531306728370-e2ebd9d7bb99';

$bp-md: 600px;
$bp-lg: 800px;

:root {
  --d: 700ms;
  --e: cubic-bezier(0.19, 1, 0.22, 1);
  --font-sans: 'Times New Roman', sans-serif;
  --font-serif: 'Times New Roman', serif;
}

* {
  box-sizing: border-box;
}

html, body {
  height: 100%;
}

body {
  display: grid;
  place-items: center;
}

.page-content {
  display: flex;
  gap: 1rem;
  justify-content: center;
  padding: 1rem;
  max-width: 1024px;
  margin: 2px auto;
  font-family: "Times New Roman", serif;

  @media (min-width: $bp-md) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: $bp-lg) {
    grid-template-columns: repeat(4, 1fr);
  }
}

.card {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  padding: 1rem;
  width: 100%;
  text-align: center;
  color: whitesmoke;
  background-color: whitesmoke;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1),
  0 2px 2px rgba(0, 0, 0, 0.1),
  0 4px 4px rgba(0, 0, 0, 0.1),
  0 8px 8px rgba(0, 0, 0, 0.1),
  0 16px 16px rgba(0, 0, 0, 0.1);

  height: 500px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 110%;
    background-size: cover;
    background-position: 0 0;
    transition: transform 1s var(--e);
    pointer-events: none;
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 200%;
    pointer-events: none;
    background-image: linear-gradient(
        to bottom,
        hsla(0, 0%, 0%, 0) 0%,
        hsla(0, 0%, 0%, 0.009) 11.7%,
        hsla(0, 0%, 0%, 0.034) 22.1%,
        hsla(0, 0%, 0%, 0.072) 31.2%,
        hsla(0, 0%, 0%, 0.123) 39.4%,
        hsla(0, 0%, 0%, 0.182) 46.6%,
        hsla(0, 0%, 0%, 0.249) 53.1%,
        hsla(0, 0%, 0%, 0.320) 58.9%,
        hsla(0, 0%, 0%, 0.394) 64.3%,
        hsla(0, 0%, 0%, 0.468) 69.3%,
        hsla(0, 0%, 0%, 0.540) 74.1%,
        hsla(0, 0%, 0%, 0.607) 78.8%,
        hsla(0, 0%, 0%, 0.668) 83.6%,
        hsla(0, 0%, 0%, 0.721) 88.7%,
        hsla(0, 0%, 0%, 0.762) 94.1%,
        hsla(0, 0%, 0%, 0.790) 100%
    );
    transform: translateY(-50%);
    transition: transform 1s var(--e);
  }

  @each $id in $imageIds {
    $i: index($imageIds, $id);

    &:nth-child(#{$i}):before {
      background-image: url(https://images.unsplash.com/photo-#{$id}?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ);
    }
  }
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 1rem;
  transform: translateY(calc(100% - 4.5rem));
  transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
  z-index: 1;

  > * + * {
    margin-top: 1rem;
  }
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 1.2;
}

.copy {
  font-family: 'Times New Roman', serif;
  font-size: 1rem;
  line-height: 1.35;
}

.btn {
  cursor: pointer;
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  letter-spacing: 0.025rem;
  text-transform: uppercase;
  color: white;
  background-color: black;
  border: none;

  &:hover {
    background-color: lighten(black, 5%);
  }

  &:focus {
    outline: 1px dashed yellow;
    outline-offset: 3px;
  }
}

.card:after {
  transform: translateY(0);
}

.content {
  transform: translateY(calc(100% - 4.5rem));

  > *:not(.title) {
    opacity: 0;
    transform: translateY(1rem);
    transition: transform 1s var(--e),
    opacity 1s var(--e);
  }
}

.card:hover,
.card:focus-within {
  align-items: center;

  &:before {
    transform: translateY(-4%);
  }

  &:after {
    transform: translateY(-50%);
  }

  .content {
    transform: translateY(0);

    > *:not(.title) {
      opacity: 1;
      transform: translateY(0);
      transition-delay: calc(var(--d) / 8);
    }
  }
}

.card:focus-within {
  &:before,
  &:after,
  .content,
  .content > *:not(.title) {
    transition-duration: 0s;
  }
}
</style>