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
        }

        async function showGroups(){
            const groupGetResponse = await axios.get('http://localhost:3000/get-groups',{ headers: { "Authorization": token } });

                    console.log("groupGetResponse: ",groupGetResponse.data.groups);
                    const your_groups_ul = document.getElementById('your-groups-ul');

                    
                    groupGetResponse.data.groups.forEach((element)=>{
                        
                        const newLi = document.createElement('li');
                        
                        if (element.UserId === parsedToken.userId) {
                            const id = element.id;
                            newLi.innerHTML = `${element.groupName} <button onclick="addMembers(event, '${id}')">+</button>`; //sending group id too
                        } else {
                            newLi.innerHTML = `${element.groupName}`;
                        }
                        
                        

                        newLi.style.cursor='pointer';
                        your_groups_ul.appendChild(newLi); 
                        
                        newLi.addEventListener('click',()=>{
                    
                        });
                    
                    });
        }



       //work on this, think of database structure
       async function addMembers(event,id){
            const userEmail = prompt('Enter Email of Users you want to add in group');

            const response = await axios.post('http://localhost:3000/update-member-to-group',object);
            console.log(userEmail+ "" + id);
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





        /*
        only show add button to groups we have created
        */ 
showGroups();