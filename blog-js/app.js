if(!localStorage.getItem('posts')){
    localStorage.setItem('posts',
        JSON.stringify([]))
}

const allPosts = JSON.parse(localStorage.getItem('posts'))

const posts = document.querySelector('div.posts');

window.onload = generateAllPosts;

function generateAllPosts(){
    let data = '';

    for( let post of allPosts){
        data +=`
            <div class="post">
                <p class="title"> ${post.title} </p>
                <p class="description"> ${post.description} </p>
                <div class="navigate">
                    <button class="desc">Описание</button>
                    <button class="delete">Удалить</button>
                </div>
            </div>
        `
    }

    posts.innerHTML = data;

}

const form = document.getElementById('form');

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    const input = document.getElementById('input')
    const textarea = document.getElementById('textarea')

    let title = input.value;
    let description = textarea.value;

    allPosts.push({
        title: title,
        description: description
    });

    localStorage.setItem('posts', JSON.stringify(allPosts));

    generateAllPosts();
})