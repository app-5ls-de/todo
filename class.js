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






}

