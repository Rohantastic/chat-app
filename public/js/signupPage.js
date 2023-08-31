const form = document.querySelector('form');
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;

            const object = {
                name: name,
                email: email,
                phone: phone,
                password: password
            }

            try {
                const response = await axios.post('http://localhost:3000/signup', object);

                if (response.status === 201) {
                    const text = document.getElementById('h11');
                    text.innerHTML = `<p style="color:green;">User Created</p>`;

                } else if (response.data.success===false) {
                    const text = document.getElementById('h11');
                    text.innerHTML = `<p style="color:red;">User Already Exists</p>`;
                }
            }
            catch(err){
                console.log(err);
            }
            
        });