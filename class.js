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
    let child = el(".item", text)
    this.childs.push(child)
    mount(this.list, child)
}


function Item(text) {
    this.text = text
    this.el = el(".item", text)
}

