export default {
  async fetchServers () {
    try {
      let res = await fetch('http://localhost:3000/servers')
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
