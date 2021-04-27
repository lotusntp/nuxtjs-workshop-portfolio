<template>
  <div class="container has-text-centered">
    <h3 class="title">My Profile</h3>

    <img class="avatar" :src="user.avatar_url" alt="User Avatar" />

    <p>Bio {{ user.bio }}</p>
    <p>Location : {{ user.location }}</p>

    <div class="columns is-multiline">
      <div class="column is-3" v-for="repo in repos" :key="repo.id">
        <div class="card">
          <div class="card-content">
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              >{{ repo.name }}</a
            >

            <p>Star : {{ repo.stargazers_count }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.title,
    }
  },
  // middleware: 'auth',
  async asyncData({ $axios }) {
    const baseURL = 'https://api.github.com'
    // const user = await $axios.$get(`${baseURL}/users/lotusntp`)
    // const repos = await $axios.$get(`${baseURL}/users/lotusntp/repos`)
    // วิธีคือการที่ไม่ต้องส่ง token ไปที่ github ด้วย
    $axios.setHeader('Authorization', null)

    // หรือจะใช้แบบนี้กฌได้
    const [user, repos] = await Promise.all([
      $axios.$get(`${baseURL}/users/lotusntp`),
      $axios.$get(`${baseURL}/users/lotusntp/repos`),
    ])

    const name = user.name

    return {
      user,
      repos,
      title: name,
    }
  },
}
</script>

<style scoped>
.avatar {
  width: 128px;
  height: 128px;
}
</style>
