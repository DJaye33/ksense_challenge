const main = document.querySelector(".main");
const postContainer = document.querySelector(".post-container");

const getUsers = () => {
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((userData) => {
      userData.forEach((user) => {
        // create container div
        const userDiv = document.createElement("div");
        userDiv.classList.add("user");

        // create user name
        const username = document.createElement("h2");
        username.classList.add("user__username");
        username.textContent = `${user.username}`;

        // create user email
        const userEmail = document.createElement("p");
        userEmail.classList.add("user__email");
        userEmail.textContent = `Email: ${user.email}`;

        // create user phone
        const userWeb = document.createElement("p");
        userWeb.classList.add("user__web");
        userWeb.textContent = `Website: ${user.website}`;

        // create get post button
        const postBtn = document.createElement("button");
        postBtn.classList.add("user__postBtn");
        postBtn.textContent = "See Posts";

        // render elements to DOM
        userDiv.insertAdjacentElement("beforeend", username);
        userDiv.insertAdjacentElement("beforeend", userEmail);
        userDiv.insertAdjacentElement("beforeend", userWeb);
        userDiv.insertAdjacentElement("beforeend", postBtn);
        main.insertAdjacentElement("beforeend", userDiv);

        // capture user id after DOM render
        postBtn.addEventListener("click", () => {
          postContainer.textContent = "";

          fetch("https://jsonplaceholder.typicode.com/posts")
            .then((response) => response.json())
            .then((userPosts) => {
              const posts = userPosts.filter((post) => post.userId === user.id);
              // render post
              posts.forEach((post) => {
                const postText = document.createElement("p");
                postText.classList.add("user__post");
                postText.textContent = `${post.body}`;

                postContainer.insertAdjacentElement("beforeend", postText);
              });
            });
        });
      });
    })
    .catch((err) => console.log("Something went wrong", err));
};

getUsers();
