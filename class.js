function List(title, subtitle) {
    this.el = el(".list-container",
        this.header = el("h2.title", this.title = title),
        this.list = el(".list"),
        this.edit = el(".item.edit", { contenteditable: "true" })
    )

    if (subtitle) mount(this.el, this.subheader = el("h3.subtitle", this.subtitle = subtitle), this.list)

    new Sortable(this.list, {
        group: 'shared',
        animation: 150
    })

    this.childs = []
}

List.prototype.add = function (text) {
    let child = new Item(text)
    this.childs.push(child)
    mount(this.list, child)
}


function Item(text) {
    this.data = {}
    this.data.checked = false

    this.el = el(".item", this.data.text = text)
    if (this.data.checked) el.classList.add("checked")
    
    this.el.addEventListener("click", (e) => this.click(this,e))
}

Item.prototype.click = function (self,e) {
    console.log(self.data.text)
    if (self.data.checked) {
        self.el.classList.remove("checked")
    } else {
        self.el.classList.add("checked")
    }
    self.data.checked = !self.data.checked
}










function createTodo(array, id) {
    let div_todo = el(".todo#" + id)
    let rawText = []
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (typeof element == "string") {
            rawText.push(element)
        } else {
            if (rawText.length) {
                mount(div_todo, el("span", rawText.join(' ')))
                div_todo.append(" ")
                rawText = []
            }

            let type = Object.keys(element)[0]

            switch (type) {
                case "checked": mount(div_todo, el("span.x", "x"));
                    div_todo.classList.add("checked"); break;
                case "priority": mount(div_todo, el("span.priority.punctuation", "("));
                    mount(div_todo, el("span.priority", element[type]));
                    mount(div_todo, el("span.priority.punctuation", ")")); break;
                case "completionDate": mount(div_todo, el("span.date", element[type])); break;
                case "creationDate": mount(div_todo, el("span.date", element[type])); break;
                case "project": mount(div_todo, el("span.project.punctuation", "+"));
                    mount(div_todo, el("span.project", element[type])); break;
                case "context": mount(div_todo, el("span.context.punctuation", "@"));
                    mount(div_todo, el("span.context", element[type])); break;
                case "keyvalue": mount(div_todo, el("span.keyvalue.key", element[type].key));
                    mount(div_todo, el("span.keyvalue.punctuation", ":"));
                    mount(div_todo, el("span.keyvalue.value", element[type].value));
            }
        }
        div_todo.append(" ")
    }
    if (rawText.length) {
        mount(div_todo, el("span", rawText.join(' ')))
        div_todo.append(" ")
        rawText = []
    }

    div_todo.addEventListener('dblclick', function (e) {
        e.preventDefault()

        if (this.getAttribute("contenteditable") == "true") return
        this.classList.add("edit")


        this.setAttribute("contenteditable", "true")
        this.focus()

        this.addEventListener('keydown', function (e) {
            if ((!e.shiftKey && e.key == "Enter") || e.key == "Escape") {
                this.blur()
                return false
            }
        })

        let oldContent = this.innerText
        let newContent = this.innerText

        this.addEventListener('input', function (e) {
            newContent = this.innerText
        })

        this.addEventListener('blur', function (e) {
            this.setAttribute("contenteditable", "false")
            this.classList.remove("edit")
            newContent = stripWhitespace(newContent)
            if (newContent) {
                if (newContent != oldContent) {
                    setRemoteData('PUT', newContent, id)
                    addTodo(newContent, id)
                    showTodos()
                }
            } else {
                setRemoteData('DELETE', "", id)
                addTodo("", id)
                showTodos()
            }
        })
    })
    return div_todo
}