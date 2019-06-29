const GIT_URL = "https://api.github.com/users/";

const PESO = {  'public_repos': 20,
              'public_gists': 5,
              'followers': 10,
              'following': 5,
              'starred': 10};

const user = "Jay-Rad";

function getGitData(complemento) {
  let promise = new Promise((resolve,reject)=>{
      fetch(`${GIT_URL}${complemento}`)
      .then(response=>response.json())
      .then(result=>resolve(result))
      .catch(err=>reject(err))
  })
  return promise;
}

function getUserData(user, side) {

  let promise = getGitData(`${user}/starred`);

  let promise2 = getGitData(`${user}`);

  Promise.all([promise, promise2])
  .then(datas => {
    let starred = datas[0].reduce((soma, data)=>{
          return soma + data.stargazers_count;
      },0)

    let {public_repos, public_gists, followers, following, avatar_url} = datas[1];
    let total = (starred*PESO['starred'] + public_repos*PESO['public_repos'] + public_gists*PESO['public_gists'] + followers*PESO['followers'] + following*PESO['following']);

    // qtd
    document.getElementById(`qtd-public-repo${side}`).innerHTML = public_repos;
    document.getElementById(`qtd-public-gists${side}`).innerHTML = public_gists;
    document.getElementById(`qtd-followers${side}`).innerHTML = followers;
    document.getElementById(`qtd-following${side}`).innerHTML = following;
    document.getElementById(`qtd-starred${side}`).innerHTML = starred;

    // totais
    document.getElementById(`public-repo${side}`).innerHTML = public_repos * PESO['public_repos'];
    document.getElementById(`public-gists${side}`).innerHTML = public_gists * PESO['public_gists'];
    document.getElementById(`followers${side}`).innerHTML = followers * PESO['followers'];
    document.getElementById(`following${side}`).innerHTML = following * PESO['following'];
    document.getElementById(`starred${side}`).innerHTML = starred * PESO['starred'];
    document.getElementById(`total${side}`).innerHTML = total;
    document.getElementById(`avatar${side}`).src = avatar_url;
  });

}

function getWinner() {
  let total1 = document.getElementById('total1').value;
  let total2 = document.getElementById('total2').value;


}


let fightButton = document.getElementById('fight-button');
fightButton.addEventListener('click', function() {
	let inputBattle1 = document.getElementById('input-battle1').value;
	let inputBattle2 = document.getElementById('input-battle2').value;

    getUserData(inputBattle1, 1);
    getUserData(inputBattle2, 2);
});