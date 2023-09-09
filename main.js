let projects = []
let project

function Project(title, date) {
    this.title = title
    this.date = date
    this.todos = []
}

const inputBox = document.getElementById('input-box')
const listContainer = document.getElementById('list-container')
const btntodo = document.getElementById('btn-todo')

function addTask(e) {
    if (inputBox.value === '') {
        alert('you must write smth')
    } else {
        let li = document.createElement('li')
        li.textContent = inputBox.value
        listContainer.appendChild(li)
        let span = document.createElement('span')
        span.innerHTML = '\u00d7'
        li.appendChild(span)
        if (project instanceof Project) {
            let obg = { value: inputBox.value, check: false }
            project.todos.push(obg)
            console.log(project.todos)
            // project.todos.push(inputBox.value)
        }
    }
    inputBox.value = ''
    saveData()    
}

listContainer.addEventListener('click', function (e) {
    let word = e.target.textContent
    word = word.slice(0, word.length - 1)
    // let index = project.todos.indexOf(word)
    const index2 = project.todos.findIndex(obj => obj.value == word)

    if (e.target.tagName === 'LI') {
        e.target.classList.toggle('checked')
        project.todos[index2].check = !project.todos[index2].check
        saveData()
    } else if (e.target.tagName === 'SPAN') {
        e.target.parentElement.remove()

        // project.todos.splice(index, 1)
        project.todos.splice(index2, 1)
        
        saveData()
    }
}, false)

btntodo.addEventListener('click', e => addTask(e))

function getToday() {
    var today = new Date();
  var day = String(today.getDate()).padStart(2, '0');
  var month = String(today.getMonth() + 1).padStart(2, '0');
  var year = today.getFullYear();
  
  return day + '-' + month + '-' + year;
}

function display() {
    const container = document.getElementById("container");
    container.innerHTML = ""; // Clear previous display--

    projects.forEach((prog, index) => {
        const progCard = document.createElement("div");
        progCard.classList.add("prog-card");

        const progTitle = document.createElement("h5");
        progTitle.textContent = prog.title;
        const progDate = document.createElement("span");
        progDate.textContent = prog.date ? 'for ' + prog.date : prog.date;
        const todayDate = document.createElement("p");
        let today = 'day ' + getToday()
        todayDate.textContent = today;
        
        const removeButton = document.createElement("button");
        removeButton.textContent = "x";
        const addButton = document.createElement("button");
        addButton.textContent = "+";
        addButton.classList.add("plus");
        removeButton.classList.add("minus");

        removeButton.addEventListener("click", () => {
            projects.splice(index, 1);
            saveData()
            display(); // Update the display after removing the prog
            let show = document.getElementsByClassName('show')[0]
            show.classList.add('hidden')
        });

        addButton.addEventListener("click", (e) => {
            let show = document.getElementsByClassName('show')[0]
            show.classList.remove('hidden')
            addTodos(prog)
        });

        progCard.appendChild(progTitle);
        progCard.appendChild(progDate);
        progCard.appendChild(todayDate);
        progCard.appendChild(removeButton);
        progCard.appendChild(addButton);

        container.appendChild(progCard);
    });
}

function addTodos(prog) {
    const name = document.getElementById('name-prog')
    let span = document.createElement('span')
    span.textContent = 'TODOS: ' + prog.title.slice(0,24)
    name.replaceChildren(span)
 
    project = prog
    listContainer.innerHTML = ''
    prog.todos.forEach(node => {
        let li = document.createElement('li')
        // li.textContent = node
        li.textContent = node.value
        listContainer.appendChild(li)
        let span = document.createElement('span')
        span.innerHTML = '\u00d7'
        li.appendChild(span)

        if(node.check){
            li.classList.toggle('checked')
        }

    })
}

function handleFormSubmit(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const name = document.getElementById("name");
    const date = document.getElementById("date");

    const namevalue = name.value;
    const datevalue = date.value.split('-').reverse().join('-');  

    const prog = new Project(namevalue, datevalue);
    projects.push(prog);
    saveData()

    // Clear the form fields after adding 
    name.value = "";
    date.value = "";

    display(); // Update the display after adding 
}

// Event listener for form submission
const addSmth = document.getElementById("smth");
addSmth.addEventListener("submit", handleFormSubmit);

function saveData() {
    const objString = JSON.stringify(projects);
    localStorage.setItem('myObject', objString);
}

function showtask() {
    const storedObjString = localStorage.getItem('myObject');
    projects = JSON.parse(storedObjString).length == 0 ?
        projects : JSON.parse(storedObjString);
}

showtask()
display(); 
