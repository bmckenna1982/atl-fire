const videoServices = {

  getAuth() {
    const clientId = '14uxjgrat0qftgh91irfs233ido5rr'
    const clientSecret = '8norbld6xn7ifauiqookz1jmsda2jz'
    fetch(`https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials&scope=bits:read`, {
      method: 'POST',
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },

  getStatus() {
    let token = videoServices.getAuth()
    fetch(`https://api.twitch.tv/helix/streams?user_id=570498824`, {
      method: 'GET',
      headers: {
        'Client-ID': clientId,
        'Authorization': `Bearer ${token.access_token}`,
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
      .then(status => {
        console.log(status.data[0])
        let display = status.data[0] ? { channel: "atl_hockey" } : { collection: "KKAnqEqKLhauPA" }
        return display
      })
  }

}

export default videoServices