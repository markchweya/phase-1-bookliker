document.addEventListener("DOMContentLoaded", function() {

    let list = document.querySelector('#list')


    fetch('http://localhost:3000/books')
    .then(res => res.json())
    .then(books => listBooks(books))


    function listBooks(books) {
        books.forEach(book => {
            let li = document.createElement('li')
            li.textContent = book.title
            list.append(li)
            li.addEventListener('click', function (e) {
                showDetails(book)
                console.log(e)
            })

            console.log(list)
        });
    }


    function showDetails(book) {
        let showPanel = document.querySelector('#show-panel')
        let div = document.createElement('div')
        let thumbnail = document.createElement('img')
        let description = document.createElement('p')
        let usersList = document.createElement('ul')
        let users = book.users
        let likeButton = document.createElement('button')

        thumbnail.src= book.img_url
        description.textContent = book.description
        likeButton.innerHTML = 'LIKE'

        likeButton.addEventListener('click', function (e) {
            fetch(`http://localhost:3000/books/${book.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify({
                    "users": [
                      ...users,
                      { "id": 1, "username": "pouros" }
                    ]
                  })
            })

            // fetch(`http://localhost:3000/books/${book.id}`, {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify({
            //         "users": [
            //             ...bookUserArr,
            //             { "id": 1, "username": "pouros" }
            //           ]
            //     })
            // })
            console.log(users)
        })


        users.forEach(user => {
            let user_li = document.createElement('li')
            user_li.textContent = user.username
            usersList.append(user_li)
        });


        div.append(thumbnail, description, usersList, likeButton)
        showPanel.append(div)

    }


});