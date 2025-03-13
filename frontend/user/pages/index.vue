<template>
  <div class="container">
    <Header />
    <main>
      <h1>欢迎来到用户前端</h1>
      <p>这是一个使用Nuxt 3构建的用户前端应用。</p>
      <div class="actions">
        <NuxtLink to="/login" class="button">登录</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup>
// 首页组件
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

main {
  padding: 40px 0;
  text-align: center;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

p {
  font-size: 1.2rem;
  margin-bottom: 30px;
}

.actions {
  margin-top: 20px;
}

.button {
  display: inline-block;
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
  font-weight: bold;
}

.button:hover {
  background-color: #45a049;
}
</style>
