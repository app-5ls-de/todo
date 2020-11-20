function List(title, subtitle) {
    this.el = el(".list-container",
        this.header = el("h2.header", this.title = title),
        this.subheader = el("h3.subheader", this.subtitle = subtitle),
        this.list = el(".list"),
        this.edit = el(".item.edit", { contenteditable: "true" })
    )

    new Sortable(this.list, {
        group: 'shared',
        animation: 150
    })

    this.childs = []
}

List.prototype.add = function (text) {
    let child = el(".item", text)
    this.childs.push(child)
    mount(this.list, child)
}


function Item(text) {
    this.text = text
    this.el = el(".item", text)
}

