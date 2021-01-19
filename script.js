var el = redom.el
var mount = redom.mount
var text = redom.text
dayjs.locale('de')


function stripWhitespace(string) {
    return string.replace(/\s+/g, " ").trim()
}





var date_lists = document.getElementById("date-lists")
var someday_lists = document.getElementById("someday-lists")


var now = dayjs()
let date = now.add(-2, 'day')
for (let index = 0; index < 5; index++) {
    if (index) mount(date_lists,el("hr.vr"))
    date = date.add(1, 'day')
    let list = new List(date.format("dddd"), date.format("D. MMMM YYYY"))
    mount(date_lists, list)

    let max = Math.random() * 20
    for (let i = 0; i < max; i++) {
        list.add(i)
    }

}

let list = new List("Someday")
mount(someday_lists, list)
let max = Math.random() * 10
for (let i = 0; i < max; i++) {
    list.add(i)
}