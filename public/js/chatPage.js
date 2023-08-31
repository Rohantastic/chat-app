    

        function parseJwt(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        }

        const token = localStorage.getItem('chatAppToken'); //getting token from localStorage sent from login page
        const parsedToken = parseJwt(token); //parsing token and storing it into a variable
        


        document.addEventListener('DOMContentLoaded',()=>{
            //const parsedToken = parseJwt(token);
            const loggedUsername = document.getElementById('logged-username');
            loggedUsername.innerHTML = `Logged In: ${parsedToken.name}`; //showing name on nav-bar
        });




        async function createGroup(event){
            event.preventDefault();
            const groupName = prompt('Enter Group Name');
            //create post api to create group along with id of person who created, no retreive


            const object = {
                groupName:groupName,
                userId:parsedToken.userId
            }
            
            console.log(object);
            const groupResponse = await axios.post('http://localhost:3000/create-group',object);

            if(groupResponse.data.success == true){
                // document.addEventListener('DOMContentLoaded',async (e)=>{
                    // e.preventDefault();

                    showGroups();
                // });
            }
        }

        async function showGroups(){
            const groupGetResponse = await axios.get('http://localhost:3000/get-groups',{ headers: { "Authorization": token } });

                    //console.log(groupGetRepsponse.data.groups);
                    //console.log("successfully created group");  
                    
                    const your_groups_ul = document.getElementById('your-groups-ul');
                    groupGetResponse.data.groups.forEach((element)=>{
                        
                        const newLi = document.createElement('li');
                        newLi.innerHTML = `${element.groupName}`;
                        newLi.style.cursor='pointer';
                        your_groups_ul.appendChild(newLi); 
                        newLi.addEventListener('click',()=>{
                        });
                    });
        }

        const chatButton = document.getElementById('send-button').addEventListener('click',()=>{
            const text_input = document.getElementById('text-box').value;
            const message_box_li = document.getElementById('message-box-li');
            const newLi = document.createElement('li');
            //const parsedToken = parseJwt(token);
            newLi.innerHTML = `${parsedToken.name}:- ${text_input}`;
            message_box_li.appendChild(newLi);
            text_input.innerHTML = '';
        });


showGroups();