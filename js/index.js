const body = document.querySelector("body");
let form = document.querySelector("form");
let i = 1;

function test(user_name) {
  fetch(`https://api.github.com/search/users?q=${user_name}`, {
    Accept: "application/vnd.github.v3+json",
  })
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      users.items.forEach(displayAllUsers);
    });
}

form.addEventListener("submit", (e) => {
  let input = form.firstElementChild;
  e.preventDefault();
  let user_name = input.value;
  console.log(user_name);
  test(user_name);
  form.reset();
});

function displayAllUsers(user) {
  const li = document.createElement("li");
  const a = document.createElement("a");
  a.href = user["html_url"];
  a.textContent = user.login;
  a.dataset.user = user.login;
  li.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.dataset.user);
    repos(e.target.dataset.user);
  });
  li.append(a);
  body.append(li);
}

function repos(user) {
  fetch(`https://api.github.com/users/${user}/repos`, {
    Accept: "application/vnd.github.v3+json",
  })
    .then((res) => res.json())
    .then((repos) => {
      body.innerHTML = "";
      console.log(repos);

      repos.forEach(displayRepos);
    });
}

function displayRepos(repo) {
  let info = document.createElement("a");
  let li = document.createElement("li");
  info.href = repo["clone_url"];
  info.textContent = info.pathname;
  li.append(info);
  body.append(li);
  i++;
}
// 0: {login: "muhidin", id: 224238, node_id: "MDQ6VXNlcjIyNDIzOA==", avatar_url: "https://avatars0.githubusercontent.com/u/224238?v=4", gravatar_id: "", …}
// 1:
// avatar_url: "https://avatars2.githubusercontent.com/u/626869?v=4"
// events_url: "https://api.github.com/users/asepmuhidin/events{/privacy}"
// followers_url: "https://api.github.com/users/asepmuhidin/followers"
// following_url: "https://api.github.com/users/asepmuhidin/following{/other_user}"
// gists_url: "https://api.github.com/users/asepmuhidin/gists{/gist_id}"
// gravatar_id: ""
// html_url: "https://github.com/asepmuhidin"
// id: 626869
// login: "asepmuhidin"
// node_id: "MDQ6VXNlcjYyNjg2OQ=="
// organizations_url: "https://api.github.com/users/asepmuhidin/orgs"
// received_events_url: "https://api.github.com/users/asepmuhidin/received_events"
// repos_url: "https://api.github.com/users/asepmuhidin/repos"
// score: 1
// site_admin: false
// starred_url: "https://api.github.com/users/asepmuhidin/starred{/owner}{/repo}"
// subscriptions_url: "https://api.github.com/users/asepmuhidin/subscriptions"
// type: "User"
// url: "https://api.github.com/users/asepmuhidin"
// __proto__: Object
