var array_row = [];
var Person = /** @class */ (function () {
    function Person(id, name, work) {
        this.id = id;
        this.name = name;
        this.work = work;
    }
    return Person;
}());
var people = new Person(1, 'леша', 'Программист');
array_row.push(people);
//Отображение объектов
var display_person = function () {
    array_row.forEach(function (elem) {
        var id = elem.id;
        var name = elem.name;
        var work = elem.work;
        var button_edit = "<button class='button_edit button'>Редактировать</button>";
        var button_delete = "<button class='button_delete button'>Удалить</button>";
        var row = document.createElement('tr');
        row.classList.add('tr_user');
        row.innerHTML = "\n        <td>".concat(id, "</td>\n        <td>").concat(name, "</td>\n        <td>").concat(work, "</td>\n        <td>").concat(button_edit).concat(button_delete, "</td>\n        ");
        row.id = elem.id.toString();
        document.querySelector('.table').appendChild(row);
    });
};
display_person();
//Удаление
var row_remove = function () {
    var btns_delete = document.querySelectorAll('.button_delete');
    btns_delete.forEach(function (btn) {
        btn.addEventListener('click', function () {
            array_row = array_row.filter(function (row) { return !document.getElementById(row.id.toString()).contains(btn); });
            var table_childrens = document.querySelector('.table').children;
            for (var i = 0; i < table_childrens.length; i++) {
                if (table_childrens[i].contains(btn)) {
                    table_childrens[i].remove();
                }
            }
        });
    });
};
row_remove();
//Редактирование
var row_edit = function () {
    var btns_edit = document.querySelectorAll('.button_edit');
    btns_edit.forEach(function (btn) {
        btn.addEventListener('click', function () {
            array_row.forEach(function (row) {
                if (document.getElementById(row.id.toString()).contains(btn)) {
                    display_popup();
                    document.getElementById('text1').value = row.name;
                    editRowId = row.id;
                    document.getElementById('button_save').addEventListener('click', saveData, { once: true });
                }
            });
        });
    });
};
row_edit();
//Сохранение редактирвоанного объекта в массив
var editRowId = 0;
var saveData = function () {
    var value = document.getElementById('text1').value;
    var select_value = document.getElementById('select_content').value;
    var editRow = array_row.find(function (row) { return row.id == editRowId; });
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
    }
    else if (editRow.name != value) {
        editRow.name = value;
        updateRowData(editRow.id);
    }
    console.log(array_row);
    document.getElementById('close_img').click();
};
//Обнавление таблицы
var updateRowData = function (rowId) {
    var rowChildrens = document.getElementById(rowId).children;
    var row = array_row.find(function (row) { return row.id == rowId; });
    rowChildrens[0].innerHTML = row.id.toString();
    rowChildrens[1].innerHTML = row.name;
    rowChildrens[2].innerHTML = row.work;
};
document.querySelector('.button_add').addEventListener('click', function () {
    display_popup();
    document.getElementById('button_save').addEventListener('click', addRow);
});
//Добавление
var addRow = function () {
    var text1 = document.getElementById('text1').value;
    var text2 = document.getElementById('select_content').value;
    var newRow = {
        id: 0,
        name: text1,
        work: text2
    };
    var _loop_1 = function (i) {
        if (!array_row.find(function (el) { return el.id == i; })) {
            newRow.id = i;
            return "break";
        }
    };
    for (var i = 1; i <= array_row.length + 1; i++) {
        var state_1 = _loop_1(i);
        if (state_1 === "break")
            break;
    }
    var button_edit = "<button class='button_edit button'>Редактировать</button>";
    var button_delete = "<button class='button_delete button'>Удалить</button>";
    var row = document.createElement('tr');
    row.classList.add('tr_user');
    row.id = newRow.id;
    row.innerHTML = "\n    <td>".concat(newRow.id, "</td>\n    <td>").concat(newRow.name, "</td>\n    <td>").concat(newRow.work, "</td>\n    <td>").concat(button_edit).concat(button_delete, "</td>\n");
    document.querySelector('.table').appendChild(row);
    document.getElementById('close_img').click();
    array_row.push(newRow);
    document.getElementById('text1').value = "";
    row_remove();
    row_edit();
};
//Поиск
document.getElementById('search_input').oninput = function () {
    var value = document.getElementById('search_input').value.trim();
    var filterTable = array_row.filter(function (row) { return row.name.toString().includes(value); });
    document.querySelectorAll('.tr_user').forEach(function (el) {
        if (!filterTable.find(function (row) { return row.id == Number(el.id); })) {
            el.classList.add('hide');
        }
        else {
            el.classList.remove('hide');
        }
    });
};
//popup
var display_popup = function () {
    document.getElementById('popup_bg').style.display = 'block';
    document.getElementById('close_img').addEventListener('click', function () {
        document.getElementById('popup_bg').style.display = 'none';
        document.getElementById('button_save').removeEventListener('click', saveData);
        document.getElementById('button_save').removeEventListener('click', addRow);
        document.getElementById('text1').value = "";
    });
};
