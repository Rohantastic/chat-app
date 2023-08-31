const form = document.querySelector('form');
    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      const object = {
        email: email,
        password: password
      }

      try {
        const response = await axios.post('http://localhost:3000/login', object);

        console.log(response.data.code);

        if (response.data.code === 200) {
          const text = document.getElementById('h11');
          text.innerHTML = `<p style="color:green;">Logged In Successful</p>`;
          console.log(response.data.token);
          localStorage.setItem('chatAppToken', response.data.token);
          window.location.href = '/home';
        } else if (response.data.code === 401) {
          const text = document.getElementById('h11');
          text.innerHTML = `<p style="color:red;">Error in logging in, Password Incorrect 401</p>`;


        } else if (response.data.code === 404) {
          const text = document.getElementById('h11');
          text.innerHTML = `<p style="color:red;">User not found, 404</p>`;
        }

      } catch (err) {
        console.log(err);
      }
    });