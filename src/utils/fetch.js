export const handleResponse = async (res) => {
  if (res.status >= 200 && res.status < 400) {
    return await res.json()
  } else if (res.status >= 400 && res.status < 500) {
    const data = await res.json()
    const message = []

    if (data.message) message.push(data.message)
    if (data.errors) message.push(Object.values(data.errors))

    const id = Math.random().toString(36).substring(2, 8)

    document.body.insertAdjacentHTML(
      'beforeend',
      `<span id="${id}" class="notify">${message.join('<br  />')}</span>`,
    )

    const el = document.getElementById(id)

    setTimeout(() => {
      el.classList.add('active')
      setTimeout(() => {
        el.classList.remove('active')
        setTimeout(() => {
          el.remove()
        }, 100)
      }, 3000)
    }, 100)
    return { data, error: true }
  } else {
    alert('Server error')
  }
}

export const $fetch = async (path, method = 'get', body) => {
  const url = new URL('http://localhost:8000/api' + path)

  const headers = {
    Authorization: 'Bearer ' + localStorage.getItem('token'),
  }

  if (!body || method === 'get') {
    url.search = new URLSearchParams(body)

    return await handleResponse(
      await fetch(url, {
        method,
        headers,
      }),
    )
  }

  return await handleResponse(
    await fetch(url, {
      method,
      body,
      headers,
    }),
  )
}
