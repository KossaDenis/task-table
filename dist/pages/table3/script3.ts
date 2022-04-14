let array_row: any[] = []

class Person {
    id: number;
    name: string;
    work: string

    constructor(id: number, name: string, work: string) {
        this.id = id;
        this.name = name;
        this.work = work;
    }
}
const people = new Person(1, 'юля', 'Программист');
array_row.push(people)

//Отображение объектов
let display_person = ():void => {
    array_row.forEach(elem => {
        let id = elem.id;
        let name = elem.name;
        let work = elem.work;

        const button_edit: string = "<button class='button_edit button'>Редактировать</button>";
        const button_delete: string = "<button class='button_delete button'>Удалить</button>";
        let row = document.createElement('tr')
        row.classList.add('tr_user')
        row.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${work}</td>
        <td>${button_edit}${button_delete}</td>
        `
        row.id = elem.id.toString()
        document.querySelector('.table').appendChild(row)
    })
}
display_person()
//Удаление
let row_remove = (): void => {
    const btns_delete = document.querySelectorAll('.button_delete')
    btns_delete.forEach((btn) => {
        btn.addEventListener('click', () => {
            array_row = array_row.filter(row => !document.getElementById(row.id.toString()).contains(btn))

            const table_childrens = document.querySelector('.table').children
            for (let i = 0; i < table_childrens.length; i++) {
                if (table_childrens[i].contains(btn)) {
                    table_childrens[i].remove()
                }
            }
        })
    })
}
row_remove()

//Редактирование
let row_edit = (): void => {
    const btns_edit = document.querySelectorAll('.button_edit')
    btns_edit.forEach(btn => {
        btn.addEventListener('click', () => {
            array_row.forEach(row => {
                if (document.getElementById(row.id.toString()).contains(btn)) {
                    display_popup();
                    (document.getElementById('text1') as HTMLInputElement).value = row.name;
                    editRowId = row.id;
                    document.getElementById('button_save').addEventListener('click', saveData, { once: true }
                    )
                }
            })
        })
    })
}
row_edit()

//Сохранение редактирвоанного объекта в массив
let editRowId: number = 0;
let saveData = (): void => {
    let value: string | number = (document.getElementById('text1') as HTMLInputElement).value;
    let select_value: string | number = (document.getElementById('select_content') as HTMLSelectElement).value;
    let editRow = array_row.find(row => row.id == editRowId)
    if (editRow.name != value && editRow.work != select_value) {
        editRow.name = value;
        editRow.work = select_value;
        console.log(array_row);
        updateRowData(editRow.id);
    }
    else if (editRow.work != select_value) {
        editRow.work = select_value;
        console.log(array_row);
        updateRowData(editRow.id);
    }else if(editRow.name != value){
        editRow.name = value;
        updateRowData(editRow.id);
    }
    console.log(array_row);
    document.getElementById('close_img').click();

}

//Обнавление таблицы
let updateRowData = (rowId: any): void => {
    let rowChildrens = document.getElementById(rowId).children
    let row = array_row.find(row => row.id == rowId)
    rowChildrens[0].innerHTML = row.id.toString();
    rowChildrens[1].innerHTML = row.name;
    rowChildrens[2].innerHTML = row.work;
    

}
document.querySelector('.button_add').addEventListener('click', (): void => {
    display_popup();
    document.getElementById('button_save').addEventListener('click', addRow)
})

//Добавление
let addRow = (): void => {
    let text1 = (document.getElementById('text1') as HTMLInputElement).value;
    let text2 = (document.getElementById('select_content') as HTMLSelectElement).value;

    let newRow: any = {
        id: 0,
        name: text1,
        work: text2
    }

    for (let i = 1; i <= array_row.length + 1; i++) {
        if (!array_row.find(el => el.id == i)) {
            newRow.id = i;
            break;
        }
    }
    const button_edit: string = "<button class='button_edit button'>Редактировать</button>";
    const button_delete: string = "<button class='button_delete button'>Удалить</button>";
    let row = document.createElement('tr')
    row.classList.add('tr_user');
    row.id = newRow.id
    row.innerHTML = `
    <td>${newRow.id}</td>
    <td>${newRow.name}</td>
    <td>${newRow.work}</td>
    <td>${button_edit}${button_delete}</td>
`
    document.querySelector('.table').appendChild(row)
    document.getElementById('close_img').click()
    array_row.push(newRow);
    (document.getElementById('text1') as HTMLInputElement).value = "";
    row_remove()
    row_edit()
}

//Поиск
document.getElementById('search_input').oninput = (): void => {
    let value = (document.getElementById('search_input') as HTMLInputElement).value.trim();
    let filterTable = array_row.filter(row => row.name.toString().includes(value))
    document.querySelectorAll('.tr_user').forEach(el => {
        if (!filterTable.find(row => row.id == Number(el.id))) {
            el.classList.add('hide');
        }
        else {
            el.classList.remove('hide')
        }
    })
}

//popup
const display_popup = (): void => {
    document.getElementById('popup_bg').style.display = 'block'
    document.getElementById('close_img').addEventListener('click', () => {
        document.getElementById('popup_bg').style.display = 'none'
        document.getElementById('button_save').removeEventListener('click', saveData);
        document.getElementById('button_save').removeEventListener('click', addRow);
        (document.getElementById('text1') as HTMLInputElement).value = "";
    })
}

