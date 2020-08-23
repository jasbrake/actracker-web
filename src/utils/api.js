export default {
  async fetchServers () {
    try {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/servers`)
      if (res.ok) {
        return await res.json()
      } else {
        return null
      }
    } catch (e) {
      return null
    }
  }
}
