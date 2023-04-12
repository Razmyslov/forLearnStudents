const posts = [
    {
        title: 'Post 1',
        description: 'Test description 1'
    }
];

const button = document.getElementById("button");
button.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('1')
});