const token = localStorage.getItem('chatAppToken');
        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }

        document.addEventListener('DOMContentLoaded',()=>{
            const parsedToken = parseJwt(token);
            const loggedUsername = document.getElementById('logged-username');
            loggedUsername.innerHTML = `Logged In: ${parsedToken.name}`;
        });

        function createGroup(event){
            event.preventDefault();
            const groupName = prompt('Enter Group Name');

            if(groupName!==null){
                const your_groups_ul = document.getElementById('your-groups-ul');
                const newLi = document.createElement('li');
                newLi.textContent = groupName;
                newLi.style.cursor='pointer';
                your_groups_ul.appendChild(newLi); 
                newLi.addEventListener('click',()=>{
                    console.log(`${groupName}`);
                });
            }
        }

        const chatButton = document.getElementById('send-button').addEventListener('click',()=>{
            const text_input = document.getElementById('text-box').value;
            const message_box_li = document.getElementById('message-box-li');
            const newLi = document.createElement('li');
            const parsedToken = parseJwt(token);
            newLi.innerHTML = `${parsedToken.name}:- ${text_input}`;
            message_box_li.appendChild(newLi);
            text_input.innerHTML = '';
        });