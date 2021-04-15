<template>
  <div class="container">
    <article>
      <h1 class="title">{{ post.title }}</h1>

      <nuxt-content :document="post"></nuxt-content>
    </article>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Blog Post',
    }
  },
  head() {
    return {
      title: this.title,
    }
  },
  middleware: 'auth',
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.slug).fetch()
    // สร้างตัวแปรแล้วต้อง return กลับไป
    const title = post.title

    return {
      post,
      title,
    }
  },
}
</script>

<style></style>
